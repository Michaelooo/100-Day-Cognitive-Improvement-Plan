import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 解析 Markdown 文件中的标题
 */
function getMarkdownTitle(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // 匹配第一个 # 开头的标题
    const match = content.match(/^#\s+(.+)$/m)
    if (match) {
      // 移除可能的日期前缀（如 "2026-02-20-"）
      let title = match[1].trim()
      // 如果标题包含日期格式的前缀，尝试提取更有意义的名称
      title = title.replace(/^\d{4}-\d{2}-\d{2}[-\s]*/, '')
      title = title.replace(/^\d{2}-\d{2}-\d{2}[-\s]*/, '')
      return title
    }
  } catch (e) {
    // 读取失败时使用文件名
  }
  return path.basename(filePath, '.md')
}

/**
 * 从文件名中提取日期
 */
function extractDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  // 处理简写日期格式 26-02-12
  const shortMatch = filename.match(/^(\d{2})-(\d{2})-(\d{2})/)
  if (shortMatch) {
    return `20${shortMatch[1]}-${shortMatch[2]}-${shortMatch[3]}`
  }
  return ''
}

/**
 * 根据日期解析 Day 编号
 */
function getDayNumber(filename: string, allFiles: string[]): number {
  const date = extractDateFromFilename(filename)
  if (!date) return 999
  
  // 提取所有文件的日期并排序
  const dates = allFiles
    .map(f => extractDateFromFilename(f))
    .filter(d => d)
    .sort()
  
  // 找到当前文件在排序后的位置
  const index = dates.indexOf(date)
  return index >= 0 ? index + 1 : 999
}

/**
 * 为指定计划生成侧边栏配置
 */
export function getSidebar(planName: string) {
  const docsPath = path.resolve(__dirname, '..')
  const planPath = path.join(docsPath, planName)
  
  if (!fs.existsSync(planPath)) {
    return []
  }
  
  // 读取所有 markdown 文件
  const files = fs.readdirSync(planPath)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort()
  
  // 按学习阶段对文件进行分组
  const stages = [
    { name: '第一阶段：开发工具链与效率', days: [1, 10] },
    { name: '第二阶段：系统与底层', days: [11, 25] },
    { name: '第三阶段：编程语言深度', days: [26, 40] },
    { name: '第四阶段：架构与设计', days: [41, 55] },
    { name: '第五阶段：安全与逆向', days: [56, 65] },
    { name: '第六阶段：AI 时代开发', days: [66, 80] },
    { name: '第七阶段：前沿技术', days: [81, 90] },
    { name: '第八阶段：综合实战', days: [91, 100] },
  ]
  
  const sidebar: any[] = []
  
  // 1. 添加概览链接
  const indexPath = path.join(planPath, 'index.md')
  if (fs.existsSync(indexPath)) {
    sidebar.push({
      text: '📋 计划概览',
      link: `/${planName}/`
    })
  }
  
  // 2. 添加完整课程大纲
  const curriculumPath = path.join(planPath, '100-days-hardcore-dev-plan.md')
  if (fs.existsSync(curriculumPath)) {
    sidebar.push({
      text: '📚 完整课程大纲',
      link: `/${planName}/100-days-hardcore-dev-plan`
    })
  }
  
  // 3. 按阶段组织学习笔记
  const stageGroups = new Map<string, any[]>()
  
  files.forEach(file => {
    if (file === '100-days-hardcore-dev-plan.md') return
    
    const dayNum = getDayNumber(file, files)
    const title = getMarkdownTitle(path.join(planPath, file))
    const link = `/${planName}/${file.replace('.md', '')}`
    
    // 确定所属阶段
    let stage = stages.find(s => dayNum >= s.days[0] && dayNum <= s.days[1])
    if (!stage) stage = { name: '其他', days: [0, 0] }
    
    if (!stageGroups.has(stage.name)) {
      stageGroups.set(stage.name, [])
    }
    
    stageGroups.get(stage.name)!.push({
      text: `Day ${dayNum}: ${title}`,
      link,
      day: dayNum
    })
  })
  
  // 将阶段组添加到侧边栏
  stages.forEach(stage => {
    const items = stageGroups.get(stage.name)
    if (items && items.length > 0) {
      // 按 Day 排序
      items.sort((a, b) => a.day - b.day)
      
      sidebar.push({
        text: stage.name,
        collapsed: true,
        items
      })
    }
  })
  
  // 添加其他未分类的
  const others = stageGroups.get('其他')
  if (others && others.length > 0) {
    sidebar.push({
      text: '📝 其他笔记',
      collapsed: false,
      items: others
    })
  }
  
  return sidebar
}
