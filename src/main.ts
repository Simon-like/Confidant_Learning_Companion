import { createApp } from 'vue'
import pinia from './stores'
import '@/assets/index.css'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
//整体导入 ElementPlus 组件库
import ElementPlus from 'element-plus' //导入 ElementPlus 组件库的所有模块和功能
import 'element-plus/dist/index.css' //导入 ElementPlus 组件库所需的全局 css 样式

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
