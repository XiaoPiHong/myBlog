# script 标签

### 浏览器如何渲染 html

**浏览器在接收到 html 文件后，会分几个步骤将 html 文件转化成界面，这个过程就是渲染。**

**1、解析 html**

**2、构建 dom 树**

**3、dom 树结合 css 文件，构建呈现树**

**4、布局（回流）**

**5、绘制（重绘）**

### script 标签的常用属性

<table style="table-layout: auto; border-collapse: collapse;">
  <tr>
    <td>async</td>
    <td>可选。表示应该立即开始下载脚本，但不能阻止其他页面的动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。</td>
  </tr>
  <tr>
    <td>defer</td>
    <td>可选。允许在文档解析和显示完成后再执行脚本。只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以执行这个属性。</td>
  </tr>
  <tr>
    <td>crossorigin</td>
    <td>可选。配置相关请求的cors（跨域资源共享）设置，默认不使用cors。corssorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。</td>
  </tr>
  <tr>
    <td>integrity</td>
    <td>可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI， Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错， 脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提 供恶意内容。</td>
  </tr>
  <tr>
    <td>src</td>
    <td>可选。表示包含要执行的代码的外部文件。</td>
  </tr>
  <tr>
    <td>type</td>
    <td>可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯 例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript" 都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给 type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有 "application/javascript"和"application/ecmascript"。如果这个值是 module，则代 码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。</td>
  </tr>
</table>

### script 标签的位置

过去，所有 script 元素都被放在页面的 head 标签内，这种做法的主要目的是把外部的 CSS 和 JavaScript 文件都集中放到一起。

不过，把所有 JavaScript 文件都放在 head 里，也就意味着必须把所有 JavaScript 代码都下载、解析和解释完成后，才能开始渲 染页面（页面在浏览器解析到 body 的起始标签时开始渲染）。

对于需要很多 JavaScript 的页面，这会 导致页面渲染的明显延迟，在此期间浏览器窗口完全空白。为解决这个问题，现代 Web 应用程序通常 将所有 JavaScript 引用放在 body 元素中的页面内容后面，这样一来，页面会在处理 JavaScript 代码之前完全渲染页面。用户会感觉页面加载更快了，因为浏 览器显示空白页面的时间短了。

### 行内脚本和外部文件脚本

**行内脚本：直接在 HTML 文件中嵌入 JavaScript 代码**

**外部文件脚本：\<script src="mainA.js"\>\</script>**

### 动态加载脚本

除了 script 标签，还有其他方式可以加载脚本。因为 JavaScript 可以使用 DOM API，所以通过
向 DOM 中动态添加 script 元素同样可以加载指定的脚本。只要创建一个 script 元素并将其添加到
DOM 即可。

```javascript
let script = document.createElement("script");
script.src = "gibberish.js";
document.head.appendChild(script);
```

当然，在把 HTMLElement 元素添加到 DOM 且执行到这段代码之前不会发送请求。默认情况下， 以这种方式创建的 script 元素是以异步方式加载的，相当于添加了 async 属性。不过这样做可能会 有问题，因为所有浏览器都支持 createElement()方法，但不是所有浏览器都支持 async 属性。因此， 如果要统一动态脚本的加载行为，可以明确将其设置为同步加载：

```javascript
let script = document.createElement("script");
script.src = "gibberish.js";
script.async = false;
document.head.appendChild(script);
```

以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响它们在资源获取队列中的优先级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。要想让预加载器知道这些动态请求文件的存在，可以在文档头部显式声明它们：

\<link rel="preload" href="gibberish.js"\>
需要注意的是，预加载并不保证脚本的立即执行。预加载只是将资源下载到缓存中，而脚本的执行时机仍然取决于它们在 HTML 中的位置和其他相关因素。

**通过在 \<link\> 标签中使用 preload 属性加载 JavaScript 脚本，可以带来以下好处：**

1.预加载资源：浏览器在加载页面时会预先下载被标记为 preload 的资源，这包括 JavaScript 脚本文件。这样，当脚本实际需要执行时，浏览器可以直接从缓存中获取，减少了网络请求的延迟和传输时间。

2.提高加载速度：预加载 JavaScript 脚本可以减少等待时间，因为脚本已经被提前下载到浏览器的缓存中。这样可以加快页面的加载速度，提升用户体验。

3.避免阻塞：使用 preload 属性加载 JavaScript 脚本时，浏览器会在下载脚本的同时继续解析 HTML 和加载其他资源。这避免了脚本的下载和执行阻塞其他操作的情况，从而提高页面的并行性和响应性。

### script 标签的加载（下载到执行的过程）

所有 script 元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的 情况下，包含在 script 元素中的代码必须严格按次序解释。（会阻塞页面的渲染，加载完一个之后才能继续加载第二个）

<table style="table-layout: auto; border-collapse: collapse;">
  <tr>
    <td></td>
    <td>正常（非async、defer）</td>
    <td>async</td>
    <td>defer</td>
  </tr>
  <tr>
    <td>是否阻塞页面渲染</td>
    <td>是</td>
    <td>否</td>
    <td>否</td>
  </tr>
  <tr>
    <td>执行时间</td>
    <td>下载完成后立即执行</td>
    <td>下载完成后立即执行</td>
    <td>推迟到DOMContentLoaded事件之前</td>
  </tr>
  <tr>
    <td>多正常/async/defer的脚本能否按script顺序执行</td>
    <td>能</td>
    <td>不能（优先下载完优先执行）</td>
    <td>能</td>
  </tr>
</table>

### 小结

**所有 script 元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的 情况下，包含在 script 元素中的代码必须严格按次序解释。**

**对不推迟执行的脚本，浏览器必须解释完位于 script 元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把 script 元素放到页面末尾，介于主内容之后及\</body\>标签 之前。**

**可以使用 defer 属性把脚本推迟到 HTML 文档解析完成并且所有 DOM 元素都可用后（DOMContentLoaded 事件之前）再执行。推迟的脚本原则上按照它们被列出的次序执行。**

**可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。**
