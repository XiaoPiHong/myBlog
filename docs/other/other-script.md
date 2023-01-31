# script 标签的执行顺序

**浏览器在接收到 html 文件后，会分几个步骤将 html 文件转化成界面，这个过程就是渲染。**

**1、解析 html**

**2、构建 dom 树**

**3、dom 树结合 css 文件，构建呈现树**

**4、布局**

**5、绘制**

**理解：只要不存在 defer 和 async 属性，浏览器都会按照 script 元素在页面中出现的先后顺序对他们依次进行解析（文件下载和代码执行）**

1.script 标签的解析顺序默认是按顺序解析的（**阻塞式执行，也就是阻塞页面的渲染**），也就是下载一个执行一个

2.所以这里 script 标签就会有一个 async 的属性，如果该组 script 标签加了 async 属性，该组 script 标签是不会阻止后面的 script 标签的下载和执行，也就是变成了在下载和执行带有 async 的 script 标签的同时，还会下载和执行后面的 script 标签（不必阻塞页面的解析（渲染）等待该脚本的下载和执行）。

这里我们要认识两点：

1.内联的 script 标签加 async 是没有用的（直接在一对 script 标签里面写代码，而不是以 src 的方式引入 js 脚本的 script 标签就是内联脚本写法）

2.平时用脚本插入 script 标签的写法默认是带 async 的，就如下：

```javascript
var script = document.createElement("script");
script.src = "file.js";
document.body.appendChild(script);
```

3.这里还有 script 的 defer 属性，带有 defer 属性的脚本，脚本会被延迟到整个页面都解析完毕后再运行。相当于告诉浏览器立即下载，但是延迟执行，而且都会先于 DOMContentLoaded 事件执行。这种方式也不阻塞页面的渲染。
