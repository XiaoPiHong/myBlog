import{_ as e,o as t,c as n,X as i}from"./chunks/framework.af6290ec.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"engineering/engineering-vite.md","filePath":"engineering/engineering-vite.md"}'),r={name:"engineering/engineering-vite.md"},a=i('<h2 id="传统编译工具" tabindex="-1">传统编译工具 <a class="header-anchor" href="#传统编译工具" aria-label="Permalink to &quot;传统编译工具&quot;">​</a></h2><p><strong>处理方式：</strong></p><p>因为旧时浏览器不支持 es 模块，传统的打包都是通过工具、处理并将我们的源码模块串联成可以在浏览器中运行的文件</p><p><strong>缺点：</strong></p><p>1.服务器启动缓慢，传统的项目启动是基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务（也就是得所有模块都构建完才能启动）</p><p>2.打包工具是基于 js 开发，有性能瓶颈</p><p>3.更新缓慢，项目体积大了后，即使使用热替换（HMR），修改后的效果显示时间也很长</p><h2 id="vite" tabindex="-1">vite <a class="header-anchor" href="#vite" aria-label="Permalink to &quot;vite&quot;">​</a></h2><p><strong>处理方式：</strong></p><p>利用浏览器支持 es 模块的技术，且用了使用编译型语言编写的打包器 esbuild（使用 Go 语言编写）</p><p><strong>优点：</strong></p><p>1.将项目中的模块分为依赖、源码两类，构建应用时，用 esbuild 去打包依赖比用传统的 js 打包依赖快 10-100 倍</p><p>2.用浏览器支持 es 模块的优点，直接为浏览器提供 es 模块化源码，就不像传统打包那样还要打包器先将源码串联再提供，这样也就是让浏览器接管了打包器的部分工作</p><p>3.构建应用时并不是所有的源码都需要同时被加载，是根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理（例如基于路由拆分的代码模块）</p><p>4.HMR 更新更快，其 HMR 是在 es 模块上执行的，当编辑一个文件时，Vite 只需要精确地使编辑的模块本身更新</p><p>5.重新加载页面时使用 http 协商缓存来进行页面缓存，避免重新请求</p>',16),s=[a];function p(o,_,c,g,d,l){return t(),n("div",null,s)}const u=e(r,[["render",p]]);export{m as __pageData,u as default};