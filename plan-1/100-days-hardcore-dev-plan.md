# 硬核开发者 100 天进阶计划

> 目标：掌握有深度、有门槛、能立即投入生产环境的硬核技术
> 
> 适用人群：资深开发者，追求技术深度与工程实践

---

## 目录

- [第一阶段：开发工具链与效率（Day 1-10）](#第一阶段开发工具链与效率day-1-10)
- [第二阶段：系统与底层（Day 11-25）](#第二阶段系统与底层day-11-25)
- [第三阶段：编程语言深度（Day 26-40）](#第三阶段编程语言深度day-26-40)
- [第四阶段：架构与设计（Day 41-55）](#第四阶段架构与设计day-41-55)
- [第五阶段：安全与逆向（Day 56-65）](#第五阶段安全与逆向day-56-65)
- [第六阶段：AI 时代开发（Day 66-80）](#第六阶段ai-时代开发day-66-80)
- [第七阶段：前沿技术（Day 81-90）](#第七阶段前沿技术day-81-90)
- [第八阶段：综合实战（Day 91-100）](#第八阶段综合实战day-91-100)
- [推荐工具链](#推荐工具链)

---

## 第一阶段：开发工具链与效率（Day 1-10）

**阶段目标**：把工具用到极致，开发体验拉满。"工欲善其事，必先利其器"，这一阶段的投入会在未来 10 倍回报。

### Day 1: Neovim/TMUX 工作流

**学习目标**：配置一个 IDE 级别的 Neovim，理解现代编辑器核心组件

**核心概念**：
- **LSP (Language Server Protocol)**：语言服务器协议，让编辑器获得 IDE 级别的代码分析能力
- **Tree-sitter**：增量解析器生成工具，用于语法高亮和代码折叠
- **FZF/telescope**：模糊查找，快速定位文件和代码

**实践任务**：
1. 安装 Neovim 0.10+ [官方安装指南](https://github.com/neovim/neovim/wiki/Installing-Neovim)
2. 使用 LazyVim 或 NvChad 作为起点 [LazyVim](https://www.lazyvim.org/) / [NvChad](https://nvchad.com/)
3. 配置 LSP：确保你的主要语言（Go/Python/TypeScript/Rust）有完整的 LSP 支持
4. 配置 DAP (Debug Adapter Protocol) 用于调试

**推荐配置参考**：
- [AstroNvim](https://astronvim.com/) - 美观且功能完整的 Neovim 发行版
- [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) - 最小化配置，适合学习
- [TJ DeVries 的 YouTube 频道](https://www.youtube.com/@teej_dv) - Neovim 核心维护者的教程

**产出**：一个可复用的个人配置仓库，包含 `init.lua` 和完整的插件配置

---

### Day 2: 结构化日志艺术

**学习目标**：掌握 JSON 日志的高效处理技巧

**核心工具**：
- [`jq`](https://jqlang.github.io/jq/) - 命令行 JSON 处理器，堪称 JSON 的 awk
- [`fx`](https://github.com/antonmedv/fx) - 交互式 JSON 查看器，支持鼠标操作
- [`gron`](https://github.com/tomnomnom/gron) - 将 JSON 转换为可 grep 的格式
- [`ijq`](https://github.com/gpanders/ijq) - 交互式 jq 工具

**实践任务**：
```bash
# 安装
brew install jq fx gron

# 练习场景 1：从 1GB 日志中提取错误信息并统计
jq 'select(.level == "ERROR") | {time, message, stack}' app.log | jq -s 'group_by(.message) | map({msg: .[0].message, count: length}) | sort_by(-.count)'

# 练习场景 2：gron 后 grep 特定字段再还原
gron api.log | grep "user_id" | gron -u

# 练习场景 3：fx 交互式探索嵌套结构
cat complex.json | fx
```

**进阶技巧**：
- 编写可复用的 jq 模块 [官方文档](https://jqlang.github.io/jq/manual/#module-system)
- 使用 `jq` 进行数据转换和 API 响应处理

**产出**：3 个常用日志分析脚本放入 `~/bin/`

---

### Day 3: 终端性能监控

**学习目标**：建立对系统资源使用的实时感知

**核心工具**：
- [`btop`](https://github.com/aristocratos/btop) - 美观的资源监控器，C++ 重写版
- [`zenith`](https://github.com/bvaisvil/zenith) - Rust 编写的系统监控，支持 GPU
- [`nvitop`](https://github.com/XuehaiPan/nvitop) - NVIDIA GPU 监控，类似 top 的交互界面
- [`bandwhich`](https://github.com/imsnif/bandwhich) - 网络带宽按进程分解
- [`procs`](https://github.com/dalance/procs) - 增强版 ps，彩色输出，支持 Docker 容器名

**实践任务**：
1. 配置 btop 主题和自定义面板 [配置文档](https://github.com/aristocratos/btop#configurability)
2. 设置历史记录和日志，追踪长期趋势
3. 编写脚本在 CPU/内存超过阈值时发送通知

```bash
# 快速安装
brew install btop zenith procs bandwhich
pip install nvitop
```

**产出**：个人监控看板配置，包含 btop 主题和启动别名

---

### Day 4: HTTP 调试进阶

**学习目标**：掌握 HTTP/HTTPS 流量的拦截、修改和重放

**核心工具**：
- [`mitmproxy`](https://mitmproxy.org/) - 交互式 HTTPS 代理，支持脚本扩展
- [`httptoolkit`](https://httptoolkit.com/) - 现代化的 HTTP 调试工具（GUI）
- [`grpcurl`](https://github.com/fullstorydev/grpcurl) - gRPC 调试的 curl
- [`websocat`](https://github.com/vi/websocat) - WebSocket 的 netcat

**实践任务**：
1. 配置 mitmproxy 拦截 HTTPS 流量（安装证书）
2. 编写 Python 脚本自动修改请求/响应 [Scripting API](https://docs.mitmproxy.org/stable/addons-scripting/)
3. 使用 `mitmdump` 录制和回放 API 请求

```python
# mitmproxy 脚本示例：自动添加延迟模拟弱网
from mitmproxy import http
import time

def request(flow: http.HTTPFlow) -> None:
    time.sleep(0.5)  # 500ms 延迟
    flow.request.headers["X-Debug"] = "intercepted"
```

**产出**：自动化抓包脚本，用于 API 调试和性能测试

---

### Day 5: Git 黑魔法

**学习目标**：掌握 Git 的高级功能，解决复杂场景

**核心命令**：
- `git bisect` - 二分查找引入 bug 的提交 [文档](https://git-scm.com/docs/git-bisect)
- `git reflog` - 引用日志，拯救误删的分支和提交
- `git worktree` - 同时 checkout 多个分支，避免 stash
- `git rerere` - 重用冲突解决方案
- `git range-diff` - 对比两个版本范围的差异

**实践任务**：
```bash
# 场景 1：找到引入 bug 的提交
git bisect start
git bisect bad HEAD
git bisect good v1.0
git bisect run ./test.sh  # 自动测试

# 场景 2：恢复误删的分支
git reflog | grep "checkout"
git checkout -b recovered-branch HEAD@{5}

# 场景 3：同时工作在两个分支
git worktree add ../feature-branch feature-branch
cd ../feature-branch  # 独立的目录，独立的 branch

# 场景 4：优雅地修改历史
git rebase -i HEAD~5  # 交互式 rebase
git commit --fixup <commit> && git rebase -i --autosquash HEAD~6
```

**推荐资源**：
- [Git Flight Rules](https://github.com/k88hudson/git-flight-rules) - Git 紧急情况处理手册
- [Oh Shit, Git!?!](https://ohshitgit.com/) - 常见 Git 问题解决
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)

**产出**：团队 Git 规范文档，包含 commit message 规范和分支策略

---

### Day 6: 数据库调试

**学习目标**：深度分析和优化数据库性能

**PostgreSQL 核心工具**：
- `pg_stat_statements` - SQL 性能统计 [文档](https://www.postgresql.org/docs/current/pgstatstatements.html)
- `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)` - 执行计划分析
- `pg_stat_activity` - 实时查看活跃连接

**实践任务**：
```sql
-- 启用统计扩展
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- 找出最耗时的查询
SELECT query, calls, mean_exec_time, total_exec_time 
FROM pg_stat_statements 
ORDER BY total_exec_time DESC 
LIMIT 10;

-- 详细执行计划分析
EXPLAIN (ANALYZE, BUFFERS, COSTS, FORMAT JSON)
SELECT * FROM orders 
WHERE created_at > NOW() - INTERVAL '7 days' 
ORDER BY amount DESC;
```

**推荐工具**：
- [`pgcli`](https://www.pgcli.com/) - 自动补全和语法高亮的 PostgreSQL 客户端
- [`pgFormatter`](https://github.com/darold/pgFormatter) - SQL 格式化
- [`explain.dalibo.com`](https://explain.dalibo.com/) - 可视化执行计划

**产出**：性能优化案例集，包含慢查询优化前后的对比

---

### Day 7: 容器网络排查

**学习目标**：理解容器网络原理，掌握排查技巧

**核心技术**：
- Linux Network Namespace [深入理解](https://github.com/feiskyer/kubernetes-handbook/blob/master/concepts/linux-network-namespace.md)
- `nsenter` - 进入命名空间
- `tcpdump` + Wireshark - 抓包分析
- `conntrack` - 连接追踪

**实践任务**：
```bash
# 进入容器的网络命名空间
docker inspect -f '{{.State.Pid}}' container_id
nsenter -t <pid> -n ip addr
nsenter -t <pid> -n tcpdump -i any -w /tmp/capture.pcap

# 查看容器路由表和 iptables
nsenter -t <pid> -n ip route
nsenter -t <pid> -n iptables -t nat -L -n -v

# 使用 cni 插件调试工具
bridge fdb show  # 查看网桥转发表
```

**推荐资源**：
- [Container Networking From Scratch](https://www.youtube.com/watch?v=Ok0JcEG8vE8) - Kristen Jacobs, DockerCon
- [Kubernetes Networking 101](https://www.youtube.com/watch?v=0Omvgd7Hg1I)

**产出**：容器网络问题排查手册，包含常见问题检查清单

---

### Day 8: 性能剖析实战

**学习目标**：使用专业工具定位和解决性能瓶颈

**核心工具链**：
- `perf` - Linux 性能计数器 [官方文档](https://perf.wiki.kernel.org/)
- `bpftrace` - 高级追踪，DTrace 风格 [GitHub](https://github.com/iovisor/bpftrace)
- `FlameGraph` - 火焰图可视化 [GitHub](https://github.com/brendangregg/FlameGraph)
- `hyperfine` - 命令行基准测试 [GitHub](https://github.com/sharkdp/hyperfine)

**实践任务**：
```bash
# 1. CPU 火焰图生成
perf record -F 99 -ag -- sleep 30
perf script | ./stackcollapse-perf.pl | ./flamegraph.pl > perf.svg

# 2. off-CPU 分析（找出阻塞原因）
bpftrace -e 'kprobe:schedule { @[kstack, ustack, comm] = count(); }'

# 3. 内存分配追踪
bpftrace -e 'u:/lib/x86_64-linux-gnu/libc.so.6:malloc { @[comm, ustack] = count(); }'

# 4. 基准测试对比
hyperfine --warmup 3 'go test -run=NONE' 'go test -run=NONE -count=1'
```

**推荐资源**：
- [Systems Performance by Brendan Gregg](http://www.brendangregg.com/systems-performance-2nd-edition-book.html)
- [BPF Performance Tools](http://www.brendangregg.com/bpf-performance-tools-book.html)

**产出**：一次真实性能优化记录，包含火焰图和优化前后的对比数据

---

### Day 9: 代码搜索神器

**学习目标**：基于 AST 的代码分析和重构

**核心工具**：
- [`ast-grep`](https://ast-grep.github.io/) - 基于 AST 的多语言代码搜索和重构
- [`ripgrep`](https://github.com/BurntSushi/ripgrep) + [`fd`](https://github.com/sharkdp/fd) - 极速搜索
- [`codesearch`](https://github.com/google/codesearch) - Google 的代码搜索工具

**实践任务**：
```bash
# 安装
brew install ast-grep

# 场景 1：查找所有未处理的错误（Go）
ast-grep -p 'if err != nil { $_->Error() }' --lang go

# 场景 2：批量重构：将 console.log 替换为 logger.debug
ast-grep -p 'console.log($$$ARGS)' --rewrite 'logger.debug($$$ARGS)' -i

# 场景 3：查找潜在的 SQL 注入
ast-grep -p 'db.Query($X + $Y)' --lang go

# 场景 4：扫描弃用 API 的使用
ast-grep --config sgconfig.yml scan
```

**规则配置示例** (`.ast-grep/rules/no-console.yml`):
```yaml
id: no-console
language: typescript
rule:
  pattern: console.log($$$)
message: Use logger instead of console
severity: warning
fix: |
  logger.info($$$)
```

**产出**：一个自动化重构工具或 CI 集成方案

---

### Day 10: 终端复用与自动化

**学习目标**：打造一键启动的完整开发环境

**核心工具**：
- [`Zellij`](https://zellij.dev/) - 现代终端复用器，Rust 编写，内置布局系统
- [`tmuxinator`](https://github.com/tmuxinator/tmuxinator) - tmux 会话管理
- [`direnv`](https://direnv.net/) - 目录级别的环境变量管理
- [`stow`](https://www.gnu.org/software/stow/) - 点文件管理

**实践任务**：
```bash
# Zellij 布局配置 (~/.config/zellij/layouts/dev.kdl)
layout {
    default_tab_template {
        children
        pane size=1 borderless=true {
            plugin location="zellij:tab-bar"
        }
    }
    tab name="Editor" {
        pane command="nvim"
    }
    tab name="Terminals" {
        pane split_direction="vertical" {
            pane name="Server"
            pane name="Logs" command="tail" { args "-f" "app.log" }
        }
    }
}

# 一键启动脚本 (~/bin/dev-env-start)
#!/bin/bash
cd ~/projects/myapp || exit
zellij --layout dev attach -c myapp || zellij --layout dev
```

**产出**：`dev-env-start` 脚本，一条命令启动完整开发环境

---

## 第二阶段：系统与底层（Day 11-25）

**阶段目标**：理解机器如何真正工作，掌握 Linux 内核和系统编程核心概念。

### Day 11: Linux Namespace 实战

**学习目标**：理解容器隔离的基石

**核心概念**：
- PID Namespace - 进程 ID 隔离
- Mount Namespace - 文件系统视图隔离
- Network Namespace - 网络栈隔离
- IPC/UTS/User/Cgroup Namespace

**实践任务**：
```bash
# 创建新的 PID 和 Mount Namespace
sudo unshare --pid --fork --mount-proc /bin/bash
echo $$  # 显示为 1，在新 namespace 中是 init 进程
ps aux   # 只能看到自己 namespace 的进程

# 创建 Network Namespace
sudo ip netns add test-ns
sudo ip netns exec test-ns ip link  # 在 namespace 中执行命令
sudo ip netns exec test-ns bash     # 进入 namespace 的 shell

# 手动配置网络（容器网络的缩影）
sudo ip link add veth0 type veth peer name veth1
sudo ip link set veth1 netns test-ns
sudo ip addr add 10.0.0.1/24 dev veth0
sudo ip netns exec test-ns ip addr add 10.0.0.2/24 dev veth1
sudo ip link set veth0 up
sudo ip netns exec test-ns ip link set veth1 up
```

**推荐资源**：
- [Namespaces in Operation](https://lwn.net/Articles/531114/) - LWN 系列文章
- [Linux Namespaces Walkthrough](https://github.com/entercloudsuite/nsenter/blob/master/NAMESPACES.md)

**产出**：手写脚本实现隔离的进程树（不依赖 Docker）

---

### Day 12: Cgroup v2 资源限制

**学习目标**：掌握 Linux 资源控制机制

**核心概念**：
- Cgroup v2 统一层次结构 [官方文档](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)
- CPU 控制器：weight vs max（限额 vs 权重）
- Memory 控制器：limit、swap、oom
- IO 控制器：权重和限速

**实践任务**：
```bash
# 创建 cgroup
sudo mkdir /sys/fs/cgroup/myapp

# 配置 CPU：权重 100（默认 100），最大 50% 使用率
echo "100" | sudo tee /sys/fs/cgroup/myapp/cpu.weight
echo "50000 100000" | sudo tee /sys/fs/cgroup/myapp/cpu.max

# 配置内存：100MB 限制
echo "100M" | sudo tee /sys/fs/cgroup/myapp/memory.max

# 将进程加入 cgroup
echo $$ | sudo tee /sys/fs/cgroup/myapp/cgroup.procs

# 测试内存限制
stress-ng --vm 1 --vm-bytes 200M  # 触发 OOM
```

**产出**：理解容器资源限制的底层实现

---

### Day 13: epoll/kqueue 原理

**学习目标**：理解高性能 IO 多路复用

**核心对比**：
| 机制 | 特性 | 适用场景 |
|------|------|----------|
| select | 轮询，fd 数量限制 1024 | 简单场景 |
| poll | 轮询，无 fd 限制 | fd 数量中等 |
| epoll | 事件驱动，O(1) | Linux 高并发 |
| kqueue | 事件驱动，支持更多类型 | macOS/BSD |
| io_uring | 异步 IO，零拷贝 | Linux 5.1+ |

**实践任务**：
- 用 Go 或 Rust 实现简单的 echo server，对比不同并发模型的性能
- 使用 `strace` 观察 epoll 系统调用

```go
// 简化的 epoll 示例思路
// 使用 golang.org/x/sys/unix 包直接操作 epoll
epfd, _ := unix.EpollCreate1(0)
var event unix.EpollEvent
event.Events = unix.EPOLLIN
event.Fd = int32(fd)
unix.EpollCtl(epfd, unix.EPOLL_CTL_ADD, fd, &event)
// ... epoll_wait 循环
```

**推荐资源**：
- [The C10K Problem](http://www.kegel.com/c10k.html) - 经典问题
- [Epoll 原理剖析](https://zhuanlan.zhihu.com/p/63179839)

---

### Day 14: 零拷贝技术

**学习目标**：掌握高性能数据传输技术

**核心机制**：
- `sendfile()` - 内核态直接传输 [man page](https://man7.org/linux/man-pages/man2/sendfile.2.html)
- `mmap()` + `write()` - 内存映射
- `splice()` - 管道零拷贝
- `DMA` 直接内存访问

**实践任务**：
```c
// sendfile 示例（伪代码）
int in_fd = open("large_file.zip", O_RDONLY);
int out_fd = socket(AF_INET, SOCK_STREAM, 0);
off_t offset = 0;
sendfile(out_fd, in_fd, &offset, file_size);
```

**对比测试**：
- 传统读写 vs sendfile vs mmap 的文件传输性能
- 使用 `strace -c` 统计系统调用次数

**推荐资源**：
- [Zero Copy I: User-Mode Perspective](https://www.linuxjournal.com/article/6345)
- [Efficient data transfer through zero copy](https://developer.ibm.com/tutorials/l-user-space-tcp/)

---

### Day 15: 内存对齐与伪共享

**学习目标**：理解 CPU Cache 和内存布局对性能的影响

**核心概念**：
- Cache Line（通常 64 字节）
- False Sharing（伪共享）- 多核竞争同一 cache line
- Memory Alignment（内存对齐）

**实践任务**：
```go
// Go 示例：结构体布局优化
type BadStruct struct {
    A bool     // 1 byte
    B int64    // 8 bytes - 需要 7 bytes padding
    C bool     // 1 byte
}
// 内存占用：24 bytes

type GoodStruct struct {
    B int64    // 8 bytes
    A bool     // 1 byte
    C bool     // 1 byte + 6 bytes padding
}
// 内存占用：16 bytes

// False Sharing 测试
type Counter struct {
    n int64
    _ [56]byte // padding to avoid false sharing
}
```

**工具**：
```bash
# 查看结构体内存布局
go tool compile -S main.go | grep -A 20 "type.*BadStruct"
```

**推荐资源**：
- [Data alignment: Straighten up and fly right](https://developer.ibm.com/technologies/systems/articles/pa-dalign/)
- [False Sharing](https://en.wikipedia.org/wiki/False_sharing)

---

### Day 16: DPDK 入门

**学习目标**：用户态网络栈，绕过内核处理百万级 PPS

**核心概念**：
- Kernel Bypass - 绕过 Linux 网络栈
- PMD (Poll Mode Driver) - 轮询模式驱动
- Huge Pages - 大页内存减少 TLB miss
- NUMA 亲和性

**实践任务**：
1. 在虚拟机或物理机上搭建 DPDK 环境 [官方指南](https://doc.dpdk.org/guides/linux_gsg/index.html)
2. 运行 `dpdk-testpmd` 测试包转发性能
3. 理解 `l2fwd` / `l3fwd` 示例

```bash
# 绑定网卡到 DPDK
sudo modprobe vfio-pci
sudo dpdk-devbind.py --bind=vfio-pci 0000:02:00.0

# 运行 testpmd
sudo ./dpdk-testpmd -l 0-3 -n 4 -- -i
```

**推荐资源**：
- [DPDK 入门指南](https://dpdk.org/doc/guides/prog_guide/)
- [深入浅出 DPDK](https://book.douban.com/subject/26780289/) - 书籍

---

### Day 17: io_uring 异步 IO

**学习目标**：Linux 最新异步 IO 接口

**核心概念**：
- Submission Queue (SQ) / Completion Queue (CQ)
- 支持的操作：read/write/fsync/accept/connect
- 零拷贝 send/recv (Registered Buffers)

**实践任务**：
- 使用 Go 的 `x/sys/unix` 或 Rust 的 `io-uring` crate 编写异步文件操作
- 对比 io_uring、epoll、aio 的性能

```rust
// Rust io-uring 示例
use io_uring::{IoUring, opcode, types};

let mut ring = IoUring::new(32)?;
let fd = std::fs::File::open("file.txt")?;

let read_e = opcode::Read::new(types::Fd(fd.as_raw_fd()), buf.as_mut_ptr(), buf.len());
unsafe {
    let mut sq = ring.submission();
    let _ = sq.push(&read_e.build().user_data(0x42));
}
ring.submit_and_wait(1)?;
```

**推荐资源**：
- [Lord of the io_uring](https://unixism.net/loti/)
- [io_uring 原作者论文](https://kernel.dk/io_uring.pdf)

---

### Day 18: eBPF 追踪

**学习目标**：编写内核级性能监控工具

**核心工具链**：
- `bpftrace` - 高级追踪语言
- `BCC` (BPF Compiler Collection) - Python/C++ 工具集 [GitHub](https://github.com/iovisor/bcc)
- `libbpf` - C/C++ 库

**实践任务**：
```bash
# 追踪文件打开
bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("%s opened %s\n", comm, str(args->filename)); }'

# 统计系统调用延迟
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @start[tid] = nsecs; } tracepoint:raw_syscalls:sys_exit /@start[tid]/ { @latency = hist(nsecs - @start[tid]); delete(@start[tid]); }'

# 追踪 TCP 连接建立
bpftrace -e 'kprobe:tcp_v4_connect { printf("Connecting: %s\n", comm); }'
```

**推荐资源**：
- [bpftrace One-Liners](https://github.com/iovisor/bpftrace/blob/master/docs/one_liners.md)
- [BCC Tutorial](https://github.com/iovisor/bcc/blob/master/docs/tutorial.md)

---

### Day 19: 系统调用追踪

**学习目标**：深入理解程序行为

**核心工具**：
- `strace` - 系统调用追踪
- `seccomp` - 系统调用过滤
- `ptrace` - 进程追踪 API

**实践任务**：
```bash
# 追踪特定系统调用
strace -e trace=network,read,write -f ./myapp

# 统计系统调用次数
strace -c ./myapp

# 查看文件操作
strace -e trace=file -o strace.log ./myapp

# seccomp 策略编写
# 使用 libseccomp 限制容器只能使用白名单系统调用
```

**产出**：编写一个限制系统调用的安全沙箱

---

### Day 20: Linux 网络栈调优

**学习目标**：深度优化网络性能

**核心参数**：
- TCP 拥塞控制算法：cubic、bbp、reno
- 缓冲区大小：`net.core.rmem_max`、`net.ipv4.tcp_rmem`
- 连接优化：`SO_REUSEPORT`、TCP Fast Open

**实践任务**：
```bash
# 查看当前拥塞控制算法
sysctl net.ipv4.tcp_congestion_control

# 切换为 BBR（Google 开发的拥塞控制算法）
sudo modprobe tcp_bbr
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr

# 优化 TCP 缓冲区
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# 启用 TCP Fast Open
sudo sysctl -w net.ipv4.tcp_fastopen=3
```

**推荐资源**：
- [Linux Network Performance](https://github.com/leandromoreira/linux-network-performance-parameters)

---

### Day 21: 内存管理深潜

**学习目标**：理解 Linux 内存分配机制

**核心概念**：
- `brk()` vs `mmap()` - 堆内存分配方式
- `jemalloc`/`tcmalloc` - 用户态内存分配器
- `mmap` 的 Lazy Allocation
- Page Fault 处理

**实践任务**：
```bash
# 观察进程的内存映射
pmap -x <pid>
cat /proc/<pid>/maps

# 使用 perf 观察 page fault
perf stat -e page-faults,major-faults,minor-faults ./myapp

# 对比 malloc 实现
LD_PRELOAD=/usr/lib/libjemalloc.so.2 ./myapp
```

---

### Day 22: NUMA 架构感知

**学习目标**：多路服务器性能优化

**核心概念**：
- NUMA (Non-Uniform Memory Access)
- Local vs Remote Memory Access
- CPU 亲和性绑定

**实践任务**：
```bash
# 查看 NUMA 拓扑
numactl --hardware
lscpu | grep NUMA

# 绑定进程到特定 NUMA 节点
numactl --cpunodebind=0 --membind=0 ./myapp

# 使用 numastat 观察内存分布
numastat -p <pid>
```

**推荐资源**：
- [NUMA Deep Dive](https://www.dell.com/support/manuals/us/en/04/poweredge-r640/numadeploymentguide/introduction?guid=guid-52a78643-3d19-4e66-a174-49f5f943e658)

---

### Day 23: CPU Cache 优化

**学习目标**：利用 CPU 缓存提升性能

**核心概念**：
- L1/L2/L3 Cache 层次
- Cache Line、Cache Associativity
- Prefetch 指令
- 分支预测

**实践任务**：
- 编写程序测试不同访问模式（顺序 vs 随机）的性能差异
- 测试分支预测失败的影响

```c
// 分支预测测试
for (int i = 0; i < n; i++) {
    if (data[i] < 128) {  // 数据随机时预测失败率高
        sum += data[i];
    }
}
// 先排序数据，分支预测准确率大幅提升
```

**推荐资源**：
- [What Every Programmer Should Know About Memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf)

---

### Day 24: 性能计数器 PMC

**学习目标**：使用 CPU 硬件计数器分析性能

**核心指标**：
- IPC (Instructions Per Cycle)
- Cache Miss Rate
- Branch Misprediction
- TLB Miss

**实践任务**：
```bash
# 使用 perf 采集 PMC
perf stat -e cycles,instructions,cache-misses,cache-references,branches,branch-misses ./myapp

# 计算 IPC（越高越好，现代 CPU 峰值通常 3-4）
# IPC = instructions / cycles

# 采集详细的缓存事件
perf stat -e L1-dcache-loads,L1-dcache-load-misses,L1-icache-load-misses ./myapp
```

---

### Day 25: 手写简易 Container

**学习目标**：整合 Namespace + Cgroup + OverlayFS

**实践任务**：
实现一个 runc 的简化版：
1. 使用 `unshare` 创建 Namespace
2. 使用 Cgroup v2 限制资源
3. 使用 OverlayFS 作为 rootfs
4. 处理进程 init 信号转发

**参考实现**：
- [Liz Rice's Containers From Scratch](https://www.youtube.com/watch?v=8fi7uSYlOdc) [GitHub](https://github.com/lizrice/containers-from-scratch)
- [Build Your Own Container Using Less than 100 Lines of Go](https://www.infoq.com/articles/build-a-container-golang/)

**产出**：一个可用的微型容器运行时（几百行代码）

---

## 第三阶段：编程语言深度（Day 26-40）

**阶段目标**：掌握语言本质，理解类型系统和编译原理。

### Day 26-27: Rust 所有权系统与零成本抽象

**学习目标**：用 Rust 重写一个 C++ 项目

**核心概念**：
- Ownership、Borrowing、Lifetime
- Trait System（类型类）
- 宏系统（声明宏 vs 过程宏）
- 零成本抽象验证

**实践任务**：
1. 完成 [Rustlings](https://github.com/rust-lang/rustlings) 练习
2. 用 Rust 重写一个你熟悉的 C++/Go 项目
3. 对比宏、泛型、trait 对象的汇编输出：`cargo build --release` + `objdump -d`

**推荐资源**：
- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [Rustonomicon](https://doc.rust-lang.org/nomicon/) - Unsafe Rust 黑魔法
- [Rust 异步编程](https://rust-lang.github.io/async-book/)

---

### Day 28: 类型系统理论

**学习目标**：理解 Variance 和 Phantom Types

**核心概念**：
- Covariance / Contravariance / Invariance
- Phantom Types（幽灵类型，编译期状态机）

**实践任务**：
```rust
// Phantom Type 示例：状态机保证
struct Connection<T>(PhantomData<T>);
struct Disconnected;
struct Connected;

impl Connection<Disconnected> {
    fn connect(self) -> Connection<Connected> { ... }
}

impl Connection<Connected> {
    fn query(&mut self) -> Result<()> { ... }
    // 只有 Connected 状态才能调用 query
}
```

**推荐资源**：
- [Variance in Rust](https://doc.rust-lang.org/nomicon/subtyping.html)
- [Type Theory for Rust](https://www.youtube.com/watch?v=4Vq6q64Z-OU)

---

### Day 29: Effect System

**学习目标**：理解代数效应（Algebraic Effects）

**核心概念**：
- Effect 作为可追踪的副作用
- 结构化并发
- Continuation 捕获

**实践任务**：
- 学习 [Koka](https://koka-lang.github.io/koka/doc/book.html) 语言 [Online Playground](https://koka-lang.github.io/koka/doc/toc.html)
- 或使用 [Eff](https://www.eff-lang.org/) 语言
- 理解 Swift 的 Structured Concurrency 设计

**推荐资源**：
- [Algebraic Effects for the Rest of Us](https://overreacted.io/algebraic-effects-for-the-rest-of-us/)
- [Koka 论文](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/05/algeff-tr-2016-v2.pdf)

---

### Day 30: 宏编程艺术

**学习目标**：编写领域特定语言（DSL）

**实践任务**：
```rust
// 声明宏示例：vec! 风格的自定义宏
#[macro_export]
macro_rules! hashmap {
    ($( $key:expr => $value:expr ),*) => {{
        let mut map = ::std::collections::HashMap::new();
        $( map.insert($key, $value); )*
        map
    }};
}

// 过程宏示例：derive 宏
#[proc_macro_derive(Builder)]
pub fn derive_builder(input: TokenStream) -> TokenStream {
    // 自动生成 Builder 模式代码
}
```

**推荐资源**：
- [The Little Book of Rust Macros](https://veykril.github.io/tlborm/)
- [Procedural Macros Workshop](https://github.com/dtolnay/proc-macro-workshop)

---

### Day 31: 垃圾回收原理

**学习目标**：手写简单的 GC，理解 STW

**核心算法**：
- Mark-Sweep（标记-清除）
- Reference Counting（引用计数）
- Generational GC（分代回收）
- Tri-Color Marking（三色标记，并发 GC）

**实践任务**：
- 用 C 或 Rust 实现一个简易的 Mark-Sweep GC
- 测试 STW (Stop-The-World) 时间

**推荐资源**：
- [GC Handbook](http://gchandbook.org/) - 垃圾回收算法圣经
- [Writing a Simple Garbage Collector in C](https://maplant.com/gc.html)

---

### Day 32: 并发模型对比

**学习目标**：掌握 CSP、Actor、STM

**实践任务**：
用不同语言实现相同的并发逻辑：

1. **CSP** (Go)：
```go
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch
```

2. **Actor** (Rust + actix / Erlang 风格)：
```rust
// Actor 模型：消息传递，不共享状态
```

3. **STM** (Haskell / Clojure)：
```clojure
(dosync
  (alter account1 - 100)
  (alter account2 + 100))
```

**推荐资源**：
- [Seven Concurrency Models in Seven Weeks](https://pragprog.com/titles/pb7con/seven-concurrency-models-in-seven-weeks/)

---

### Day 33: 函数式编程范式

**学习目标**：理解 Monad、Functor

**实践任务**：
- 在 Haskell 中实现 Maybe Monad
- 用 FP-TS (TypeScript) 或 Arrow (Kotlin) 进行函数式编程

```haskell
-- Maybe Monad 实现
instance Monad Maybe where
    return = Just
    Nothing >>= _ = Nothing
    Just x >>= f = f x
```

**推荐资源**：
- [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
- [Learn You a Haskell](http://learnyouahaskell.com/)

---

### Day 34: 编译器前端

**学习目标**：手写 LL(1) 递归下降解析器

**核心概念**：
- 词法分析 (Lexical Analysis)
- 语法分析 (Parsing)：LL(1)、LR(1)
- AST (Abstract Syntax Tree)

**实践任务**：
- 用 Python/Go/Rust 实现一个简单的表达式解析器
- 支持：`+`、`-`、`*`、`/`、括号、变量

```rust
// 递归下降解析器示例结构
fn parse_expression(&mut self) -> Expr {
    let left = self.parse_term();
    while self.match_token(Plus) || self.match_token(Minus) {
        let op = self.previous();
        let right = self.parse_term();
        left = Expr::Binary(Box::new(left), op, Box::new(right));
    }
    left
}
```

**推荐资源**：
- [Crafting Interpreters](https://craftinginterpreters.com/) [中文版](https://github.com/GuoYaxiang/craftinginterpreters_zh) - 神书，必看

---

### Day 35: JIT 编译原理

**学习目标**：理解 V8/TurboFan 优化机制

**核心概念**：
- Ignition 解释器
- TurboFan 编译器
- Hidden Class（隐藏类）
- Inline Caching（内联缓存）

**实践任务**：
- 使用 `--print-opt-code` 和 `--trace-turbo-inlining` 观察 V8 优化
- 编写代码触发和规避优化（如避免 `eval`、`with`）

```bash
# 查看 V8 优化情况
node --trace-opt --trace-deopt script.js
```

**推荐资源**：
- [Understanding V8](https://blog.chromium.org/2023/09/how-we-built-ping-v8.html)
- [V8 文档](https://v8.dev/docs)

---

### Day 36: 类型推导算法

**学习目标**：实现 Hindley-Milner 类型系统

**核心算法**：
- 统一算法 (Unification)
-  let-polymorphism

**实践任务**：
- 阅读并理解 [Write You a Haskell](http://dev.stephendiehl.com/fun/006_hindley_milner.html) 的类型推导章节
- 实现一个简单的 HM 类型检查器

**推荐资源**：
- [Algorithm W Step by Step](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.65.7733&rep=rep1&type=pdf)

---

### Day 37: 内存安全证明

**学习目标**：使用 Miri 验证 Unsafe Rust

**实践任务**：
```bash
# 安装 Miri
rustup component add miri

# 运行测试
cargo miri test

# 检查未定义行为
cargo miri run
```

编写各种 unsafe 代码并用 Miri 检测问题：
- 悬垂指针
- 数据竞争
- 未初始化内存读取

**推荐资源**：
- [Miri 文档](https://github.com/rust-lang/miri)

---

### Day 38: 依赖注入模式

**学习目标**：对比各语言 DI 实现

**实践对比**：
- Java Spring / Dagger 2（编译期生成）
- Go Wire（代码生成）
- Rust 的类型系统实现 DI

---

### Day 39: 元编程反射

**学习目标**：理解反射的代价和替代方案

**实践任务**：
- 对比 Go reflect vs Java Annotation Processor 性能
- 学习 Rust 的宏元编程（无运行时反射）

---

### Day 40: DSL 设计实践

**学习目标**：为业务领域设计 DSL

**实践任务**：
- 设计并实现一个内部 DSL（Fluent API）
- 或设计一个外部 DSL（自定义语法）+ 解释器

```rust
// 内部 DSL 示例：查询构建器
Query::from("users")
    .select(&["name", "email"])
    .where_("age", ">", 18)
    .order_by("created_at", Desc)
    .limit(10)
    .build();
```

---

## 第四阶段：架构与设计（Day 41-55）

**阶段目标**：解决复杂系统的复杂性，掌握分布式系统设计模式。

### Day 41-42: DDD 战略设计与事件风暴

**学习目标**：从业务到代码的映射

**核心概念**：
- 限界上下文 (Bounded Context)
- 上下文映射 (Context Map)
- 领域事件 (Domain Event)
- 聚合根 (Aggregate Root)

**实践任务**：
1. 学习 [事件风暴](https://www.eventstorming.com/) 工作坊方法
2. 为你的业务领域绘制上下文映射图

**推荐资源**：
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/) - Eric Evans
- [Implementing Domain-Driven Design](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/) - Vaughn Vernon

---

### Day 43: CQRS + Event Sourcing

**学习目标**：读写分离与事件溯源

**核心概念**：
- Command Query Responsibility Segregation
- Event Sourcing - 状态即事件序列的折叠
- Event Store 设计

**推荐资源**：
- [CQRS, Task Based UIs, Event Sourcing agh!](https://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)
- [Event Store 数据库](https://www.eventstore.com/)

---

### Day 44: Saga 分布式事务

**学习目标**：最终一致性的事务模式

**核心模式**：
- Choreography Saga（事件编排）
- Orchestration Saga（协调器编排）
- 补偿事务 (Compensating Transaction)

**实践任务**：
- 实现一个订单处理的 Saga 流程
- 处理补偿逻辑（库存回滚、退款等）

**推荐资源**：
- [Saga Pattern](https://microservices.io/patterns/data/saga.html)

---

### Day 45: CRDT 无冲突复制

**学习目标**：协同编辑的数据结构

**核心概念**：
- State-based vs Operation-based CRDT
- LWW (Last-Write-Wins) Register
- G-Set、OR-Set
- Yjs / Automerge 原理

**实践任务**：
- 实现一个简单的 G-Counter（计数器 CRDT）
- 研究 Yjs 的文档更新格式

**推荐资源**：
- [CRDT 论文](https://crdt.tech/) [中文版](https://zhuanlan.zhihu.com/p/419576545)
- [Yjs 原理](https://docs.yjs.dev/)

---

### Day 46: 共识算法实现

**学习目标**：手写 Raft 算法

**核心概念**：
- Leader 选举
- 日志复制
- 安全性保证

**实践任务**：
- 完成 [MIT 6.824 Lab 2](https://pdos.csail.mit.edu/6.824/labs/lab-raft.html)：实现 Raft
- 或使用 [Raft 可视化工具](http://thesecretlivesofdata.com/raft/) 理解流程

**推荐资源**：
- [Raft 论文](https://raft.github.io/raft.pdf) [中文版](https://github.com/maemual/raft-zh_cn)
- [Raft 作者讲解视频](https://www.youtube.com/watch?v=YbZ3zDzDnrw)

---

### Day 47: Gossip 协议

**学习目标**：去中心化的集群成员发现

**核心概念**：
- 反熵 (Anti-Entropy)
- 谣言传播 (Rumor Mongering)
- SWIM 协议改进

**实践任务**：
- 实现一个基于 Gossip 的成员列表传播
- 对比一致性收敛速度

**推荐资源**：
- [SWIM 论文](https://www.cs.cornell.edu/projects/Quicksilver/public_pdfs/SWIM.pdf)
- [Gossip 协议](https://managementfromscratch.wordpress.com/2016/04/01/introduction-to-gossip/)

---

### Day 48: Backpressure 背压

**学习目标**：流控策略设计

**核心策略**：
- 丢弃 (Drop)
- 缓冲 (Buffer)
- 限速 (Throttle)
- 动态反馈 (Feedback)

**实践任务**：
- 实现一个带背压的 Channel（类似 Rust flume 或 Go 的 bounded channel）

---

### Day 49: 熔断与限流

**学习目标**：服务稳定性保障

**核心算法**：
- 熔断器模式 (Circuit Breaker)
- 令牌桶 (Token Bucket)
- 漏桶 (Leaky Bucket)
- 滑动窗口 (Sliding Window)

**实践任务**：
- 实现一个自适应熔断器
- 对比 Sentinel、Resilience4j 的实现

**推荐资源**：
- [Google SRE Book - Handling Overload](https://sre.google/sre-book/handling-overload/)

---

### Day 50: 服务网格进阶

**学习目标**：Istio/Linkerd 流量管理原理

**核心概念**：
- Sidecar 模式
- mTLS 自动加密
- 流量分割、超时、重试
- Envoy 代理配置

**实践任务**：
- 在本地 Kubernetes 搭建 Istio
- 配置金丝雀发布和故障注入

**推荐资源**：
- [Istio 文档](https://istio.io/latest/docs/)
- [Envoy Proxy 架构](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/intro/arch_overview)

---

### Day 51: 多级缓存策略

**学习目标**：L1/L2/L3 缓存架构

**核心问题**：
- 缓存一致性 (Cache Coherence)
- 缓存穿透、雪崩、击穿防护
- 热 key 处理

**推荐资源**：
- [Designing Data-Intensive Applications](https://dataintensive.net/) - Chapter 2

---

### Day 52: 数据分片策略

**学习目标**：分布式数据分区

**核心策略**：
- 一致性哈希 (Consistent Hashing)
- 范围分片 (Range Sharding)
- 冷热分离

**实践任务**：
- 实现一个一致性哈希环
- 测试节点增删时的数据迁移

**推荐资源**：
- [Consistent Hashing](https://www.toptal.com/big-data/consistent-hashing)

---

### Day 53: 消息队列设计

**学习目标**：Kafka/Pulsar 存储架构

**核心概念**：
- 顺序写磁盘 vs 随机读
- 零拷贝 (Zero Copy)
- 分区与消费者组
- 保留策略与压缩

**推荐资源**：
- [Kafka 官方文档](https://kafka.apache.org/documentation/)
- [Pulsar 架构](https://pulsar.apache.org/docs/next/concepts-architecture-overview/)

---

### Day 54: HTAP 架构

**学习目标**：混合事务/分析处理

**核心概念**：
- OLTP vs OLAP 负载隔离
- 行存 vs 列存
- 实时分析

**推荐资源**：
- [TiDB 架构](https://docs.pingcap.com/tidb/stable/overview)
- [OceanBase](https://www.oceanbase.com/docs)

---

### Day 55: Serverless 冷启动优化

**学习目标**：FaaS 性能优化

**核心策略**：
- 预置并发 (Provisioned Concurrency)
- 快照恢复 (Snapshot Restore)
- 精简依赖

**推荐资源**：
- [AWS Lambda 冷启动优化](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization/)

---

## 第五阶段：安全与逆向（Day 56-65）

**阶段目标**：知其黑，守其白，建立安全思维。

### Day 56: 二进制分析入门

**学习目标**：IDA Pro / Ghidra 反编译

**核心概念**：
- 汇编语言基础 (x86_64 / ARM)
- 调用约定 (Calling Convention)
- 栈帧结构

**实践任务**：
- 下载 [crackmes](https://crackmes.one/) 练习
- 使用 Ghidra 分析一个简单的二进制 [Ghidra 下载](https://ghidra-sre.org/)

---

### Day 57: 动态调试技术

**学习目标**：GDB / lldb 高级调试

**实践任务**：
```bash
# GDB 常用命令
gdb ./program
break main
run
stepi      # 单步汇编
info registers
x/10x $rsp # 查看栈内存
backtrace
```

---

### Day 58: 缓冲区溢出

**学习目标**：栈溢出原理与防御

**核心概念**：
- ROP 链构造
- ASLR、PIE、CANARY、NX 缓解机制

**实践任务**：
- 在关闭缓解机制的实验环境中构造溢出攻击
- 学习 [ROP Emporium](https://ropemporium.com/) 练习

**推荐资源**：
- [CTF Pwn 入门](https://ctf-wiki.org/pwn/linux/stack/)

---

### Day 59: Web 安全深潜

**学习目标**：现代 Web 攻击与防御

**核心漏洞**：
- SSTI (Server-Side Template Injection)
- SSRF (Server-Side Request Forgery)
- XXE (XML External Entity)
- 反序列化漏洞

**推荐资源**：
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)

---

### Day 60: 密码学应用

**学习目标**：正确使用加密算法

**核心概念**：
- AES-GCM 认证加密
- ChaCha20-Poly1305
- Argon2 密码哈希
- 避免常见陷阱（ECB 模式、硬编码密钥）

**推荐资源**：
- [Crypto 101](https://www.crypto101.io/)
- [Libsodium 文档](https://doc.libsodium.org/)

---

### Day 61: 供应链安全

**学习目标**：SCA 与 SBOM

**核心工具**：
- Snyk / OWASP Dependency-Check
- Syft / Grype（生成和扫描 SBOM）

```bash
# 生成 SBOM
syft packages dir:. -o spdx-json > sbom.spdx.json

# 扫描漏洞
grype sbom.spdx.json
```

---

### Day 62: 容器逃逸防护

**学习目标**：Docker 安全加固

**核心配置**：
- Capabilities 白名单
- AppArmor / SELinux 策略
- Seccomp 配置文件
- User Namespace

---

### Day 63: 代码审计实战

**学习目标**：审计开源项目

**实践任务**：
- 选择一个小型开源项目（< 1万行）
- 使用 CodeQL 或 Semgrep 进行静态分析
- 手动审计关键路径

---

### Day 64: Fuzzing 测试

**学习目标**：AFL / AFL++ 模糊测试

**实践任务**：
```bash
# 编译目标程序
afl-gcc -o target target.c

# 运行 fuzzing
mkdir in out
afl-fuzz -i in -o out ./target
```

**推荐资源**：
- [AFL++ 文档](https://aflplus.plus/docs/)

---

### Day 65: 威胁建模

**学习目标**：STRIDE 方法论

**核心概念**：
- Spoofing、Tampering、Repudiation、Information Disclosure、Denial of Service、Elevation of Privilege

**实践任务**：
- 为你的系统设计威胁模型
- 绘制数据流图 (DFD)

**推荐资源**：
- [Microsoft Threat Modeling Tool](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool)

---

## 第六阶段：AI 时代开发（Day 66-80）

**阶段目标**：把 AI 真正集成到系统架构，而非简单调用 API。

### Day 66: LLM 应用架构

**学习目标**：RAG vs Fine-tuning vs Prompt Engineering 决策树

**决策框架**：
| 场景 | 方案 |
|------|------|
| 知识库问答 | RAG |
| 特定格式输出 | Prompt Engineering +  few-shot |
| 领域术语理解 | Fine-tuning |
| 成本敏感 | 小模型 + RAG |

**推荐资源**：
- [OpenAI 最佳实践](https://platform.openai.com/docs/guides/gpt-best-practices)

---

### Day 67: 向量数据库选型

**学习目标**：对比 Milvus / Pinecone / pgvector

**核心指标**：
- 支持的索引类型 (HNSW、IVF)
- 混合搜索能力
- 元数据过滤
- 成本

**实践任务**：
- 部署 pgvector [GitHub](https://github.com/pgvector/pgvector)
- 对比不同索引的召回率和性能

---

### Day 68: Embedding 模型

**学习目标**：多语言 Embedding 部署与微调

**推荐模型**：
- [BGE (BAAI)](https://github.com/FlagOpen/FlagEmbedding)
- [M3E](https://huggingface.co/moka-ai/m3e-base)
- [GTE](https://huggingface.co/thenlper/gte-base)

**实践任务**：
- 使用 FlagEmbedding 进行领域数据微调
- 评估召回率提升

---

### Day 69: RAG 高级技巧

**学习目标**：提升 RAG 质量的技巧

**核心技术**：
- 查询重写 (Query Rewriting)
- 混合搜索 (Hybrid Search)
- 重排序 (Rerank) - Cohere Rerank / bge-reranker
- 父文档检索 (Parent Document Retrieval)

**推荐资源**：
- [Advanced RAG Techniques](https://www.pinecone.io/learn/advanced-rag/)

---

### Day 70: Agent 设计模式

**学习目标**：ReAct、Plan-and-Execute、Multi-Agent

**核心模式**：
1. **ReAct**: Reasoning + Acting 交替
2. **Plan-and-Execute**: 先规划再执行
3. **Multi-Agent**: 多个 Agent 协作

**实践任务**：
- 使用 LangChain 或 LlamaIndex 实现一个 ReAct Agent
- 或尝试 [AutoGen](https://github.com/microsoft/autogen)

---

### Day 71: MCP 协议实战

**学习目标**：构建自定义 MCP Server

**MCP (Model Context Protocol)**：Anthropic 推出的开放协议，用于扩展 AI 工具能力

**实践任务**：
- 阅读 [MCP 文档](https://modelcontextprotocol.io/)
- 实现一个简单的 MCP Server（如数据库查询工具）
- 集成到 Claude Desktop

---

### Day 72: 函数调用（Function Calling）

**学习目标**：结构化输出与工具调用

**实践任务**：
- 设计工具 Schema
- 实现工具调用链
- 处理并行工具调用

---

### Day 73: Prompt 注入防御

**学习目标**：安全防护

**核心策略**：
- 输入验证和清洗
- 输出过滤
- 沙箱隔离（Sandboxes）

**推荐资源**：
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

---

### Day 74: LLM 缓存策略

**学习目标**：降低成本和延迟

**缓存层次**：
1. **Exact Cache**: 完全相同的 prompt
2. **Semantic Cache**: 相似 prompt（如 GPTCache）
3. **Prompt Cache**: 前缀共享（如 Claude 的 prompt caching）

**推荐工具**：
- [GPTCache](https://github.com/zilliztech/GPTCache)

---

### Day 75: 模型量化与部署

**学习目标**：本地部署大模型

**核心技术**：
- GGML / GGUF 格式
- llama.cpp / vLLM / text-generation-inference
- LoRA / QLoRA 微调

**实践任务**：
- 使用 llama.cpp 部署量化模型
- 对比 Q4、Q5、Q8 量化的性能和效果

**推荐资源**：
- [Hugging Face 文本生成推理](https://github.com/huggingface/text-generation-inference)
- [vLLM 文档](https://docs.vllm.ai/)

---

### Day 76: 多模态应用

**学习目标**：视觉、语音、文档解析集成

**核心技术**：
- Vision-Language Model (GPT-4V、Qwen-VL)
- OCR + LLM 文档理解
- TTS / STT 集成

---

### Day 77: AI 工作流编排

**学习目标**：LangChain / LlamaIndex 源码阅读与定制

**实践任务**：
- 阅读 LangChain 核心抽象（Chain、Agent、Memory）
- 实现自定义 Chain
- 优化Retriever 性能

---

### Day 78: LLM 可观测性

**学习目标**：监控和评估

**核心指标**：
- Token 消耗和成本
- 延迟 (TTFT、TPOT)
- 输出质量（幻觉检测）

**工具**：
- LangSmith / Langfuse / Helicone

---

### Day 79: AI 辅助代码审查

**学习目标**：AST + LLM 结合

**实践任务**：
- 使用 ast-grep 提取代码结构
- 结合 LLM 进行智能 Code Review
- 或配置 [CodeRabbit](https://coderabbit.ai/) / [PR-Agent](https://github.com/Codium-ai/pr-agent)

---

### Day 80: AI 系统压测

**学习目标**：LLM 服务容量规划

**核心任务**：
- 流式响应优化 (SSE)
- 并发测试
- 成本预估

---

## 第七阶段：前沿技术（Day 81-90）

**阶段目标**：站在技术浪潮前沿。

### Day 81-82: WebAssembly 进阶

**学习目标**：WASI、组件模型

**核心概念**：
- WASI (WebAssembly System Interface) [标准](https://wasi.dev/)
- Component Model [提案](https://component-model.bytecodealliance.org/)
- Wasm 与容器的对比

**实践任务**：
- 使用 Wasmtime 运行 Wasm 模块
- 尝试 Rust 编译到 Wasm32-wasi

---

### Day 83-84: 边缘计算架构

**学习目标**：Cloudflare Workers / Deno Deploy

**核心概念**：
- V8 Isolate 轻量级隔离
- 边缘存储（KV、Durable Objects）
- 边缘渲染

**实践任务**：
- 部署一个 Cloudflare Worker [文档](https://developers.cloudflare.com/workers/)
- 使用 Durable Objects 实现协调

---

### Day 85: 本地优先软件

**学习目标**：CRDT + 本地存储

**核心工具**：
- [Replicache](https://replicache.dev/)
- [ElectricSQL](https://electric-sql.com/)
- [RxDB](https://rxdb.info/)

---

### Day 86: Unikernel 探索

**学习目标**：单地址空间内核

**项目**：
- [MirageOS](https://mirage.io/) (OCaml)
- [IncludeOS](https://www.includeos.org/)

---

### Day 87: 可验证计算

**学习目标**：zk-SNARKs 基础

**核心概念**：
- 零知识证明
- Circom / Noir 电路语言

**推荐资源**：
- [zkHack](https://zkhack.dev/)

---

### Day 88: 形式化验证入门

**学习目标**：TLA+ 模型检测

**实践任务**：
- 学习 [TLA+ Video Course](https://www.youtube.com/playlist?list=PLWAvZF9v tangent)
- 验证一个简单的分布式算法

**推荐资源**：
- [TLA+ 官网](https://lamport.azurewebsites.net/tla/tla.html)
- [Learn TLA+](https://www.learntla.com/)

---

### Day 89: Nix/Guix 系统

**学习目标**：声明式系统配置

**核心概念**：
- Nix 包管理器
- NixOS 发行版
- Flakes 实验性功能

**实践任务**：
- 安装 Nix [官方](https://nixos.org/download.html)
- 编写一个简单的 Nix Flake
- 使用 Home Manager 管理 dotfiles

**推荐资源**：
- [Nix Pills](https://nixos.org/guides/nix-pills/)
- [Zero to Nix](https://zero-to-nix.com/)

---

### Day 90: eBPF 应用开发

**学习目标**：用 Rust/Aya 开发生产级 eBPF 程序

**核心工具**：
- [Aya](https://aya-rs.dev/) - Rust eBPF 框架
- [libbpf-rs](https://github.com/libbpf/libbpf-rs)

**实践任务**：
- 使用 Aya 编写一个跟踪 TCP 连接的 eBPF 程序
- 加载到内核并观察输出

---

## 第八阶段：综合实战（Day 91-100）

**阶段目标**：融会贯通，建立个人技术壁垒。

### Day 91: 技术雷达绘制

**任务**：使用 [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar) 格式，绘制你的个人技术雷达

**分类**：
- Adopt（已采用）
- Trial（试用中）
- Assess（评估中）
- Hold（暂缓）

---

### Day 92: 开源项目贡献

**任务**：
1. 选择一个你使用的开源项目
2. 阅读 CONTRIBUTING.md
3. 找到一个 good-first-issue 或文档改进
4. 提交一个高质量的 PR

**推荐平台**：
- [Up For Grabs](https://up-for-grabs.net/)
- [Good First Issue](https://goodfirstissue.dev/)

---

### Day 93: 技术博客写作

**任务**：
- 选择前 92 天最深刻的知识点
- 写一篇技术博客（1000-3000 字）
- 发布到：掘金 / 知乎 / 个人博客 / Dev.to

---

### Day 94: 个人 CLI 工具开发

**任务**：
- 用 Rust/Go 写一个解决你痛点的工具
- 发布到 GitHub
- 编写完整的 README 和安装说明

**灵感来源**：
- 日常重复的工作流
- 团队内部工具需求

---

### Day 95: 监控系统搭建

**任务**：
- 搭建 Prometheus + Grafana
- 编写自定义 Exporter
- 配置告警规则

---

### Day 96: Tracing 系统

**任务**：
- 接入 OpenTelemetry
- 实现分布式追踪
- 使用 Jaeger 或 Tempo 查看 trace

**推荐资源**：
- [OpenTelemetry 文档](https://opentelemetry.io/docs/)

---

### Day 97: 混沌工程

**任务**：
- 使用 Chaos Mesh [GitHub](https://github.com/chaos-mesh/chaos-mesh)
- 设计故障注入实验
- 验证系统韧性

---

### Day 98: 容量规划

**任务**：
- 基于真实流量数据进行容量评估
- 使用 Little's Law 进行计算
- 制定扩缩容策略

---

### Day 99: 技术影响力

**任务**：
- 准备一场 30 分钟的技术分享
- 制作高质量的 PPT / 演示代码
- 可以是团队内部分享或技术社区

---

### Day 100: 100 天复盘

**任务**：
1. 回顾 100 天的学习笔记
2. 整理知识体系思维导图
3. 写一篇完整的成长回顾文章
4. 制定下一个 100 天计划

---

## 推荐工具链

### 开发环境

| 工具 | 用途 | 链接 |
|------|------|------|
| Neovim | 编辑器 | https://neovim.io/ |
| WezTerm / Alacritty | 终端 | https://wezfurlong.org/wezterm/ / https://alacritty.org/ |
| Zellij | 终端复用 | https://zellij.dev/ |
| Starship | 提示符 | https://starship.rs/ |
| Nix | 包管理 | https://nixos.org/ |
| direnv | 环境管理 | https://direnv.net/ |
| fzf | 模糊查找 | https://github.com/junegunn/fzf |
| zoxide | 智能 cd | https://github.com/ajeetdsouza/zoxide |

### 监控与调试

| 工具 | 用途 | 链接 |
|------|------|------|
| btop | 资源监控 | https://github.com/aristocratos/btop |
| bpftrace | 动态追踪 | https://github.com/iovisor/bpftrace |
| perf | 性能剖析 | https://perf.wiki.kernel.org/ |
| hyperfine | 基准测试 | https://github.com/sharkdp/hyperfine |
| mitmproxy | HTTP 调试 | https://mitmproxy.org/ |

### 代码工具

| 工具 | 用途 | 链接 |
|------|------|------|
| ast-grep | AST 搜索 | https://ast-grep.github.io/ |
| ripgrep | 文本搜索 | https://github.com/BurntSushi/ripgrep |
| fd | 文件查找 | https://github.com/sharkdp/fd |
| jq | JSON 处理 | https://jqlang.github.io/jq/ |
| fx | JSON 查看 | https://github.com/antonmedv/fx |

### AI 开发

| 工具 | 用途 | 链接 |
|------|------|------|
| Ollama | 本地 LLM | https://ollama.com/ |
| LangChain | LLM 框架 | https://python.langchain.com/ |
| LlamaIndex | RAG 框架 | https://www.llamaindex.ai/ |
| ChromaDB | 向量数据库 | https://www.trychroma.com/ |
| Continue.dev | AI 代码助手 | https://www.continue.dev/ |

---

## 学习资源汇总

### 经典书籍

1. **Systems Performance** - Brendan Gregg
   - http://www.brendangregg.com/systems-performance-2nd-edition-book.html

2. **Designing Data-Intensive Applications** - Martin Kleppmann
   - https://dataintensive.net/

3. **Crafting Interpreters** - Bob Nystrom
   - https://craftinginterpreters.com/
   - 中文版：https://github.com/GuoYaxiang/craftinginterpreters_zh

4. **The Garbage Collection Handbook** 
   - http://gchandbook.org/

5. **Domain-Driven Design** - Eric Evans

6. **Seven Concurrency Models in Seven Weeks**
   - https://pragprog.com/titles/pb7con/

### 在线课程

- **MIT 6.824**: Distributed Systems
  - https://pdos.csail.mit.edu/6.824/

- **CMU 15-445**: Database Systems
  - https://15445.courses.cs.cmu.edu/

- **Stanford CS 144**: Computer Networking
  - https://cs144.github.io/

### 技术博客与社区

- **High Scalability**: http://highscalability.com/
- **Martin Fowler**: https://martinfowler.com/
- **Brendan Gregg's Blog**: http://www.brendangregg.com/blog/
- **LWN.net**: https://lwn.net/ (Linux Weekly News)
- **The Morning Paper**: https://blog.acolyer.org/

### GitHub 资源

- **awesome-scalability**: https://github.com/binhnguyennus/awesome-scalability
- **system-design-primer**: https://github.com/donnemartin/system-design-primer
- **Developer Roadmap**: https://roadmap.sh/

---

## 学习心法

1. **输出倒逼输入**：每学一个知识点，尝试写一篇博客或录一个视频
2. **建立知识图谱**：使用 Obsidian / Notion 建立关联笔记
3. **动手优先**：至少 70% 的时间花在实践上
4. **社区参与**：加入 Discord / Slack 技术群组，与同行交流
5. **持续迭代**：技术变化快，培养快速学习和适应的能力

---

**祝你在 100 天后成为一个更强的工程师！**

*Last Updated: 2026-02-09*
