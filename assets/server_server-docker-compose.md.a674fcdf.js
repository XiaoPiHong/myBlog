import{_ as s,o as a,c as o,X as e}from"./chunks/framework.af6290ec.js";const h=JSON.parse('{"title":"Docker Compose 简介","description":"","frontmatter":{},"headers":[],"relativePath":"server/server-docker-compose.md","filePath":"server/server-docker-compose.md"}'),n={name:"server/server-docker-compose.md"},l=e(`<h1 id="docker-compose-简介" tabindex="-1">Docker Compose 简介 <a class="header-anchor" href="#docker-compose-简介" aria-label="Permalink to &quot;Docker Compose 简介&quot;">​</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p><a href="https://docs.docker.com/compose/" target="_blank" rel="noreferrer">Compose</a> 是 Docker 公司推出的一个工具软件，可以管理多个 Docker 容器组成一个应用。你需要定义一个 <a href="https://www.ruanyifeng.com/blog/2016/07/yaml.html" target="_blank" rel="noreferrer">YAML</a> 格式的配置文件 docker-compose.yml，写好多个容器之间的调用关系。然后，只要一个命令，就能同时启动/关闭这些容器。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>Mac 和 Windows 在安装 docker 的时候，会一起安装 docker compose。Linux 系统下的安装参考<a href="https://docs.docker.com/compose/install/#install-compose" target="_blank" rel="noreferrer">官方文档</a>。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 下载docker-compose-linux-x86_64到/usr/local/bin并更名为docker-compose（网络慢可以先下载到window再传输到/usr/local/bin/docker-compose）</span></span>
<span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-SL</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-linux-x86_64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/bin/docker-compose</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 软链接</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># -bash: /usr/local/bin/docker-compose: Permission denied 错误（因为没有权限）</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/local/bin/docker-compose</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 检测docker-compose是否安装</span></span>
<span class="line"><span style="color:#FFCB6B;">docker-compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--version</span></span></code></pre></div><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 启动所有服务</span></span>
<span class="line"><span style="color:#FFCB6B;">docker-compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 关闭所有服务</span></span>
<span class="line"><span style="color:#FFCB6B;">docker-compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 通过yaml文件一键停止容器</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">down</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--rmi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 通过yaml文件一键启动容器</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span></span></code></pre></div><h2 id="注意" tabindex="-1">注意 <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意&quot;">​</a></h2><p>服务器需暴露对应的端口并且刷新防火墙</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">firewalld</span></span></code></pre></div>`,11),p=[l];function c(r,t,i,d,C,y){return a(),o("div",null,p)}const D=s(n,[["render",c]]);export{h as __pageData,D as default};