# Docker 简介

## Docker 是什么？

Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

## Docker 的用途

Docker 的主要用途，目前有三大类。

（1）提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

（2）提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

（3）组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

## Docker 的镜像（image 文件）

Docker 把应用程序及其依赖，打包在 image 文件里面。只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

image 是二进制文件。实际开发中，一个 image 文件往往通过继承另一个 image 文件，加上一些个性化设置而生成。举例来说，你可以在 Ubuntu 的 image 基础上，往里面加入 Apache 服务器，形成你的 image。

## Docker 的容器（container 文件）

image 文件生成的容器实例，本身也是一个文件，称为容器文件。也就是说，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。

## Docker 的安装

Docker 支持 64 位版本的 CentOS 7 和 CentOS 8 及更高版本，它要求 Linux 内核版本不低于 3.10。

```bash
# 查看Linux版本的命令这里推荐两种：

lsb_release -a


cat /etc/redhat-release
```

```bash
# 查看内核版本的命令有三种：

cat /proc/version

uname -a

uname -r
```

Docker 官方和国内 daocloud 都提供了一键安装的脚本，使得 Docker 的安装更加便捷。

```bash
# 官方的一键安装方式：
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

```

```bash
# 国内 daocloud一键安装命令：
curl -sSL https://get.daocloud.io/docker | sh
```

检查是否安装成功

```bash
docker version
# 或者
docker info
```

换源

```bash
# 没有该文件就新建
vim /etc/docker/daemon.json
```

写入

```json
// 换源后记得重启
{
  "registry-mirrors": [
    "https://2oj9nmjj.mirror.aliyuncs.com",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://dockerhub.azk8s.cn",
    "https://mirror.ccs.tencentyun.com",
    "https://registry.cn-hangzhou.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.m.daocloud.io",
    "https://noohub.ru",
    "https://huecker.io",
    "https://dockerhub.timeweb.cloud"
  ]
}
```

刷新重启

```bash
sudo systemctl daemon-reload

sudo systemctl restart docker
```

Docker 需要用户具有 sudo 权限，为了避免每次命令都输入 sudo，可以把用户加入 Docker 用户组

```bash
sudo usermod -aG docker $USER
```

## Docker 服务的启停

Docker 是服务器----客户端架构。命令行运行 docker 命令的时候，需要本机有 Docker 服务。如果这项服务没有启动，可以用下面的命令启动

```bash
# service 命令启动
sudo service docker start

# systemctl 命令启动
sudo systemctl start docker

# 查看docker服务状态
sudo systemctl status docker

# 停止docker服务
sudo systemctl stop docker

# 检查docker服务是否开启开机启动
sudo systemctl is-enabled docker

# 启用docker服务开机启动
sudo systemctl enable docker

# 禁用docker服务开机启动
sudo systemctl disable docker

# 重新启动docker服务
sudo systemctl restart docker
```

## Docker 镜像的操作

[docker 的官方仓库](https://hub.docker.com/u/library)

```bash
# 抓取镜像到本地
docker image pull library/镜像名
# 或（由于 Docker 官方提供的 image 文件，都放在library组里面，所以它的是默认组，可以省略）
docker image pull 镜像名

# 查看本机的镜像
docker image ls

# 删除镜像
docker rmi [Image ID]

# 运行image镜像生成容器实例
# （1）：docker container run命令会从 image 文件，生成一个正在运行的容器实例
# （2）：docker container run命令具有自动抓取 image 文件的功能。如果发现本地没有指定的 image 文件，就会从仓库自动抓取。因此，前面的docker image pull命令并不是必需的步骤。
docker container run 镜像名
```

## Docker 容器的操作

```bash
# 新建容器（有些容器提供的是服务，有些容器是执行操作，所以提供服务的容器是不会自动停止的，一般需要手动停止，而执行操作的容器一般是执行完之后就自动停止）
docker container run 镜像名

# 列出本机正在运行的容器
docker container ls

# 列出本机所有容器，包括终止运行的容器
docker container ls --all

# 删除容器（终止运行的容器文件，依然会占据硬盘空间，删除之后就不会）
docker container rm [containerID]

# 启动容器（每次执行【docker container run 镜像】名都会生成一个新的容器，要想重复使用容器需要用下面命令）
docker container start [containerID]

# 停止容器
docker container kill [containID]

# 停止容器（自行进行收尾清理工作再停止）
# （1）：前面的docker container kill命令终止容器运行，相当于向容器里面的主进程发出 SIGKILL 信号。而docker container stop命令也是用来终止容器运行，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号。
# （2）：这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以自行进行收尾清理工作，但也可以不理会这个信号。如果收到 SIGKILL 信号，就会强行立即终止，那些正在进行中的操作会全部丢失。
docker container stop [containerID]

# 查看容器输出
# docker container logs命令用来查看 docker 容器的输出，即容器里面 Shell 的标准输出。如果docker run命令运行容器的时候，没有使用-it参数，就要用这个命令查看输出。
docker container logs [containerID]

# 拷贝容器
# docker container cp命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。
docker container cp [containID]:[/path/to/file] .

# 在容器的 Shell 执行命令
# docker container exec命令用于进入一个正在运行的 docker 容器。如果docker run命令运行容器的时候，没有使用-it参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。
docker container exec -it [containerID] /bin/bash
```

## 参考链接

[阮一峰的网络日志-Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
