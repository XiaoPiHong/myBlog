# 域名申请与 SSL 证书配置

本文将介绍如何购买域名、进行 DNS 解析、域名备案以及 SSL 证书的申请与配置。

## 域名申请

### 1. 购买域名

域名可以通过以下平台购买：

- [阿里云（万网）](https://wanwang.aliyun.com/)
- [腾讯云](https://dnspod.cloud.tencent.com/)
- [华为云](https://www.huaweicloud.com/product/domain.html)
- [GoDaddy](https://www.godaddy.com/)
- [Namecheap](https://www.namecheap.com/)

**购买步骤：**

1. 登录域名服务商平台
2. 在域名注册页面搜索你想要的域名
3. 查看域名是否可用及价格
4. 选择注册年限（通常 1-10 年）
5. 填写域名持有者信息
6. 完成支付

> **提示：** 建议选择 `.com`、`.cn`、`.net` 等主流后缀，便于用户记忆和 SEO 优化。

### 2. 域名解析（DNS 解析）

购买域名后，需要将域名绑定到对应的主机，这就是 DNS 解析。

**常见记录类型：**

| 记录类型   | 说明                     | 示例                 |
| ---------- | ------------------------ | -------------------- |
| A 记录     | 将域名指向一个 IPv4 地址 | `192.168.1.1`        |
| AAAA 记录  | 将域名指向一个 IPv6 地址 | `2001:db8::1`        |
| CNAME 记录 | 将域名指向另一个域名     | `www.example.com`    |
| MX 记录    | 邮件交换记录             | `mail.example.com`   |
| TXT 记录   | 文本记录，常用于验证     | `v=spf1 include:...` |

**配置步骤（以阿里云为例）：**

1. 登录阿里云控制台
2. 进入【域名服务】→【域名列表】
3. 选择需要解析的域名，点击【解析】
4. 点击【添加记录】
5. 填写解析配置：
   - **记录类型**：选择 `A` 记录
   - **主机记录**：填写 `@`（代表主域名）或 `www`（代表 www 子域名）
   - **记录值**：填写服务器的公网 IP 地址
   - **TTL**：默认 10 分钟即可
6. 点击【确认】保存

```bash
# 验证解析是否生效
ping yourdomain.com

# 或使用 nslookup 查询
nslookup yourdomain.com
```

> **注意：** DNS 解析生效需要一定时间（通常几分钟到 48 小时不等），取决于 TTL 设置和全球 DNS 缓存刷新。

### 3. 域名备案

在中国大陆使用的域名需要进行 ICP 备案。

**备案条件：**

- 域名已完成实名认证
- 拥有中国大陆的云服务器或主机

**备案步骤（以阿里云为例）：**

1. 登录阿里云控制台，进入【ICP 备案】
2. 填写主体信息（个人或企业）
3. 填写网站信息
4. 上传相关证件材料
5. 等待初审（通常 1-2 个工作日）
6. 完成管局审核（各省时间不同，通常 7-20 个工作日）

**备案成功后：**

- 会获得 ICP 备案号，如：`京ICP备XXXXXXXX号`
- 需要在网站底部展示备案号，并链接到工信部备案查询页面

```html
<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备XXXXXXXX号</a>
```

---

## SSL 证书配置

SSL 证书用于实现 HTTPS 加密传输，保护用户数据安全。

### 1. 申请 SSL 证书

**免费证书申请渠道：**

- [阿里云免费证书](https://www.aliyun.com/product/cas)（免费 DV 证书，有效期 1 年）
- [腾讯云免费证书](https://cloud.tencent.com/product/ssl)
- [Let's Encrypt](https://letsencrypt.org/)（自动化免费证书）
- [FreeSSL](https://freessl.cn/)

**阿里云申请步骤：**

1. 登录阿里云控制台，进入【SSL 证书】
2. 点击【免费证书】→【创建证书】
3. 填写证书信息：
   - **证书绑定域名**：填写你的域名（如 `example.com` 或 `*.example.com`）
4. 选择验证方式：
   - **DNS 验证**：在域名解析中添加指定的 TXT 记录
   - **文件验证**：在网站根目录放置验证文件
5. 完成验证后，等待证书签发
6. 下载证书文件

### 2. 下载 SSL 证书

证书申请成功后，下载对应服务器类型的证书：

- **Nginx**：`.pem` 和 `.key` 文件
- **Apache**：`.crt`、`.key` 和 CA 证书文件
- **Tomcat**：`.pfx` 文件

**下载的 Nginx 证书包含：**

```
├── yourdomain.com.pem    # 证书文件
└── yourdomain.com.key    # 私钥文件
```

### 3. 使用 Docker 部署 Nginx + SSL

使用 Docker 方式部署 Nginx 并配置 SSL 证书，更便于管理和迁移。

#### 3.1 项目目录结构

在服务器上创建项目目录：

```bash
# 创建项目目录
mkdir -p ~/nginx-docker
cd ~/nginx-docker

# 创建子目录
mkdir -p ssl html conf.d
```

**完整目录结构：**

```
nginx-docker/
├── docker-compose.yml      # Docker Compose 配置
├── nginx.conf              # Nginx 主配置文件
├── conf.d/
│   └── default.conf        # 站点配置
├── ssl/
│   ├── yourdomain.com.pem  # SSL 证书
│   └── yourdomain.com.key  # SSL 私钥
└── html/
    └── index.html          # 网站文件
```

#### 3.2 上传 SSL 证书

将下载的证书文件上传到 `ssl` 目录：

```bash
# 上传证书文件到服务器
scp yourdomain.com.pem root@your-server-ip:~/nginx-docker/ssl/
scp yourdomain.com.key root@your-server-ip:~/nginx-docker/ssl/
```

#### 3.3 创建 Nginx 配置文件

**nginx.conf（主配置文件）：**

```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    keepalive_timeout  65;

    # 启用 gzip 压缩
    gzip  on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    include /etc/nginx/conf.d/*.conf;
}
```

**conf.d/default.conf（站点配置）：**

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # 强制跳转到 HTTPS
    return 301 https://$host$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL 证书配置（容器内路径）
    ssl_certificate /etc/nginx/ssl/yourdomain.com.pem;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;

    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 网站根目录
    root /usr/share/nginx/html;
    index index.html index.htm;

    # 访问日志
    access_log /var/log/nginx/yourdomain.access.log;
    error_log /var/log/nginx/yourdomain.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### 3.4 创建 docker-compose.yml

```yaml
version: "3.8"

services:
  nginx:
    image: nginx:latest
    container_name: nginx-ssl
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      # Nginx 主配置文件
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      # 站点配置目录
      - ./conf.d:/etc/nginx/conf.d:ro
      # SSL 证书目录
      - ./ssl:/etc/nginx/ssl:ro
      # 网站文件目录
      - ./html:/usr/share/nginx/html:ro
      # 日志目录（可选）
      - ./logs:/var/log/nginx
    environment:
      - TZ=Asia/Shanghai
```

#### 3.5 创建测试页面

```bash
# 创建测试 HTML 文件
cat > html/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTTPS 配置成功</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; opacity: 0.9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 HTTPS 配置成功！</h1>
        <p>您的网站已通过 SSL 证书加密保护</p>
    </div>
</body>
</html>
EOF
```

#### 3.6 启动 Docker 容器

```bash
# 进入项目目录
cd ~/nginx-docker

# 启动容器（后台运行）
docker-compose up -d

# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs -f nginx
```

### 4. 验证 HTTPS

```bash
# 使用 curl 测试 HTTPS
curl -I https://yourdomain.com

# 使用 openssl 查看证书信息
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

也可以使用在线工具检测 SSL 配置：

- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)

### 5. 常用 Docker 命令

```bash
# 停止容器
docker-compose down

# 重启容器（修改配置后）
docker-compose restart

# 重新加载 Nginx 配置（不重启容器）
docker exec nginx-ssl nginx -s reload

# 检查 Nginx 配置语法
docker exec nginx-ssl nginx -t

# 进入容器内部
docker exec -it nginx-ssl /bin/bash

# 查看实时日志
docker-compose logs -f
```

---

## 常见问题

### Q1：域名解析不生效？

- 检查解析记录是否正确配置
- 等待 DNS 缓存刷新（可能需要几分钟到 48 小时）
- 使用 `nslookup` 或 `dig` 命令排查

### Q2：HTTPS 无法访问？

- 确认服务器防火墙已开放 80 和 443 端口
- 检查 Docker 容器是否正常运行
- 检查证书文件路径和权限

```bash
# 检查端口是否开放
sudo firewall-cmd --list-ports

# 开放 80 和 443 端口
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload

# 检查容器状态
docker-compose ps

# 检查 Nginx 配置
docker exec nginx-ssl nginx -t
```

### Q3：Docker 容器无法启动？

```bash
# 查看容器日志排查问题
docker-compose logs nginx

# 常见原因：
# 1. 端口被占用：检查 80/443 端口是否被其他服务占用
# 2. 配置文件错误：检查 nginx.conf 语法
# 3. 证书文件不存在：确认 ssl 目录下有证书文件
```

### Q4：证书过期如何更新？

```bash
# 1. 下载新证书
# 2. 替换 ssl 目录下的证书文件
# 3. 重新加载 Nginx 配置
docker exec nginx-ssl nginx -s reload
```

---

## 总结

| 步骤 | 操作             | 工具/平台             |
| ---- | ---------------- | --------------------- |
| 1    | 购买域名         | 阿里云、腾讯云等      |
| 2    | DNS 解析         | 域名服务商控制台      |
| 3    | 域名备案         | ICP 备案系统          |
| 4    | 申请 SSL 证书    | 阿里云、Let's Encrypt |
| 5    | 创建 Docker 配置 | docker-compose.yml    |
| 6    | 配置 Nginx       | nginx.conf            |
| 7    | 启动容器         | docker-compose up -d  |

完成以上步骤后，你的网站就可以通过 HTTPS 安全访问了！
