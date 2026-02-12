# OpenClaw 部署文档（0 -> 1，基于官方 OpenClaw）

本文是从空环境开始的部署流程。关键点：

- **源码拉取使用官方仓库**：`https://github.com/openclaw/openclaw.git`
- 部署方式：`Docker Compose`
- 模型方案：`google-antigravity-auth`（主）+ `kimi`（兜底）

## 1. 前置准备

1. 安装 `Git`
2. 安装 `Docker Desktop`（含 Compose v2）
3. 准备可用代理（示例：`http://127.0.0.1:7890`）

## 2. 创建部署根目录

先创建一个独立部署目录（示例：`D:/code/xph_bot`）：

```bash
cd D:/code
mkdir xph_bot
cd xph_bot
```

`config/`、`data/`、`logs/` 等运行目录可由项目启动时自动创建。  
但 `skills/` 目录和其中的技能文件需要你自己创建。

## 3. 拉取官方 OpenClaw 源码

在部署目录下执行：

```bash
git clone https://github.com/openclaw/openclaw.git openclaw
```

完成后应有：`xph_bot/openclaw/`

## 4. 创建仓库控制文件（.gitmodules / .gitignore / .dockerignore）

### 4.1 创建 `.gitmodules`

在 `xph_bot/.gitmodules` 写入：

```ini
[submodule "openclaw"]
	path = openclaw
	url = https://github.com/openclaw/openclaw.git
```

说明：如果你是用 `git clone ... openclaw` 的方式直接拉目录，这个文件不是强制必需；但如果你要用 submodule 管理 `openclaw/`，就必须保留。

### 4.2 创建 `.gitignore`

在 `xph_bot/.gitignore` 写入：

```gitignore
# 运行时数据（不提交）
data/
logs/

# 含密钥配置（不提交）
config/openclaw.json

# 系统 / 编辑器临时文件
.DS_Store
Thumbs.db
*.swp
*.swo
*~
.vscode/
.idea/

# Node.js
node_modules/
```

### 4.3 创建 `.dockerignore`

在 `xph_bot/.dockerignore` 写入：

```dockerignore
# 避免把 submodule 的 .git 带进镜像构建上下文
openclaw/.git

# 文档与说明文件不参与镜像构建
DEPLOY.md
README.md

# 日志与临时文件
logs/
*.log
.DS_Store
Thumbs.db

# 配置文件运行时挂载，不打进镜像
config/
```

## 5. 准备 Dockerfile 与 docker-compose.yml

如果你当前目录已经有这两个文件，跳过本节。没有就按下面创建。

### 5.1 创建 `Dockerfile`

在 `xph_bot/Dockerfile` 写入：

```dockerfile
# OpenClaw Docker 镜像
# 基础镜像：Node.js 22 slim（通过镜像源拉取）
FROM docker.1ms.run/library/node:22-slim

# 容器内工作目录
WORKDIR /app

# 安装系统证书和 pnpm
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm@latest

# 复制官方 OpenClaw 源码到容器
COPY openclaw/ /app/

# 安装依赖
RUN pnpm install
# 构建 Web UI
RUN pnpm ui:build
# 构建主程序；若标准构建失败则走分步兜底构建
RUN pnpm build || ( \
    pnpm exec tsc -p vendor/a2ui/renderers/lit/tsconfig.json && \
    pnpm exec rolldown -c apps/shared/OpenClawKit/Tools/CanvasA2UI/rolldown.config.mjs && \
    pnpm exec tsdown && \
    node --import tsx scripts/canvas-a2ui-copy.ts && \
    node --import tsx scripts/copy-hook-metadata.ts && \
    node --import tsx scripts/write-build-info.ts && \
    node --import tsx scripts/write-cli-compat.ts \
)

# 预创建配置目录（配置文件会在运行时挂载）
RUN mkdir -p /root/.openclaw

# 暴露网关端口
EXPOSE 18789

# 默认启动命令
CMD ["pnpm", "openclaw", "gateway", "--port", "18789", "--verbose"]
```

### 5.2 创建 `docker-compose.yml`

在 `xph_bot/docker-compose.yml` 写入：

