import{_ as s,c as n,o as a,a as p}from"./app.c7e61bfa.js";const o="/myBlog/assets/prototype-prototypeChain-1.b729dc7e.png",l="/myBlog/assets/prototype-prototypeChain-2.c8521d23.png",e="/myBlog/assets/prototype-prototypeChain-3.ce51460d.png",t="/myBlog/assets/prototype-prototypeChain-4.c369ba8c.png",r="/myBlog/assets/prototype-prototypeChain-5.9be0fe0d.png",u=JSON.parse('{"title":"1.javascript \u539F\u578B","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.1 \u4EC0\u4E48\u662F\u539F\u578B","slug":"_1-1-\u4EC0\u4E48\u662F\u539F\u578B","link":"#_1-1-\u4EC0\u4E48\u662F\u539F\u578B","children":[]},{"level":2,"title":"1.2 \u539F\u578B\u7684\u6307\u5411","slug":"_1-2-\u539F\u578B\u7684\u6307\u5411","link":"#_1-2-\u539F\u578B\u7684\u6307\u5411","children":[{"level":3,"title":"1.2.1 \u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578Bproto\u7684\u6307\u5411","slug":"_1-2-1-\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578Bproto\u7684\u6307\u5411","link":"#_1-2-1-\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578Bproto\u7684\u6307\u5411","children":[]},{"level":3,"title":"1.2.2 \u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61 prototype \u7684\u6784\u9020\u5668\u7684\u6307\u5411","slug":"_1-2-2-\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61-prototype-\u7684\u6784\u9020\u5668\u7684\u6307\u5411","link":"#_1-2-2-\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61-prototype-\u7684\u6784\u9020\u5668\u7684\u6307\u5411","children":[]}]},{"level":2,"title":"1.3 \u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u5BF9\u8C61\u4E0E\u5B9E\u4F8B\u5BF9\u8C61\u4E09\u8005\u7684\u5173\u7CFB","slug":"_1-3-\u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u5BF9\u8C61\u4E0E\u5B9E\u4F8B\u5BF9\u8C61\u4E09\u8005\u7684\u5173\u7CFB","link":"#_1-3-\u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u5BF9\u8C61\u4E0E\u5B9E\u4F8B\u5BF9\u8C61\u4E09\u8005\u7684\u5173\u7CFB","children":[]},{"level":2,"title":"1.4 \u539F\u578B\u7684\u4F5C\u7528","slug":"_1-4-\u539F\u578B\u7684\u4F5C\u7528","link":"#_1-4-\u539F\u578B\u7684\u4F5C\u7528","children":[{"level":3,"title":"1.4.1 \u6570\u636E\u5171\u4EAB","slug":"_1-4-1-\u6570\u636E\u5171\u4EAB","link":"#_1-4-1-\u6570\u636E\u5171\u4EAB","children":[]},{"level":3,"title":"1.4.2 \u5B9E\u73B0\u7EE7\u627F","slug":"_1-4-2-\u5B9E\u73B0\u7EE7\u627F","link":"#_1-4-2-\u5B9E\u73B0\u7EE7\u627F","children":[]}]}],"relativePath":"prototype/prototype-prototypeChain.md"}'),c={name:"prototype/prototype-prototypeChain.md"},y=p(`<h1 id="_1-javascript-\u539F\u578B" tabindex="-1">1.javascript \u539F\u578B <a class="header-anchor" href="#_1-javascript-\u539F\u578B" aria-hidden="true">#</a></h1><h2 id="_1-1-\u4EC0\u4E48\u662F\u539F\u578B" tabindex="-1">1.1 \u4EC0\u4E48\u662F\u539F\u578B <a class="header-anchor" href="#_1-1-\u4EC0\u4E48\u662F\u539F\u578B" aria-hidden="true">#</a></h2><p>\u6CE8\u610F\uFF1A\u7406\u89E3\u539F\u578B\u4E4B\u524D\u9996\u5148\u8981\u77E5\u9053\u4EC0\u4E48\u662F<strong>\u6784\u9020\u51FD\u6570</strong>\u3002\u5728 JavaScript \u4E2D\uFF0C\u7528 new \u5173\u952E\u5B57\u6765\u8C03\u7528\u7684\u51FD\u6570\uFF0C\u79F0\u4E3A\u6784\u9020\u51FD\u6570\u3002\u6784\u9020\u51FD\u6570\u9996\u5B57\u6BCD\u4E00\u822C\u5927\u5199\uFF08\u89C4\u8303\uFF09\u3002</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#676E95;">//\u8FD9\u5C31\u662F\u4E00\u4E2A\u975E\u5E38\u666E\u901A\u7684\u6784\u9020\u51FD\u6570</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;">//\u90A3\u4E0B\u9762\u6211\u5C31\u7528\u8FD9\u4E2A\u6784\u9020\u51FD\u6570\u6765\u5B9E\u4F8B\u5316\u4E00\u4E2A\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> per </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u5206\u522B\u6253\u5370\u6784\u9020\u51FD\u6570Person\u548C\u5B9E\u4F8B\u5BF9\u8C61per\u7684\u6240\u6709\u5C5E\u6027\u548C\u5C5E\u6027\u503C</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dir</span><span style="color:#A6ACCD;">(Person)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dir</span><span style="color:#A6ACCD;">(per)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p><img src="`+o+`" alt=""></p><blockquote><p>\u53EF\u4EE5\u770B\u5230\uFF1A\u6784\u9020\u51FD\u6570\u91CC\u9762\u6709\u4E00\u4E2A prototype \u5C5E\u6027\uFF0C\u5B9E\u529B\u5BF9\u8C61\u91CC\u9762\u6709\u4E00\u4E2A<strong>proto</strong>\u5C5E\u6027\uFF0C\u8FD9\u4E24\u4E2A\u5C5E\u6027\u90FD\u53EB\u539F\u578B\uFF0C\u4E5F\u53EB\u539F\u578B\u5BF9\u8C61\u3002 \u9700\u8981\u6CE8\u610F\u7684\u662F\uFF1A\u539F\u578B<strong>proto</strong>\u4E00\u822C\u662F\u7ED9\u6D4F\u89C8\u5668\u4F7F\u7528\u7684\uFF0C\u4E0D\u662F\u6807\u51C6\u7684\u5C5E\u6027\uFF0C\u4E3A\u4EC0\u4E48\u8FD9\u6837\u8BF4\uFF0C\u56E0\u4E3A ie8 \u91CC\u9762\u662F\u6CA1\u6709\u8FD9\u4E2A\u5C5E\u6027\u7684\u3002\u800C\u539F\u578B prototype \u624D\u662F\u7A0B\u5E8F\u5458\u4F1A\u4F7F\u7528\u5230\u7684\uFF0C\u662F\u4E00\u4E2A\u6807\u51C6\u7684\u5C5E\u6027\u3002</p></blockquote><h2 id="_1-2-\u539F\u578B\u7684\u6307\u5411" tabindex="-1">1.2 \u539F\u578B\u7684\u6307\u5411 <a class="header-anchor" href="#_1-2-\u539F\u578B\u7684\u6307\u5411" aria-hidden="true">#</a></h2><h3 id="_1-2-1-\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578Bproto\u7684\u6307\u5411" tabindex="-1">1.2.1 \u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B<strong>proto</strong>\u7684\u6307\u5411 <a class="header-anchor" href="#_1-2-1-\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578Bproto\u7684\u6307\u5411" aria-hidden="true">#</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> per </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">per</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__ </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//true</span></span>
<span class="line"></span></code></pre></div><p>\u5728\u63A7\u5236\u53F0\u4E2D\u8F93\u51FA\u4E0A\u9762\u7684\u8BED\u53E5\u4F1A\u8F93\u51FA true\uFF0C\u6240\u4EE5\u8FD9\u91CC\u6211\u4EEC\u901A\u5E38\u5C31\u4F1A\u8BF4\u5B9E\u4F8B\u5BF9\u8C61 per \u7684\u539F\u578B<strong>proto</strong>\uFF0C\u6307\u5411\u4E86\u6784\u9020\u51FD\u6570 Person \u7684\u539F\u578B prototype\u3002 <strong>\u6240\u4EE5\u5C31\u5F97\u51FA\u4E86\u4E00\u4E2A\u7ED3\u8BBA\uFF1A</strong> \u5B9E\u4F8B\u5BF9\u8C61\u7684<strong>proto</strong>\u6307\u5411\u4E86\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61 prototype\u3002</p><h3 id="_1-2-2-\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61-prototype-\u7684\u6784\u9020\u5668\u7684\u6307\u5411" tabindex="-1">1.2.2 \u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61 prototype \u7684\u6784\u9020\u5668\u7684\u6307\u5411 <a class="header-anchor" href="#_1-2-2-\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61-prototype-\u7684\u6784\u9020\u5668\u7684\u6307\u5411" aria-hidden="true">#</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> per </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Person</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//true</span></span>
<span class="line"></span></code></pre></div><p><img src="`+l+'" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><p>\u800C\u5728\u539F\u578B\u5BF9\u8C61 prototype \u4E2D\uFF0C\u6709\u4E00\u4E2A\u5C5E\u6027 constructor \u6784\u9020\u5668,\u6839\u636E\u4E0A\u9762\u8F93\u51FA\u7684\u7ED3\u679C\u6211\u4EEC\u901A\u5E38\u5C31\u4F1A\u8BF4\u8FD9\u4E2A constructor \u6784\u9020\u5668\u6307\u5411\u7684\u5C31\u662F\u81EA\u5DF1\u6240\u5728\u7684\u539F\u578B\u5BF9\u8C61 prototype \u6240\u5728\u7684\u6784\u9020\u51FD\u6570\u3002 <strong>\u6240\u4EE5\u5C31\u4E5F\u5F97\u51FA\u4E86\u4E00\u4E2A\u7ED3\u8BBA\uFF1A</strong> \u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61(prototype)\u4E2D\u6709\u4E00\u4E2A constructor \u6784\u9020\u5668,\u8FD9\u4E2A\u6784\u9020\u5668\u6307\u5411\u7684\u5C31\u662F\u81EA\u5DF1\u6240\u5728\u7684\u539F\u578B\u5BF9\u8C61\u6240\u5728\u7684\u6784\u9020\u51FD\u6570\u3002</p><h2 id="_1-3-\u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u5BF9\u8C61\u4E0E\u5B9E\u4F8B\u5BF9\u8C61\u4E09\u8005\u7684\u5173\u7CFB" tabindex="-1">1.3 \u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u5BF9\u8C61\u4E0E\u5B9E\u4F8B\u5BF9\u8C61\u4E09\u8005\u7684\u5173\u7CFB <a class="header-anchor" href="#_1-3-\u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u5BF9\u8C61\u4E0E\u5B9E\u4F8B\u5BF9\u8C61\u4E09\u8005\u7684\u5173\u7CFB" aria-hidden="true">#</a></h2><p>\u597D\u4E86\uFF0C\u73B0\u5728\u5927\u6982\u77E5\u9053\u539F\u578B<strong>proto</strong>\u4E0E\u539F\u578B prototype \u4E4B\u95F4\u7684\u5173\u7CFB\u3001\u6784\u9020\u51FD\u6570\u4E0E\u539F\u578B\u4E4B\u95F4\u7684\u5173\u7CFB\u4E4B\u540E\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u753B\u51FA\u4E00\u4E2A\u5173\u7CFB\u56FE\uFF08\u8FD9\u4E9B\u5173\u7CFB\u6709\u4EC0\u4E48\u7528\uFF0C\u4E0B\u9762 1.4 \u4F1A\u8BF4\u5230\uFF09\uFF0C\u8FD9\u6837\u770B\u7684\u66F4\u660E\u4E86\uFF1A <img src="'+e+`" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"></p><h2 id="_1-4-\u539F\u578B\u7684\u4F5C\u7528" tabindex="-1">1.4 \u539F\u578B\u7684\u4F5C\u7528 <a class="header-anchor" href="#_1-4-\u539F\u578B\u7684\u4F5C\u7528" aria-hidden="true">#</a></h2><p>\u539F\u578B\u6709\u4E24\u4E2A\u4F5C\u7528\uFF1A1.\u5B9E\u73B0\u6570\u636E\u5171\u4EAB\uFF1B2.\u4E3A\u4E86\u5B9E\u73B0\u7EE7\u627F\u3002</p><h3 id="_1-4-1-\u6570\u636E\u5171\u4EAB" tabindex="-1">1.4.1 \u6570\u636E\u5171\u4EAB <a class="header-anchor" href="#_1-4-1-\u6570\u636E\u5171\u4EAB" aria-hidden="true">#</a></h3><p><strong>\u4E0D\u597D\u7684\u65B9\u6CD5\uFF1A</strong></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">eat</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//\u4EBA\u5E94\u8BE5\u90FD\u6709\u4E00\u4E2A\u5403\u7684\u65B9\u6CD5 \u5E76\u4E14\u90FD\u5C5E\u4E8E\u4EBA\u7C7B</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//\u90A3\u5E94\u8BE5\u600E\u4E48\u5199\uFF0C\u624D\u80FD\u8BA9\u6240\u6709\u521B\u5EFA\u51FA\u6765\u7684\u5B9E\u4F8B\u5BF9\u8C61\u90FD\u6709\u8FD9\u4E2A\u5403\u7684\u65B9\u6CD5\u548C\u8FD9\u4E2A\u4EBA\u7C7B\u7684\u5C5E\u6027\u5462</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">//\u53EF\u4EE5\u8FD9\u6837\u64CD\u4F5C\uFF0C\u5728\u5B9E\u4F8B\u5316\u5BF9\u8C61\u7684\u65F6\u5019\uFF0C\u4F20\u8FDB\u53BB\u4EBA\u7C7B\u7684\u5C5E\u6027\u548C\u5403\u7684\u65B9\u6CD5</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">eat</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">eat</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">eat</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u5403</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> per </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u4EBA\u7C7B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> eat)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(per</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//\u4EBA\u7C7B</span></span>
<span class="line"><span style="color:#A6ACCD;">per</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eat</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5403</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u603B\u7ED3\uFF1A</span></span>
<span class="line"><span style="color:#676E95;">/*</span></span>
<span class="line"><span style="color:#676E95;">    \u4E0A\u9762\u7684\u65B9\u6CD5\u786E\u5B9E\u53EF\u4EE5\u5B9E\u73B0\u76EE\u7684\uFF0C\u4F46\u662F\u4F1A\u6709\u4E24\u4E2A\u7F3A\u70B9\uFF1A</span></span>
<span class="line"><span style="color:#676E95;">    1.\u547D\u540D\u7684\u95EE\u9898\uFF0C\u8981\u662F\u6211\u4EEC\u5199\u4EE3\u7801\u7684\u8FC7\u7A0B\u4E2D\u547D\u540D\u51B2\u7A81\u4E86\uFF0C\u6709\u4E24\u4E2Aeat\u7684\u65B9\u6CD5\uFF0C\u90A3\u4E48\u540E\u9762\u7684\u5C31\u4F1A\u628A\u524D\u9762\u7684\u7ED9\u8986\u76D6\u4E86,\u6240\u4EE5\u5F88\u540C\u610F\u9020\u6210\u547D\u540D\u51B2\u7A81\u7684\u95EE\u9898</span></span>
<span class="line"><span style="color:#676E95;">    2.\u8981\u662F\u6211\u8981\u521B\u5EFA1000\u4E2A\u4EBA\u7684\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u5C31\u8981\u53CD\u590D\u7684\u4F201000\u6B21\u8FD9\u4E2A&#39;\u4EBA\u7C7B&#39;\u548Ceat\u7684\u65B9\u6CD5\uFF0C\u5341\u5206\u70E6\u7410</span></span>
<span class="line"><span style="color:#676E95;">    */</span></span>
<span class="line"></span></code></pre></div><p><strong>\u597D\u7684\u65B9\u6CD5\uFF1A\u5229\u7528\u539F\u578B\u6765\u5B9E\u73B0</strong></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u4EBA\u7C7B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eat</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u5403</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> per1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> per2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(per1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//\u4EBA\u7C7B</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(per2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//\u4EBA\u7C7B</span></span>
<span class="line"><span style="color:#A6ACCD;">per1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eat</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5403</span></span>
<span class="line"><span style="color:#A6ACCD;">per2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eat</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// \u5403</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u603B\u7ED3\uFF1A</span></span>
<span class="line"><span style="color:#676E95;">/*</span></span>
<span class="line"><span style="color:#676E95;">    \u4E0A\u9762\u7684\u5229\u7528\u539F\u578B\u5C31\u5B8C\u7F8E\u7684\u89E3\u51B3\u4E86\u4E4B\u524D\u7684\u4E24\u4E2A\u95EE\u9898\uFF1A</span></span>
<span class="line"><span style="color:#676E95;">    1.\u547D\u540D\u51B2\u7A81\u7684\u95EE\u9898\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u6839\u672C\u5C31\u6CA1\u6709\u62FF\u5168\u5C40\u7684\u53D8\u91CF\uFF1B</span></span>
<span class="line"><span style="color:#676E95;">    2.\u9700\u8981\u53CD\u590D\u4F20\u5165\u53C2\u6570\u7684\u95EE\u9898\uFF0C\u56E0\u4E3A\u5199\u5728prototype\u4E2D\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\u90FD\u662F\u5171\u4EAB\u7684\uFF0C\u6BCF\u4E00\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\u90FD\u53EF\u4EE5\u8BBF\u95EE\u5230</span></span>
<span class="line"><span style="color:#676E95;">    */</span></span>
<span class="line"></span></code></pre></div><blockquote><p>\u7406\u89E3\uFF1A \u8FD9\u91CC\u8981\u601D\u8003\u4E00\u4E0B\u4E3A\u4EC0\u4E48\u5B9E\u4F8B\u5BF9\u8C61\u4E2D\u53EF\u4EE5\u8BBF\u95EE\u5230\u6784\u9020\u51FD\u6570\u539F\u578B prototype \u4E2D\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\u5462\uFF0C\u539F\u56E0\u5C31\u662F\u56E0\u4E3A\u6211\u4EEC\u4E4B\u524D\u8BF4\u7684\u5B9E\u4F8B\u5BF9\u8C61\u7684\u539F\u578B<strong>proto</strong>\u6307\u5411\u4E86\u6784\u9020\u51FD\u6570\u7684\u539F\u578B prototype; \u5B9E\u4F8B\u5BF9\u8C61\u4F7F\u7528\u7684\u5C5E\u6027\u6216\u8005\u65B9\u6CD5,\u5148\u5728\u5B9E\u4F8B\u4E2D\u67E5\u627E,\u627E\u5230\u4E86\u5219\u76F4\u63A5\u4F7F\u7528,\u627E\u4E0D\u5230\uFF0C\u5219\u53BB\u5B9E\u4F8B\u5BF9\u8C61\u7684<strong>proto</strong>\u6307\u5411\u7684\u539F\u578B\u5BF9\u8C61 prototype \u4E2D\u627E,\u627E\u5230\u4E86\u5219\u4F7F\u7528,\u627E\u4E0D\u5230\u5219\u62A5\u9519\u3002</p></blockquote><h3 id="_1-4-2-\u5B9E\u73B0\u7EE7\u627F" tabindex="-1">1.4.2 \u5B9E\u73B0\u7EE7\u627F <a class="header-anchor" href="#_1-4-2-\u5B9E\u73B0\u7EE7\u627F" aria-hidden="true">#</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#676E95;">//\u8FD9\u662F\u4E00\u4E2A\u4EBA\u7684\u6784\u9020\u51FD\u6570</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u4EBA\u7C7B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eat</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\u5403</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u8FD9\u662F\u4E00\u4E2A\u8001\u5E08\u7684\u6784\u9020\u51FD\u6570</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Teacher</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u8001\u5E08\u662F\u5C5E\u4E8E\u4EBA\u7C7B\u7684\u8303\u7574\uFF0C\u90A3\u4E48\u8001\u5E08\u4E5F\u80AF\u5B9A\u662F\u6709 \u4EBA\u7C7B\u548C\u5403 \u7684\u5C5E\u6027\u6216\u65B9\u6CD5</span></span>
<span class="line"><span style="color:#676E95;">//\u90A3\u4E48\u6211\u4EEC\u8981\u91CD\u65B0\u7ED9\u8001\u5E08\u7684\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u6DFB\u52A0\u8FD9\u4E24\u4E2A\u5C5E\u6027\u5417\uFF1F</span></span>
<span class="line"><span style="color:#676E95;">//\u90A3\u80AF\u5B9A\u662F\u4E0D\u9700\u8981\u7684\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7528\u7EE7\u627F\u6765\u5B9E\u73B0\uFF08\u800Cjs\u5B9E\u73B0\u7EE7\u627F\u7684\u539F\u7406\u5C31\u662F\u6539\u53D8\u4E86\u539F\u578Bprototype\u7684\u6307\u5411\uFF09</span></span>
<span class="line"><span style="color:#FFCB6B;">Teacher</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//\u8FD9\u6837\u6211\u4EEC\u5C31\u6539\u53D8\u4E86\u539F\u578B\u7684\u6307\u5411</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> teacher </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(teacher</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//\u4EBA\u7C7B</span></span>
<span class="line"><span style="color:#A6ACCD;">teacher</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">eat</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//\u5403</span></span>
<span class="line"></span></code></pre></div><p>\u6211\u4EEC\u5C06 <strong>Teacher.prototype = new Person()</strong> \u4E4B\u540E\uFF0C\u5982\u679C\u8F93\u51FA <strong>console.dir(Teacher)</strong> \u6784\u9020\u51FD\u6570\u4F60\u4F1A\u53D1\u73B0\u5982\u4E0B\u56FE\uFF1A <img src="`+t+`" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"> js \u5B9E\u73B0\u7EE7\u627F\u7684\u539F\u7406\u5C31\u662F\u6539\u53D8\u4E86\u539F\u578B prototype \u7684\u6307\u5411\uFF0C\u73B0\u5728 Teacher \u7684 prototype \u6307\u5411\u4E86 new Person()\u540E\u7684\u4E00\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u6240\u4EE5\u6211\u4EEC\u7528 Teacher \u521B\u5EFA\u51FA\u6765\u7684\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u4E5F\u662F\u6709 Person \u6784\u9020\u51FD\u6570\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\u7684\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u8BF4 Teacher \u7EE7\u627F\u4E86 Person\u3002</p><h1 id="_2-javascript-\u539F\u578B\u94FE" tabindex="-1">2.javascript \u539F\u578B\u94FE <a class="header-anchor" href="#_2-javascript-\u539F\u578B\u94FE" aria-hidden="true">#</a></h1><p><strong>\u539F\u578B\u94FE:</strong> \u662F\u4E00\u79CD\u5173\u7CFB,\u5B9E\u4F8B\u5BF9\u8C61\u548C\u539F\u578B\u5BF9\u8C61 prototype \u4E4B\u95F4\u7684\u5173\u7CFB,\u5173\u7CFB\u662F\u901A\u8FC7\u539F\u578B<strong>proto</strong>\u6765\u8054\u7CFB\u7684\u3002</p><p><strong>\u4E0B\u9762\u6211\u4EEC\u6765\u63A8\u5BFC\u51FA\u4E00\u6574\u6761\u539F\u578B\u94FE\uFF1A</strong></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> per </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dir</span><span style="color:#A6ACCD;">(per)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dir</span><span style="color:#A6ACCD;">(Person)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u5B9E\u4F8B\u5BF9\u8C61\u4E2D\u6709__proto__\u539F\u578B</span></span>
<span class="line"><span style="color:#676E95;">//\u6784\u9020\u51FD\u6570\u4E2D\u6709prototype\u539F\u578B</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//prototype\u662F\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#676E95;">//\u6240\u4EE5,prototype\u8FD9\u4E2A\u5BF9\u8C61\u4E2D\u4E5F\u6709__proto__,\u90A3\u4E48\u6307\u5411\u4E86\u54EA\u91CC</span></span>
<span class="line"><span style="color:#676E95;">//\u5B9E\u4F8B\u5BF9\u8C61\u4E2D\u7684__proto__\u6307\u5411\u7684\u662F\u6784\u9020\u51FD\u6570\u7684prototype</span></span>
<span class="line"><span style="color:#676E95;">//\u6240\u4EE5,prototype\u8FD9\u4E2A\u5BF9\u8C61\u4E2D__proto__\u6307\u5411\u7684\u5E94\u8BE5\u662F\u67D0\u4E2A\u6784\u9020\u51FD\u6570\u7684\u539F\u578Bprototype</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u6253\u5370\u4E00\u4E0B\u4E0B\u9762\u7684\u8BED\u53E5\uFF1A</span></span>
<span class="line"><span style="color:#676E95;">//console.log(Person.prototype.__proto__);</span></span>
<span class="line"><span style="color:#676E95;">//console.log(Object.prototype)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__ </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#676E95;">//\u7531\u4E0A\u9762\u53EF\u4EE5\u63A8\u51FA\uFF1APerson.prototype.__proto__\u6307\u5411\u4E86Object.prototype</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">//\u6240\u4EE5\uFF1A</span></span>
<span class="line"><span style="color:#676E95;">//per\u5B9E\u4F8B\u5BF9\u8C61\u7684__proto__\u6307\u5411Person.prototype</span></span>
<span class="line"><span style="color:#676E95;">//Person.prototype\u7684__proto__\u6307\u5411Object.prototype</span></span>
<span class="line"><span style="color:#676E95;">//Object.prototype\u7684__proto__\u662Fnull</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(per</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__ </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(per</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__ </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__ </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">__proto__)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">//null</span></span>
<span class="line"></span></code></pre></div><p><strong>\u4E0B\u9762\u6211\u4EEC\u628A\u8FD9\u6761\u539F\u578B\u94FE\u753B\u51FA\u6765\uFF1A</strong><img src="`+r+'" alt="\u5728\u8FD9\u91CC\u63D2\u5165\u56FE\u7247\u63CF\u8FF0"><strong>\u603B\u7ED3\uFF1A</strong><strong>1.\u539F\u578B\u94FE\uFF1A</strong> \u662F\u4E00\u79CD\u5173\u7CFB,\u5B9E\u4F8B\u5BF9\u8C61\u548C\u539F\u578B\u5BF9\u8C61 prototype \u4E4B\u95F4\u7684\u5173\u7CFB,\u5173\u7CFB\u662F\u901A\u8FC7\u539F\u578B<strong>proto</strong>\u6765\u8054\u7CFB\u7684\u3002 <strong>2.\u539F\u578B\u94FE\u6700\u7EC8\u6307\u5411\u662F\uFF1A</strong> \u539F\u578B\u94FE\u6700\u7EC8\u7684\u6307\u5411\u662F Object \u7684 prototype \u4E2D\u7684<strong>proto</strong>\u662F null\u3002</p>',32),D=[y];function F(A,C,i,_,d,g){return a(),n("div",null,D)}const E=s(c,[["render",F]]);export{u as __pageData,E as default};