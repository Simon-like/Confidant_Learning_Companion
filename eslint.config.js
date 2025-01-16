import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",//允许ts使用any类型
      "@typescript-eslint/no-unsafe-function-type": "off",//允许使用Function类型
      "no-unused-expressions": "on",//允许使用未使用的表达式
      "@typescript-eslint/no-unused-expressions": "off",//允许使用未使用的表达式
    }
  }
]
