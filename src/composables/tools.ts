/**
 * @description 通用工具函数
 * @author Simon
 * @date 2025-1-16
 * @lastModifiedBy Simon
 * @lastModifiedTime 2025-1-16
 */
export const clearInput = () => {
  /**
   * @description // 消除浏览器输入框自带的记忆功能
   */
  const inputEl = document.getElementsByTagName('input')

  for (let i = 0; i < inputEl.length; ++i) {
    const inputNode = inputEl[i]
    inputNode.setAttribute('aria-autocomplete', 'none')
  }
}

// 防抖函数
export const debounce = (fn: Function, ms: number, Immediate: boolean = false) => {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function but received: ' + typeof fn)
  }
  // Immediate选择是否立即执行
  let timer: any = null
  return function (this: unknown, ...theArgs: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    if (Immediate) {
      const flag = !timer
      flag && fn.apply(this, theArgs)
      timer = setTimeout(() => {
        timer = null
      }, ms)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, theArgs)
        timer = null
      }, ms)
    }
  }
}

// 深拷贝
export const deepCopy = (obj: object) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 数组数据交换/覆盖，可触发动画
 * @param A 待覆盖数组
 * @param B 覆盖者or被交换者
 * @param isSwap 是否交换，否则B覆盖A
 */
export const ArrayCover = <T>(A: T[], B: T[], isSwap: boolean = false) => {
  const temp: T[] = A
  while (A.length > 0) A.pop() //逐个删除，触发动画
  B.forEach((item) => A.push(item))
  if (isSwap) {
    while (B.length > 0) B.pop() //逐个删除，触发动画
    A.forEach((item) => B.push(item))
  }
}
