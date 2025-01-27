/**
 * @description 个性化组件传参类型
 */

// 导航项类型
export type NavItemType = {
  id: number
  text: string //内容
  to: string //跳转url
  params?: unknown[] //路由传参
}
