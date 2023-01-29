# jsonp 解决跨域请求原理

## 借助 script 标记发送跨域请求

> 为什么会出现跨域请求：不同源地址之间默认是不能互相通过 ajax 跨域请求成功的，这就是同源策略，请求可以发送出去，但是浏览器出于安全机制不允许拿到响应内容。

如何才算跨域请求成功： 1.能发送出去； 2.能接收回来。
平时发送请求的方式有哪些：img link script iframe 等。

```javascript
// ## 1. img
// 可以发送不同源地址之间的请求
// 无法拿到响应结果
// var img = new Image();
// img.src = 'http://localhost:8080/AJAX/27data.php';

// ## 2. link
// 可以发送不同源地址之间的请求
// 无法拿到响应结果
// var link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'http://localhost:8080/AJAX/27data.php';
// document.body.appendChild(link);

// ## 3. script
// 可以发送不同源地址之间的请求
// 无法拿到响应结果（借助script标签能够自动执行响应回来的js代码拿到响应结果）
var script = document.createElement("script");
script.src = "http://localhost:8080/AJAX/28time.php";
document.body.appendChild(script); // 开始发起请求，这里也相当于异步的方式发送请求
// 相当于请求的回调
function foo(res) {
  console.log(res);
}
```

27data.php 内容如下

```php
<?php
header('Content-Type:application/json');
$data = array(
    array(
      'id' => 1,
      'name' => '张三',
      'age' => 18
    ),
    array(
      'id' => 2,
      'name' => '李四',
      'age' => 20
    ),
    array(
      'id' => 3,
      'name' => '二傻子',
      'age' => 18
    ),
    array(
      'id' => 4,
      'name' => '三愣子',
      'age' => 19
    )
  );
  $json = json_encode($data);
 echo $json;
```

28time.php 内容如下

```php
<?php
header('Content-Type: application/javascript');
$json = json_encode(array(
  'time' => time()
));
// 在 JSON 格式的字符串外面包裹了一个函数的调用，返回的结果就变成了一段 JS 代码
echo "foo({$json})";
```

## jsonp 原理

利用 script 标签能发送跨域请求，原理是服务端将响应的数据包裹进一个函数的调用，那么响应回去的东西相当于是一段 js 代码，而且 script 标签会自动执行该响应回来的 js 代码，只要客户端提前声明了服务端包裹数据的那个函数，就能获取到里面的数据了。

## jsonp 封装

```javascript
function jsonp(url, params, callback) {
  //生成随机的一个函数名
  var funcName = "jsonp_" + Date.now() + Math.random().toString().substr(2, 5);
  //判断传入的参数是不是对象，是就变成url传参形式
  if (typeof params === "object") {
    var tempArr = [];
    for (var key in params) {
      var value = params[key];
      tempArr.push(key + "=" + value);
    }
    params = tempArr.join("&");
  }
  //增加一个script标签
  var script = document.createElement("script");
  script.src = url + "?" + params + "&callback=" + funcName;
  document.body.appendChild(script);
  //函数声明，调用是在传回来的js脚本执行时调用，该函数调用之后，php执行后的数据就是该函数的实参
  window[funcName] = function (data) {
    //回调函数的调用，该函数里主要是获取到数据之后，用来干嘛
    callback(data);
    //删除这个全局的方法
    delete window[funcName];
    //从文档中删除这个标签
    document.body.removeChild(script);
  };
}

//jsonp函数调用
jsonp(
  "http://localhost:8080/AJAX/30server.php",
  {
    id: 123,
  },
  function (res) {
    console.log(res);
  }
);
```

30server.php 内容如下

```php
<?php
$conn = mysqli_connect( 'localhost', 'root', '', 'ajax_jsonp_test' );

$query = mysqli_query( $conn, 'select * from users' );

while ( $row = mysqli_fetch_assoc( $query ) ) {
    $data[] = $row;
}

if ( empty( $_GET['callback'] ) ) {
    header( 'Content-Type: application/json' );
    echo json_encode( $data );
    exit();
}

// 如果客户端采用的是 script 标记对我发送的请求
// 一定要返回一段 JavaScript
header( 'Content-Type: application/javascript' );
$result = json_encode( $data );

$callback_name = $_GET['callback'];

echo "typeof {$callback_name} === 'function' && {$callback_name}({$result})";

```
