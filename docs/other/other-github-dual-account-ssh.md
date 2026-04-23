# GitHub 双账号 SSH 说明

本文档记录这台电脑上同时使用两个 GitHub 账号的配置方式，以及当前仓库 `qrs` 的正确远端写法。

## 账号约定

- 大号：XiaoPiHong
- 小号：NewXiaoPiHong

## 当前问题的原因

这台电脑原本把默认的 GitHub SSH 登录绑定到了大号 `XiaoPiHong`。

如果小号仓库也继续使用默认地址：

```bash
git@github.com:NewXiaoPiHong/qrs.git
```

那么 GitHub 实际识别到的仍然是大号，因此会出现没有访问权限的报错。

## 当前生效的 SSH 配置

SSH 配置文件位置：

```text
C:\Users\26009\.ssh\config
```

配置如下：

```ssh-config
Host github.com
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes

Host github.com-newxiaopihong
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519_second
    IdentitiesOnly yes
```

含义如下：

- `github.com` 继续给大号 `XiaoPiHong` 使用
- `github.com-newxiaopihong` 专门给小号 `NewXiaoPiHong` 使用

## 当前仓库 qrs 的远端地址

当前仓库已经改成小号专用地址：

```bash
git@github.com-newxiaopihong:NewXiaoPiHong/qrs.git
```

这个地址已经验证通过，可正常读取和推送。

## 以后新建小号仓库的推荐写法

### 直接克隆

```bash
git clone git@github.com-newxiaopihong:NewXiaoPiHong/仓库名.git
```

### 已有仓库时修改 origin

```bash
git remote set-url origin git@github.com-newxiaopihong:NewXiaoPiHong/仓库名.git
```

## 大号仓库的写法

大号仓库保持原来的默认地址即可
