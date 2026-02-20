import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { getSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: '认知提升计划',
  description: '每天学点新东西，用 AI 辅助归纳总结，持续提升认知边界',
  
  // 网站基础路径（GitHub Pages 部署时需要）
  base: '/100-Day-Cognitive-Improvement-Plan/',
  
  // 语言设置
  lang: 'zh-CN',
  
  // Markdown 配置
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
  },
  
  // 主题配置
  themeConfig: {
    // 网站 Logo
    logo: '/logo.svg',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '学习计划',
        items: [
          { text: 'Plan 1: 硬核开发者进阶', link: '/plan-1/' },
          // 未来可以在这里添加更多计划
          // { text: 'Plan 2: ...', link: '/plan-2/' },
        ]
      },
      { 
        text: '100天课程',
        link: '/plan-1/100-days-hardcore-dev-plan'
      },
      { 
        text: 'GitHub',
        link: 'https://github.com/your-username/100-Day-Cognitive-Improvement-Plan'
      }
    ],
    
    // 侧边栏 - 动态生成
    sidebar: {
      '/plan-1/': getSidebar('plan-1')
      // 未来可以在这里添加更多计划的侧边栏
      // '/plan-2/': getSidebar('plan-2')
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/100-Day-Cognitive-Improvement-Plan' }
    ],
    
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    
    // 页脚配置
    footer: {
      message: '用 ❤️ 和 AI 辅助学习',
      copyright: 'Copyright © 2026-present'
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/your-username/100-Day-Cognitive-Improvement-Plan/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    
    // 大纲配置
    outline: {
      label: '页面导航',
      level: [2, 4]
    },
    
    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 返回顶部
    returnToTopLabel: '回到顶部',
    
    // 侧边栏菜单
    sidebarMenuLabel: '菜单',
    
    // 深色模式
    darkModeSwitchLabel: '主题',
    
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },
  
  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/100-Day-Cognitive-Improvement-Plan/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: '认知提升计划' }],
  ],
  
  // 最后更新时间
  lastUpdated: true,
  
  // 清理 URL
  cleanUrls: true,
  
  // 生成 sitemap
  sitemap: {
    hostname: 'https://your-username.github.io/100-Day-Cognitive-Improvement-Plan/'
  },

  // Mermaid 插件配置
  mermaidPlugin: {
    startOnLoad: false
  },

  // Mermaid 图表配置
  mermaid: {
    theme: 'base',
    themeVariables: {
      // 深色模式配色
      dark: {
        primaryColor: '#3f3a8c',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#5f67ee',
        lineColor: '#5f67ee',
        secondaryColor: '#2d2a6a',
        tertiaryColor: '#25234a',
        background: '#161618',
        mainBkg: '#1e1b4b',
        nodeBorder: '#5f67ee',
        clusterBkg: '#25234a',
        clusterBorder: '#5f67ee',
        titleColor: '#ffffff',
        edgeLabelBackground: '#1e1b4b',
        nodeTextColor: '#ffffff',
        // 不同节点类型的颜色
        cScale0: '#3f3a8c',
        cScale1: '#4f46a8',
        cScale2: '#5f67ee',
      },
      // 浅色模式配色
      light: {
        primaryColor: '#eef2ff',
        primaryTextColor: '#312e81',
        primaryBorderColor: '#5f67ee',
        lineColor: '#5f67ee',
        secondaryColor: '#e0e7ff',
        tertiaryColor: '#f5f3ff',
        background: '#ffffff',
        mainBkg: '#eef2ff',
        nodeBorder: '#5f67ee',
        clusterBkg: '#f5f3ff',
        clusterBorder: '#5f67ee',
        titleColor: '#312e81',
        edgeLabelBackground: '#eef2ff',
        nodeTextColor: '#312e81',
        // 不同节点类型的颜色
        cScale0: '#eef2ff',
        cScale1: '#e0e7ff',
        cScale2: '#c7d2fe',
      }
    },
    // 流程图配置
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis',
      padding: 15
    },
    // 序列图配置
    sequence: {
      useMaxWidth: true,
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      rightAngles: false,
      showSequenceNumbers: false
    },
    // Gantt 图配置
    gantt: {
      useMaxWidth: true,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d'
    }
  },

  vite: {
    build: {
      cssCodeSplit: false
    }
  }
})
