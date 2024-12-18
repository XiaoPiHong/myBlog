# 自定义 docker 镜像

下面我以 [koa-demos](https://www.ruanyifeng.com/blog/2017/08/koa.html) 项目为例，介绍怎么写 Dockerfile 文件，实现让用户在 Docker 容器里面运行 Koa 框架。

```bash
git clone https://github.com/ruanyf/koa-demos.git
cd koa-demos
```

作为准备工作，请先[下载源码](https://codeload.github.com/ruanyf/koa-demos/zip/refs/heads/master)。

## 编写 Dockerfile 文件

首先，在项目的根目录下，新建一个文本文件`.dockerignore`，写入下面的内容。

```txt
.git
node_modules
npm-debug.log
```

上面代码表示，这三个路径要排除，不要打包进入 image 文件。如果你没有路径要排除，这个文件可以不新建。

然后，在项目的根目录下，新建一个文本文件 Dockerfile，写入下面的内容。

```txt
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
```

上面代码一共五行，含义如下。

- FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是 8.4，即 8.4 版本的 node。
- COPY . /app：将当前目录下的所有文件（除了.dockerignore 排除的路径），都拷贝进入 image 文件的/app 目录。
- WORKDIR /app：指定接下来的工作路径为/app。
- RUN npm install：在/app 目录下，运行 npm install 命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
- EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。

## 创建 image 文件

有了 Dockerfile 文件以后，就可以使用 `docker image build` 命令创建 image 文件了。

```bash
docker image build -t koa-demo .
#或者
docker image build -t koa-demo:0.0.1 .
```

上面代码中，`-t` 参数用来指定 image 文件的名字，后面还可以用冒号指定标签。如果不指定，默认的标签就是 `latest`。最后的那个点表示 Dockerfile 文件所在的路径，上例是当前路径，所以是一个点。

如果运行成功，就可以看到新生成的 image 文件 `koa-demo` 了。

```bash
docker image ls
```

## 生成容器

`docker container run` 命令会从 image 文件生成容器。

```bash
docker container run -p 8000:3000 -it koa-demo /bin/bash
# 或者
docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash
```

上面命令的各个参数含义如下：

- -p 参数：容器的 3000 端口映射到本机的 8000 端口。
- -it 参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
- koa-demo:0.0.1：image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。
- /bin/bash：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。

如果一切正常，运行上面的命令以后，就会返回一个命令行提示符。

```bash
root@66d80f4aaf1e:/app#
```

这表示你已经在容器里面了，返回的提示符就是容器内部的 Shell 提示符。执行下面的命令。

```bash
root@66d80f4aaf1e:/app# node demos/01.js
```

这时，Koa 框架已经运行起来了。打开本机的浏览器，访问 http://127.0.0.1:8000，网页显示"Not Found"，这是因为这个 [demo](https://github.com/ruanyf/koa-demos/blob/master/demos/01.js) 没有写路由。

这个例子中，Node 进程运行在 Docker 容器的虚拟环境里面，进程接触到的文件系统和网络接口都是虚拟的，与本机的文件系统和网络接口是隔离的，因此需要定义容器与物理机的端口映射（map）。

现在，在容器的命令行，按下 Ctrl + c 停止 Node 进程，然后按下 Ctrl + d （或者输入 exit）退出容器。此外，也可以用 `docker container kill` 终止容器运行。

```bash
# 在本机的另一个终端窗口，查出容器的 ID
docker container ls

# 停止指定的容器运行
docker container kill [containerID]
```

也可以使用 `docker container run` 命令的`--rm` 参数，在容器终止运行后自动删除容器文件。

```bash
docker container run --rm -p 8000:3000 -it koa-demo /bin/bash
```

## CMD 命令

上一节的例子里面，容器启动以后，需要手动输入命令 `node demos/01.js`。我们可以把这个命令写在 Dockerfile 里面，这样容器启动以后，这个命令就已经执行了，不用再手动输入了。

```txt
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD node demos/01.js
```

上面的 Dockerfile 里面，多了最后一行 `CMD node demos/01.js`，它表示容器启动后自动执行 `node demos/01.js`。

你可能会问，`RUN` 命令与 `CMD` 命令的区别在哪里？简单说，`RUN` 命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件；`CMD` 命令则是在容器启动后执行。另外，一个 Dockerfile 可以包含多个 `RUN` 命令，但是只能有一个 `CMD` 命令。

注意，指定了 `CMD` 命令以后，`docker container run` 命令就不能附加命令了（比如前面的`/bin/bash`），否则它会覆盖 `CMD` 命令。现在，启动容器可以使用下面的命令。

```bash
docker container run --rm -p 8000:3000 -it koa-demo:0.0.1
```

## 发布 image 文件

容器运行成功后，就确认了 image 文件的有效性。这时，我们就可以考虑把 image 文件分享到网上，让其他人使用。

首先，去 [hub.docker.com](https://hub.docker.com/) 或 [cloud.docker.com](https://hub.docker.com/) 注册一个账户。然后，用下面的命令登录。

```bash
docker login
```

接着，为本地的 image 标注用户名和版本。

```bash
docker image tag [imageName] [username]/[repository]:[tag]
# 实例
docker image tag koa-demos:0.0.1 ruanyf/koa-demos:0.0.1
```

也可以不标注用户名，重新构建一下 image 文件。

```bash
docker image build -t [username]/[repository]:[tag] .
```

最后，发布 image 文件。

```bash
docker image push [username]/[repository]:[tag]
```

发布成功以后，登录 hub.docker.com，就可以看到已经发布的 image 文件。

## 参考链接

[阮一峰的网络日志-Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
