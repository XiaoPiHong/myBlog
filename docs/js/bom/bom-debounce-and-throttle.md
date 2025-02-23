# 防抖、节流

## 防抖

1. 事件被触发 n 秒后做某个操作，如果 n 秒内又被触发，则重新计时（顾名思义：防止手抖）
2. 防抖以闭包的形式存在
3. 防抖分立即执行防抖和非立即执行防抖
4. 应用场景：监听 scroll 滚动事件、搜索输入框查询、表单验证、按钮提交事件、浏览器窗口缩放...

## 节流

1. 在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。（相当于间隔 n 秒执行一次）
2. 节流以闭包的形式存在
3. 节流分时间戳节流和定时节流
4. 应用场景：监听 scroll 滚动事件、dom 元素的拖拽功能实现、射击游戏、计算鼠标移动的距离...

## 防抖案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <input type="text" id="debounce1" placeholder="非立即执行防抖" /><br />
    <input type="text" id="debounce2" placeholder="立即执行防抖" /><br />
    <input
      type="text"
      id="debounce3"
      placeholder="需要用返回值进行执行的防抖"
    /><br />
    <input type="text" id="debounce4" placeholder="取消防抖" /><button
      id="cancel-btn"
    >
      取消防抖</button
    ><button id="del-btn">删除防抖</button><br />
    <script>
      /*
    -----------------------------------------非立即执行防抖 & 立即执行防抖---------------------------------------------
    */
      (function () {
        document
          .getElementById("debounce1")
          .addEventListener("keyup", debounce(dosomething, 1000), false); //触发1秒后才执行，1秒内重复触发重新计时
        document
          .getElementById("debounce2")
          .addEventListener("keyup", debounce(dosomething, 1000, true), false); //第一次触发会执行，且过了一秒后重新触发才会重新执行
        function debounce(func, wait, immediate) {
          let timeout;
          return function () {
            const that = this;
            const args = arguments;
            clearTimeout(timeout);
            if (immediate) {
              const callNow = !timeout;
              timeout = setTimeout(function () {
                timeout = null;
              }, wait);
              if (callNow) func.apply(that, args);
            } else {
              timeout = setTimeout(function () {
                func.apply(that, args);
              }, wait);
            }
          };
        }
        function dosomething() {
          console.log("需要利用防抖做的事情");
        }
      })();
    </script>
    <script>
      /*
      ---------------------------------------需要用返回值进行执行的防抖--------------------------------------------------
      */
      (function () {
        document
          .getElementById("debounce3")
          .addEventListener("keyup", debounce(dosomething, 1000), false);
        function debounce(func, wait) {
          let timeout;
          let result; //返回的结果
          return function () {
            const that = this; //改变执行函数内部this的指向
            const args = arguments; //解决dosomething event指向问题
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              console.log(result); //这里第一次打印undefined,第二次打印的是'想要的结果'，所以在这里可以获取到上一次执行之后的结果做某些操作（因为这里是闭包，所以result的值就是上一次执行完的值）
              result = func.apply(that, args);
            }, wait);
            return result;
          };
        }
        function dosomething() {
          //可能会做 回调 或者 ajax请求
          console.log("需要利用防抖做的事情");
          return "想要的结果";
        }
      })();
    </script>
    <script>
      /*
      -----------------------------------------取消防抖 & 删除防抖-------------------------------------------------
      */
      (function () {
        function debounce(func, wait) {
          let timeout;
          let del = false;
          let debounced = function () {
            const that = this;
            const args = arguments;
            if (del) {
              func.apply(that, args);
              return;
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              func.apply(that, args);
            }, wait);
          };
          debounced.cancel = function () {
            //取消防抖是把当前触发后需要执行的操作给取消掉
            clearTimeout(timeout);
            timeout = null;
          };
          debounced.delete = function () {
            //删除防抖就是恢复默认点击触发
            del = true;
          };
          return debounced;
        }
        function dosomething() {
          console.log("需要利用防抖做的事情");
        }
        const doDebounce = debounce(dosomething, 1000); //const没有变量提升，绑定事件要写在它后面
        document
          .getElementById("debounce4")
          .addEventListener("keyup", doDebounce, false);
        document
          .getElementById("cancel-btn")
          .addEventListener("click", doDebounce.cancel, false);
        document
          .getElementById("del-btn")
          .addEventListener("click", doDebounce.delete, false);
      })();
    </script>
  </body>
