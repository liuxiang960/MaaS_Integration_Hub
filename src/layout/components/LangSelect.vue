<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 16:32:03
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-24 16:40:13
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/components/LangSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        command="zh"
        :disabled="language === 'zh'"
      >中文</el-dropdown-item>
      <el-dropdown-item
        command="en"
        :disabled="language === 'en'"
      >English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LangSelect',
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message.success('switch language success')
      // 重新刷新页面更改语言
      location.reload()
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>
