# Confidant_Learning_Companion

**“知己学伴”学习陪伴软件产品网页端**

目前支持用户登陆注册、番茄钟工作学习，后续将继续开发用户信息管理、AIChat对话帮助、学习陪伴数字人开发。在基础功能完善的情况下，我们会进一步推进整个学习博客社区的搭建，并推出安卓移动端以及windows桌面端应用。

### 技术选型

| 技术        | 说明           | 官网                                     |
| ----------- | -------------- | ---------------------------------------- |
| Vue3        | 前端框架       | https://cn.vuejs.org/                    |
| Vue-Router  | 前端路由       | https://router.vuejs.org/zh/             |
| Pinia       | 状态管理库     | https://pinia.vuejs.org/zh/              |
| Vite        | 构建工具       | https://vitejs.cn/vite3-cn/guide/        |
| Typescript  | 类型约束       | https://www.typescriptlang.org/zh/docs/  |
| Shadcn      | 组件库         | https://www.shadcn-vue.com/              |
| Prettier    | 代码风格       | https://www.prettier.cn/                 |
| Eslint      | 代码质量检查   | https://eslint.org/                      |
| tailwindcss | 样式布局方案   | https://tailwindcss.com/                 |
| axios       | 前后端通讯工具 | https://axios-http.com/                  |
| echarts     | 统计图表库     | https://echarts.apache.org/zh/index.html |

### 主要项目结构

```markdown
├─public：公共资源文件夹
├─src：源代码文件夹
│ ├─assets：静态资源
│ ├─components：vue组件文件夹
│ ├─views：页面视图文件夹
│ ├─router：路由配置文件夹
│ ├─stores：pinia状态管理文件夹
│ ├─router：路由配置文件夹
│ ├─apis：存放API请求或与后端交互的逻辑
│ ├─types：存放对象类型
│ ├─composables：存放hook
│ ├─main.js：项目入口文件
│ └─App.vue：根组件
├─package.json：项目配置文件
├─.env：环境变量管理文件,分生产、开发、测试三个环境
├─index.html：HTML入口文件
├─tailwind.config.js：tailwindcss配置文件
├─postcss.config.js：postcss配置文件
├─tsconfig.json：TypeScript配置文件
└─vite.config.js：Vite配置文件
```