</html>
```

## 节流案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #div1 {
      max-height: 100px;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: pink;
    }

    #div2 {
      height: 2000px;
    }

    #div3 {
      max-height: 100px;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: yellow;
    }

    #div4 {
      height: 2000px;
    }

    #div5 {
      max-height: 100px;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: red;
    }

    #div6 {
      height: 2000px;
    }

    #div7 {
      max-height: 100px;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: green;
    }

    #div8 {
      height: 2000px;
    }
  </style>
</head>

<body>
  <div id="div1">
    <div id="div2">时间戳节流</div>
  </div>
  <div id="div3">
    <div id="div4">定时器节流</div>
  </div>
  <div id="div5">
    <div id="div6">时间戳+定时器节流</div>
  </div>
  <div id="div7">
    <div id="div8">优化节流</div>
  </div>
  <script>
    /*
    --------------------------------时间戳节流------------------------------
    */
    (function () {
      //n秒内第一次触发立即执行，最后一次触发不执行
      function throttle(func, wait) {
        let old = 0
        return function () {
          const that = this
          const args = arguments
          let now = new Date().valueOf()
          if (now - old > wait) {
            func.apply(that, args)
            old = now
          }
        }
      }
      function dosomething(e) {
        console.log('需要利用节流做的事情')
      }
      document.getElementById('div1').onscroll = throttle(dosomething, 100)
    })()
  </script>
  <script>
      /*
      --------------------------------定时器节流------------------------------
      */
      (function () {
        //n秒内第一次触发不立即执行，最后一次触发执行
        function throttle(func, wait) {
          let timeout
          return function () {
            const that = this
            const args = arguments
            if (!timeout) {
              timeout = setTimeout(function () {
                func.apply(that, args)
                timeout = null
              }, wait)
            }
          }
        }
        function dosomething(e) {
          console.log('需要利用节流做的事情')
        }
        document.getElementById('div3').onscroll = throttle(dosomething, 5000)
      })()
  </script>
  <script>
      /*
      --------------------------------时间戳+定时器节流------------------------------
      */
      (function () {
        //n秒内第一次触发立即执行，最后一次触发也执行
        function throttle(func, wait) {
          let old = 0
          let timeout
          return function () {
            const that = this
            const args = arguments
            let now = +new Date()
            if (now - old > wait) {
              if (timeout) {
                clearTimeout(timeout)
                timeout = null
              }
              func.apply(that, args)
              old = now
            } else if (!timeout) {
              timeout = setTimeout(function () {
                func.apply(that, args)
                old = +new Date()
                timeout = null
              }, wait)
            }
          }
        }
        function dosomething(e) {
          console.log('需要利用节流做的事情')
        }
        document.getElementById('div5').onscroll = throttle(dosomething, 5000)
      })()
  </script>
  <script>
      /*
      --------------------------------优化节流（可控制首次是否立即触发与最后一次触发是否执行）------------------------------
      */
      (function () {
        function throttle(func, wait, options) {
          let timeout
          let old = 0
          if (!options) options = {}
          return function () {
            const that = this
            const args = arguments
            let now = new Date().valueOf()
            if (options.leading === false && !old) {
              old = now
            }
            if (now - old > wait) {
              if (timeout) {
                clearTimeout(timeout)
                timeout = null
              }
              func.apply(that, args)
              old = now
            } else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(function () {
                func.apply(that, args)
                old = new Date().valueOf()
                timeout = null
              }, wait)
            }
          }
        }
        function dosomething() {
          console.log('需要利用节流做的事情')
        }
        document.getElementById('div7').onscroll = throttle(dosomething, 5000, { leading: true, trailing: false })
        /*
        第一次触发立即执行，最后一次触发不会执行：   options:{leading:true,trailing:false}
        第一次触发不会立即执行，最后一次触发会执行：   options:{leading:false,trailing:true}
        第一次触发会立即执行，最后一次触发也会执行：    options:{leading:true,trailing:true}
        默认:                                        options={leading:true,trailing:true}
        */
      })()
  </script>
  <script>
    /*
    --------------------------------取消节流------------------------------
    */
    //取消节流和取消防抖一样
  </script>
</body>

</html>
```

## 总结

1. 函数防抖和函数节流都是防止某一时间频繁触发，但是这两种原理却不一样
2. 函数防抖是某一时间内执行一次，而函数节流是间隔时间执行
3. 实际生产还是使用 lodash 实现可靠的防抖、节流