```yaml
# 单服务部署：OpenClaw 网关
services:
  # 服务名（可自定义，但建议保持 openclaw）
  openclaw:
    # 使用当前目录的 Dockerfile 构建镜像
    build:
      context: .
      dockerfile: Dockerfile
    # 固定容器名，便于 docker logs / docker exec
    container_name: openclaw
    # 异常退出后自动重启
    restart: unless-stopped
    # 启动网关并监听 18789
    command:
      [
        "pnpm",
        "openclaw",
        "gateway",
        "--port",
        "18789",
        "--bind",
        "lan",
        "--verbose",
        "--allow-unconfigured",
      ]
    # 宿主机端口:容器端口
    ports:
      - "18789:18789"
    # 挂载配置、数据与日志（重建容器不丢数据）
    volumes:
      # 主配置文件（只读）
      - ./config/openclaw.json:/root/.openclaw/openclaw.json:ro
      # 自定义 skills（只读）
      - ./skills:/root/.openclaw/skills:ro
      # 日志输出目录
      - ./logs:/tmp/openclaw
      # 定时任务数据
      - ./data/cron:/root/.openclaw/cron
      # 会话与历史数据
      - ./data/agents:/root/.openclaw/agents
      # 工作区文件（记忆、草稿等）
      - ./data/workspace:/root/.openclaw/workspace
      # 让容器可访问宿主机代码目录（按需保留）
      - D:/code:/host/code
    # 出网代理（国内环境常用）
    environment:
      - HTTP_PROXY=http://host.docker.internal:7890
      - HTTPS_PROXY=http://host.docker.internal:7890
    # 让容器内可解析 host.docker.internal
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

## 6. 创建并填写配置文件 `config/openclaw.json`

创建文件：

```bash
# PowerShell
New-Item -ItemType File -Path config/openclaw.json -Force
```

写入（先看注释理解；真正保存时请删除注释，使用纯 JSON）：

```jsonc
{
  "gateway": {
    // 网关运行模式：本地模式
    "mode": "local",
    // 网关监听范围：仅本机回环地址
    "bind": "loopback",
    "auth": {
      // 访问控制台和 API 的令牌
      "token": "<你的token>"
    },
    "controlUi": {
      // 关闭设备配对校验（仅建议内网/本机使用）
      "dangerouslyDisableDeviceAuth": true
    },
    "http": {
      "endpoints": {
        "chatCompletions": {
          // 启用 OpenAI 兼容 chat completions 接口
          "enabled": true
        }
      }
    }
  },

  "models": {
    "providers": {
      "kimi": {
        // Kimi 接口地址
        "baseUrl": "https://api.moonshot.cn/v1",
        // Kimi API Key
        "apiKey": "<你的Moonshot API Key>",
        // 使用 OpenAI 兼容协议
        "api": "openai-completions",
        "models": [
          {
            // 模型 ID（调用时使用）
            "id": "kimi-k2-thinking",
            // 展示名
            "name": "Kimi K2 Thinking",
            // 上下文窗口
            "contextWindow": 131072,
            // 单次最大输出 token
            "maxTokens": 32768,
            // 是否 reasoning 模型
            "reasoning": false,
            // 支持输入类型
            "input": ["text"],
            // 计费信息（本地可先填 0）
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            // 兼容字段：该提供商使用 max_tokens
            "compat": { "maxTokensField": "max_tokens" }
          }
        ]
      }
    }
  },

  "agents": {
    "defaults": {
      "model": {
        // 主模型（依赖 google-antigravity-auth 插件）
        "primary": "google-antigravity/gemini-3-pro-high",
        // 兜底模型顺序：先再试一次主模型，再回退到 kimi
        "fallbacks": [
          "google-antigravity/gemini-3-pro-high",
          "kimi/kimi-k2-thinking"
        ]
      },
      "imageModel": {
        // 图片相关任务默认模型
        "primary": "google-antigravity/gemini-3-pro-high"
      }
    }
  },

  "tools": {
    "web": {
      "fetch": {
        // 启用网页抓取工具
        "enabled": true
      }
    }
  },

  "channels": {
    "telegram": {
      // 启用 Telegram 渠道
      "enabled": true,
      // BotFather 生成的机器人 Token
      "botToken": "<你的Telegram Bot Token>",
      // 私聊策略：仅 allowlist 用户可用
      "dmPolicy": "allowlist",
      // 白名单用户名列表（不带 @）
      "allowFrom": ["<允许的telegram用户名>"],
      // Telegram 代理（容器访问宿主机代理）
      "proxy": "http://host.docker.internal:7890"
    },
    "feishu": {
      // 打开飞书通道配置
      "enabled": true,
      "accounts": {
        "main": {
          // 飞书应用 App ID
          "appId": "<你的Feishu AppId>",
          // 飞书应用 App Secret
          "appSecret": "<你的Feishu AppSecret>",
          // 机器人显示名
          "botName": "<你的机器人名称>"
        }
      }
    }
  },

  "skills": {
    "load": {
      // 监控 skill 文件变化并自动重载
      "watch": true
    },
    "entries": {
      "personified-ai": {
        // 启用该 skill
        "enabled": true
      }
    }
  },

  "plugins": {
    "entries": {
      "google-antigravity-auth": {
        // 启用后才可以使用 google-antigravity/... 模型
        "enabled": true
      },
      "telegram": {
        // 启用 Telegram 插件
        "enabled": true
      },
      "feishu": {
        // 当前示例默认不启用飞书插件（按需改 true）
        "enabled": false
      }
    }
  }
}
```

## 7. `skills/` 是什么、有什么用、怎么定义

### 7.1 `skills/` 的作用

`skills/` 用来放“可复用的专业能力包”。  
一个 skill 通常包含固定指令、使用边界、可选脚本和参考文档。启用后，Agent 在对应任务上会按 skill 的规则执行，而不是每次都临时写提示词。

典型用途：

1. 固化你的写作风格/输出格式
2. 固化某类任务流程（例如日报、抓取、数据整理）
3. 封装你常用的工具调用约束

### 7.2 目录结构

最小结构如下（`<skill-id>` 建议使用小写英文和中划线）：

```text
skills/
  <skill-id>/
    SKILL.md
