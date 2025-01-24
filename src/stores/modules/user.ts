/**
 * @description 用户信息仓库
 * @date 2025-01-21
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // Token管理
    const accessToken = ref('')
    const refreshToken = ref('')

    const tokenRemove = () => {
      accessToken.value = ''
      refreshToken.value = ''
    }

    return { accessToken, refreshToken, tokenRemove }
  },
  {
    persist: [
      {
        pick: ['accessToken', 'refreshToken'],
        storage: localStorage,
        key: 'token',
      },
      // {
      //   pick: ['age'],
      //   storage: sessionStorage,
      //   key: 'age',
      // },
    ],
  },
)
