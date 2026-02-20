---
name: mermaid-chart
description: Mermaid 图表生成助手。当用户需要在文档中插入图表时使用此技能。触发场景：（1）用户说"画个图"、"生成流程图"、"用图表展示"等，（2）用户想将文字描述转换为可视化图表，（3）用户需要架构图、时序图、类图等
---

# Mermaid Chart

## 概述

此技能帮助用户将文字描述或概念转换为 Mermaid 图表代码，增强文档的可读性和可视化效果。

## 工作流程

```mermaid
flowchart TD
    Start([开始]) --> Understand{理解用户需求}
    
    Understand --> SelectType[选择图表类型]
    SelectType --> Design[设计图表结构]
    Design --> Generate[生成 Mermaid 代码]
    
    Generate --> Validate[验证语法正确性]
    Validate --> Optimize[优化样式和布局]
    
    Optimize --> Output[输出图表代码]
    Output --> Explain[解释图表内容]
    Explain --> End([结束])
    
    style Start fill:#5f67ee,stroke:#4f46a8,color:#fff
    style End fill:#5f67ee,stroke:#4f46a8,color:#fff
    style Understand fill:#eef2ff,stroke:#5f67ee,color:#312e81
    style Generate fill:#5f67ee,stroke:#4f46a8,color:#fff
    style Optimize fill:#5f67ee,stroke:#4f46a8,color:#fff
    style Output fill:#312e81,stroke:#5f67ee,color:#fff
```

## 图表类型速查

根据内容类型选择合适的图表：

```mermaid
mindmap
  root((图表类型选择))
    流程图
      业务流程
      算法步骤
      决策判断
    序列图
      接口调用
      交互流程
      消息传递
    类图
      代码结构
      继承关系
      依赖关系
    状态图
      状态转换
      生命周期
      工作流
    甘特图
      项目计划
      时间安排
      里程碑
    思维导图
      知识结构
      概念梳理
      分类整理
    饼图
      占比分析
      数据统计
      分布展示
    ER图
      数据库设计
      实体关系
      模型设计
```

## 图表类型详解

### 1. 流程图 (flowchart)

**适用场景**：业务流程、算法步骤、系统架构

**语法模板**：

```markdown
```mermaid
flowchart TD
    A[开始] --> B{判断条件}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
    
    style A fill:#5f67ee,stroke:#4f46a8,color:#fff
    style E fill:#5f67ee,stroke:#4f46a8,color:#fff
    style B fill:#eef2ff,stroke:#5f67ee,color:#312e81
```
```

**方向说明**：
- `TD` 或 `TB`：从上到下
- `BT`：从下到上
- `LR`：从左到右
- `RL`：从右到左

**节点形状**：
- `[文本]`：矩形
- `(文本)`：圆角矩形
- `{文本}`：菱形（判断）
- `((文本))`：圆形
- `>文本]`：不对称矩形

### 2. 序列图 (sequenceDiagram)

**适用场景**：接口调用、交互流程、消息传递

**语法模板**：

```markdown
```mermaid
sequenceDiagram
    autonumber
    participant C as 客户端
    participant S as 服务端
    participant DB as 数据库
    
    C->>S: 发送请求
    activate S
    S->>DB: 查询数据
    activate DB
    DB-->>S: 返回结果
    deactivate DB
    S-->>C: 返回响应
    deactivate S
    
    Note over C,S: 请求响应周期
```
```

**常用语法**：
- `->>`：实线箭头
- `-->>`：虚线箭头
- `->>+`：带激活的箭头
- `-->>-`：带取消激活的箭头
- `Note over A,B`：在 A 和 B 上方添加注释
- `activate/deactivate`：激活/取消激活生命线

### 3. 类图 (classDiagram)

**适用场景**：代码结构、继承关系、模块依赖

**语法模板**：

```markdown
```mermaid
classDiagram
    class Main {
        +main() void
        -config Config
    }
    
    class Helper {
        +assist() Result
        +process(data Data) Output
    }
    
    class Config {
        +load() void
        +save() void
    }
    
    Main --> Helper : 使用
    Main o-- Config : 包含
    Helper ..> Config : 依赖
```
```

**关系类型**：
- `-->` 或 `..>`：依赖/关联
- `--|>` 或 `..|>`：继承/实现
- `--o` 或 `..o`：聚合
- `--*` 或 `..*`：组合

### 4. 状态图 (stateDiagram)

**适用场景**：状态转换、生命周期、工作流

**语法模板**：

```markdown
```mermaid
stateDiagram
    [*] --> 初始化
    初始化 --> 运行中: 启动
    运行中 --> 暂停: 暂停
    暂停 --> 运行中: 恢复
    运行中 --> 错误: 异常
    错误 --> 运行中: 重试
    运行中 --> [*]: 停止
    错误 --> [*]: 终止
    
    state 运行中 {
        [*] --> 处理中
        处理中 --> 等待中
        等待中 --> 处理中
    }
```
```

### 5. 甘特图 (gantt)

**适用场景**：项目计划、时间安排、里程碑

**语法模板**：

```markdown
```mermaid
gantt
    title 学习计划
    dateFormat YYYY-MM-DD
    axisFormat %m-%d
    
    section 第一阶段
    主题1      :a1, 2026-02-20, 3d
    主题2      :a2, after a1, 2d
    里程碑1    :milestone, after a2, 0d
    
    section 第二阶段
    主题3      :b1, after a2, 5d
    主题4      :b2, after b1, 3d
```
```

### 6. 思维导图 (mindmap)

**适用场景**：知识结构、概念梳理、分类整理

**语法模板**：

```markdown
```mermaid
mindmap
  root((主题))
    分支1
      子节点1
      子节点2
        孙节点1
        孙节点2
    分支2
      子节点3
      子节点4
    分支3
