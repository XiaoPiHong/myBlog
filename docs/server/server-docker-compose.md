# Docker Compose 简介

## 简介

[Compose](https://docs.docker.com/compose/) 是 Docker 公司推出的一个工具软件，可以管理多个 Docker 容器组成一个应用。你需要定义一个 [YAML](https://www.ruanyifeng.com/blog/2016/07/yaml.html) 格式的配置文件 docker-compose.yml，写好多个容器之间的调用关系。然后，只要一个命令，就能同时启动/关闭这些容器。

## 安装

Mac 和 Windows 在安装 docker 的时候，会一起安装 docker compose。Linux 系统下的安装参考[官方文档](https://docs.docker.com/compose/install/#install-compose)。

```bash
# 下载docker-compose-linux-x86_64到/usr/local/bin并更名为docker-compose（网络慢可以先下载到window再传输到/usr/local/bin/docker-compose）
curl -SL https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

# 软链接
# -bash: /usr/local/bin/docker-compose: Permission denied 错误（因为没有权限）
sudo chmod +x /usr/local/bin/docker-compose

# 检测docker-compose是否安装
docker-compose --version
```

## 使用

```bash
# 启动所有服务
docker-compose up

# 关闭所有服务
docker-compose stop

# 通过yaml文件一键停止容器
docker compose down --rmi all

# 通过yaml文件一键启动容器
docker compose up -d
```

## 注意

服务器需暴露对应的端口并且刷新防火墙

```bash
systemctl restart firewalld
```