```

你当前示例里是：

```text
skills/
  personified-ai/
    SKILL.md
```

### 7.3 如何创建一个 skill

```bash
# PowerShell
New-Item -ItemType Directory -Path skills/personified-ai -Force
New-Item -ItemType File -Path skills/personified-ai/SKILL.md -Force
```

在 `skills/personified-ai/SKILL.md` 写最小内容示例：

```md
# personified-ai

## Goal

让回复更自然、有角色感，但保持信息准确。

## Rules

1. 优先给出可执行结论，再补充解释。
2. 不编造事实，不确定时明确说明。
3. 保持简洁，不输出无关内容。
```

### 7.4 在 `openclaw.json` 里启用

`skills.entries` 的 key 要和目录名一致：

```json
{
  "skills": {
    "load": { "watch": true },
    "entries": {
      "personified-ai": { "enabled": true }
    }
  }
}
```

改完后重启：

```bash
docker-compose restart openclaw
```

## 8. 关键说明：为什么先配插件再授权

你当前默认模型是 `google-antigravity/gemini-3-pro-high`，所以必须满足：

1. `plugins.entries.google-antigravity-auth.enabled = true`
2. 之后才执行 Google Antigravity 登录授权

如果不启用这个插件，`google-antigravity/...` 模型不能直接使用。那种情况下要改成你自己在 `models.providers` 里配置的 Google provider（例如 `google/...`）。

## 9. 启动服务

在 `xph_bot` 根目录执行：

```bash
docker-compose up -d --build
```

检查状态：

```bash
docker-compose ps
docker logs openclaw --tail 200
```

## 10. 执行 Google Antigravity 授权（插件已启用后）

```bash
docker exec -it openclaw pnpm openclaw models auth login --provider google-antigravity --set-default
```

授权后检查状态：

```bash
docker exec openclaw pnpm openclaw models status
```

## 11. 访问与验证

浏览器访问：

```text
http://127.0.0.1:18789/?token=<你的token>
```

验证项：

1. 控制台可打开并正常对话
2. Telegram 可收发
3. 需要 Feishu 时，把 `plugins.entries.feishu.enabled` 改为 `true` 后重启容器

## 12. 后续更新与重启

改配置后重启：

```bash
docker-compose restart openclaw
```

改了 `Dockerfile` 或更新了 `openclaw/` 源码后：

```bash
cd openclaw
git pull
cd ..
docker-compose up -d --build
```

常用命令：

```bash
docker-compose down
docker logs -f openclaw
docker exec -it openclaw sh
```
