<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 16:32:03
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-30 21:45:20
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/components/LangSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-button
      type="text"
      class="btn ant-btn-primary"
      @click="handleSetLanguage()"
      >{{ language == "zh" ? "切换语言" : "Change Language" }}（{{
        language
      }}）</el-button
    >
  </div>
</template>

<script>
export default {
  name: "LangSelect",
  computed: {
    language() {
      return this.$store.getters.language;
    },
  },
  methods: {
    handleSetLanguage(lang) {
      if (this.language === "zh") {
        lang = "en";
      } else {
        lang = "zh";
      }
      this.$i18n.locale = lang;
      this.$store.dispatch("app/setLanguage", lang);
      this.$message.success("switch language success");
      // 重新刷新页面更改语言
      location.reload();
    },
  },
};
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
.ant-btn-primary {
  padding: 10px 15px;
  color: #fff !important;
  border-color: #2870fa !important;
  background: #2870fa !important;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}
.btn {
  margin-right: 30px;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
}
</style>