```
```

### 7. 饼图 (pie)

**适用场景**：占比分析、数据统计、分布展示

**语法模板**：

```markdown
```mermaid
pie title 学习时间分配
    "理论学习" : 30
    "动手实践" : 50
    "复盘总结" : 20
```
```

### 8. ER 图 (erDiagram)

**适用场景**：数据库设计、实体关系、模型设计

**语法模板**：

```markdown
```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        string id
        string name
        string email
    }
    ORDER {
        string id
        string userId
        date createdAt
        float total
    }
```
```

**关系类型**：
- `||--o{`：一对一 对 一对多
- `||--||`：一对一 对 一对一
- `}o--o{`：多对多

### 9. 用户旅程图 (journey)

**适用场景**：用户体验、流程分析、痛点识别

**语法模板**：

```markdown
```mermaid
journey
    title 学习流程体验
    section 开始学习
      选择主题: 5: 用户
      阅读文档: 3: 用户
      动手实践: 4: 用户
    section 遇到困难
      查找资料: 3: 用户
      寻求帮助: 2: 用户
    section 完成学习
      总结输出: 5: 用户
      应用到项目: 5: 用户
```
```

### 10. Git 图 (gitGraph)

**适用场景**：分支策略、版本管理、协作流程

**语法模板**：

```markdown
```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    branch feature
    checkout feature
    commit
    checkout develop
    merge feature
```
```

## 样式优化指南

### 配色方案（适配网站主题）

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#5f67ee', 'primaryTextColor': '#fff', 'primaryBorderColor': '#4f46a8', 'lineColor': '#5f67ee', 'secondaryColor': '#eef2ff', 'tertiaryColor': '#e0e7ff'}}}%%
flowchart TD
    A[主题色] --> B[浅色背景]
    A --> C[深色边框]
    B --> D[辅助色]
```

### 常用样式属性

```markdown
```mermaid
flowchart TD
    A[默认节点]
    B[自定义样式]
    C[结束节点]
    
    A --> B --> C
    
    style A fill:#5f67ee,stroke:#4f46a8,color:#fff,stroke-width:2px
    style B fill:#eef2ff,stroke:#5f67ee,color:#312e81,stroke-dasharray: 5 5
    style C fill:#312e81,stroke:#5f67ee,color:#fff,stroke-width:3px
```
```

**样式属性**：
- `fill`：填充颜色
- `stroke`：边框颜色
- `color`：文字颜色
- `stroke-width`：边框宽度
- `stroke-dasharray`：虚线样式

### 类定义样式

```markdown
```mermaid
flowchart TD
    A[节点A] --> B[节点B] --> C[节点C]
    
    classDef default fill:#5f67ee,stroke:#4f46a8,color:#fff
    classDef secondary fill:#eef2ff,stroke:#5f67ee,color:#312e81
    classDef highlight fill:#312e81,stroke:#5f67ee,color:#fff
    
    class A,B default
    class C highlight
```
```

## 使用场景示例

### 场景 1：系统架构图

```
用户: 帮我画一个微服务架构图

Claude: [生成架构图]

```mermaid
flowchart TB
    subgraph 接入层
        LB[负载均衡 Nginx]
        GW[API Gateway]
    end
    
    subgraph 服务层
        S1[用户服务]
        S2[订单服务]
        S3[库存服务]
    end
    
    subgraph 数据层
        DB1[(MySQL)]
        DB2[(Redis)]
        MQ[消息队列]
    end
    
    LB --> GW
    GW --> S1
    GW --> S2
    GW --> S3
    S1 --> DB1
    S2 --> DB2
    S2 --> MQ
    S3 --> MQ
```
```

### 场景 2：算法流程图

```
用户: 用流程图展示二分查找算法

Claude: [生成算法流程图]

```mermaid
flowchart TD
    Start([开始]) --> Init[初始化<br/>left=0, right=n-1]
    Init --> Loop{left <= right?}
    Loop -->|是| Calc[mid = left + right / 2]
    Calc --> Compare{arr[mid] == target?}
    Compare -->|是| Found[返回 mid]
    Compare -->|否| Compare2{arr[mid] < target?}
    Compare2 -->|是| UpdateLeft[left = mid + 1]
    Compare2 -->|否| UpdateRight[right = mid - 1]
    UpdateLeft --> Loop
    UpdateRight --> Loop
    Loop -->|否| NotFound[返回 -1]
    Found --> End([结束])
    NotFound --> End
```
```

### 场景 3：项目时间线

```
用户: 生成一个3个月的学习计划甘特图

Claude: [生成甘特图]

```mermaid
gantt
    title 90天学习计划
    dateFormat YYYY-MM-DD
    
    section 基础阶段
    环境搭建        :done, a1, 2026-02-20, 3d
    核心概念学习    :active, a2, after a1, 7d
    
    section 进阶阶段
    工具使用        :b1, after a2, 10d
    实战项目        :b2, after b1, 15d
    
    section 深入阶段
    源码分析        :c1, after b2, 20d
    性能优化        :c2, after c1, 15d
    
    section 总结阶段
    项目复盘        :d1, after c2, 10d
    知识输出        :d2, after d1, 10d
    里程碑          :milestone, after d2, 0d
```
```

## 最佳实践

1. **保持简洁** - 一个图表不要包含过多节点（建议 < 15 个）
2. **逻辑清晰** - 使用子图（subgraph）组织相关节点
3. **配色统一** - 使用网站主题色保持一致性
4. **添加注释** - 使用 Note 或注释说明关键逻辑
5. **响应式考虑** - 复杂图表使用 LR 方向避免过高

## 资源文件

此技能不包含捆绑资源文件。
