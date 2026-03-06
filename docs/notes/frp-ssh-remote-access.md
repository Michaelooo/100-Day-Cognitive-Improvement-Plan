# FRP + SSH 内网穿透远程访问实战

> 记录一次完整的 frp 配置 SSH 远程访问踩坑过程

---

## 目录

- [背景与目标](#背景与目标)
- [第一部分：环境准备与配置](#第一部分环境准备与配置)
- [第二部分：问题排查与解决](#第二部分问题排查与解决)
- [第三部分：总结与反思](#第三部分总结与反思)

---

## 背景与目标

### 场景

- **本地机器**：MacBook Pro（位于内网）
- **公网服务器**：阿里云 ECS（IP: `<YOUR_SERVER_IP>`）
- **目标**：通过另一台设备远程 SSH 访问本地 Mac

### 网络拓扑

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   另一台设备     │  SSH    │   阿里云服务器    │  frp    │   本地 Mac      │
│  (任意网络位置)  │ ──────> │  frps 监听:2222  │ <─────> │  frpc + SSH:22  │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

---

## 第一部分：环境准备与配置

### 1.1 服务端配置（阿里云）

**frps.toml**

```toml
bindPort = 7000
```

**验证端口监听：**

```bash
ss -tlnp | grep 2222
# LISTEN 0 4096 *:2222 *:* users:(("frps",pid=314707,fd=8))
```

### 1.2 客户端配置（本地 Mac）

**frpc.toml**

```toml
serverAddr = "<YOUR_SERVER_IP>"
serverPort = 7000

[[proxies]]
name = "ssh-remote"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 2222
```

**关键配置说明：**

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `name` | `ssh-remote` | 代理名称，可自定义 |
| `type` | `tcp` | SSH 使用 TCP 协议 |
| `localIP` | `127.0.0.1` | 本地 SSH 服务地址 |
| `localPort` | `22` | 本地 SSH 端口 |
| `remotePort` | `2222` | 公网服务器暴露的端口 |

### 1.3 安全组配置

确保阿里云安全组放行：
- **7000/tcp**：frp 通信端口
- **2222/tcp**：SSH 映射端口

---

## 第二部分：问题排查与解决

### 2.1 问题一：Connection Refused

**现象：**

```bash
nc -vz <YOUR_SERVER_IP> 2222
# nc: connectx to <YOUR_SERVER_IP> port 2222 (tcp) failed: Connection refused
```

**排查过程：**

1. **检查 frpc 是否连接成功**
   ```bash
   tail -30 /opt/homebrew/var/log/frpc.log
   ```
   日志显示：`[ssh-remote] start proxy success` ✅

2. **检查 frps 是否监听 2222**
   ```bash
   # 在公网服务器上
   ss -tlnp | grep 2222
   # 发现 frps 确实在监听 2222
   ```

3. **根因分析**
   
   实际上这个问题是**间歇性**的，frps 已经正确监听。真正的问题在 SSH 认证环节。

### 2.2 问题二：密码一直错误

**现象：**

```bash
ssh -p 2222 <USER>@<YOUR_SERVER_IP>
# 密码输入正确，但一直提示错误
```

**关键认知纠正：**

❌ **错误理解**：以为是连接云服务器的 root 用户

✅ **正确理解**：通过 frp 隧道连接的是**本地 Mac 的 SSH 服务**

| 连接方式 | 实际连接目标 | 应使用的用户名 |
|----------|--------------|----------------|
| `ssh root@<YOUR_SERVER_IP>` | 云服务器 root | 云服务器的 root 密码 |
| `ssh -p 2222 <LOCAL_USER>@<YOUR_SERVER_IP>` | **本地 Mac** | **Mac 的本地用户名和密码** |

### 2.3 问题三：密钥认证不生效

**现象：**

配置了 `authorized_keys` 但仍然提示密码。

**排查过程：**

```bash
# 查看 SSH 详细日志
ssh -vvv localhost -o PasswordAuthentication=no 2>&1 | grep -E "(Offering|Authentications)"
```

**关键发现：**

```
debug1: Offering public key: ~/.ssh/id_ed25519 ED25519 SHA256:xxx...
debug3: receive packet: type 51
debug1: Authentications that can continue: publickey,password,keyboard-interactive
```

服务器拒绝了公钥！

**根因：**

`authorized_keys` 中的公钥与本地私钥**不匹配**！

**解决：**

将本地 Mac 的正确公钥添加到 `authorized_keys`：

```bash
# 1. 添加本地公钥
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

# 2. 去重
awk '!seen[$0]++' ~/.ssh/authorized_keys > ~/.ssh/authorized_keys.tmp
mv ~/.ssh/authorized_keys.tmp ~/.ssh/authorized_keys

# 3. 设置权限
chmod 600 ~/.ssh/authorized_keys
```

### 2.4 最终连接方式

**在另一台设备上：**

```bash
# 方式1：使用本地 Mac 的密钥（如果私钥在该设备上）
ssh -p 2222 -i ~/.ssh/id_ed25519 <LOCAL_USER>@<YOUR_SERVER_IP>

# 方式2：使用密码（需要 Mac 有本地密码）
ssh -p 2222 <LOCAL_USER>@<YOUR_SERVER_IP>
# 输入 Mac 的开机登录密码
```

---

## 第三部分：总结与反思

### 核心要点

1. **frp 隧道工作原理**
   - `remotePort` 是在 frps（公网服务器）上监听的端口
   - 流量路径：外网设备 → frps:remotePort → frpc → localIP:localPort

2. **SSH 连接的本质**
   - 通过 frp 连接时，认证的是**内网机器**的 SSH 服务
   - 不是云服务器的认证体系

3. **密钥认证排查步骤**
   - 检查 `authorized_keys` 内容
   - 对比指纹：`ssh-keygen -lf ~/.ssh/authorized_keys`
   - 检查权限：`chmod 600 ~/.ssh/authorized_keys`
   - 检查目录权限：`chmod 700 ~/.ssh`

### 常用调试命令

```bash
# 测试 frp 端口连通性
nc -vz <YOUR_SERVER_IP> 2222

# 检查 frpc 日志
tail -f /opt/homebrew/var/log/frpc.log

# 本地测试 SSH 密钥认证
ssh localhost -o PasswordAuthentication=no "whoami"

# 查看 SSH 详细调试信息
ssh -vvv localhost

# 查看密钥指纹
ssh-keygen -lf ~/.ssh/id_ed25519.pub
```

### 安全建议

1. **修改默认映射端口**：不要使用 2222，改用不常用的高位端口
2. **启用 frp 认证**：配置 `auth.token`
3. **限制访问 IP**：云服务器安全组只允许特定 IP 访问映射端口
4. **使用密钥而非密码**：禁用 SSH 密码登录，仅使用密钥认证

---

## 参考配置

### 服务端 frps.toml

```toml
bindPort = 7000

# 可选：限制允许的端口范围
# allowPorts = [
#   { start = 10000, end = 20000 }
# ]

# 可选：身份验证
# auth.method = "token"
# auth.token = "your-secret-token"
```

### 客户端 frpc.toml

```toml
serverAddr = "<YOUR_SERVER_IP>"
serverPort = 7000

# 可选：与服务端一致
# auth.method = "token"
# auth.token = "your-secret-token"

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 2222
```

---

*记录日期：2026-03-06*

*关键词：frp, 内网穿透, SSH, 远程访问, 密钥认证, 故障排查*
