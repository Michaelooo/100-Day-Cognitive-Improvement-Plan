import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'

// 导入自定义样式
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 可以在这里添加自定义插槽
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 可以在这里注册全局组件或添加自定义功能
  }
} satisfies Theme
