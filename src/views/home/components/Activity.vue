<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-04-04 10:16:45
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 10:21:10
 * @FilePath: /MaaS_Integration_Hub/src/views/home/components/Activity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="header_bg">
    <div class="header_top">
      <div class="banner_p">{{ $t("home.title") }}</div>
      <div class="banner_span">{{ $t("home.secTitle") }}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header_bg {
  width: 100%;
  height: 98vh;
  position: relative;

  background: url("../../../assets/home/home_bg_top.png") no-repeat;
  background-size: cover;
  .header_top {
    position: absolute;
    margin-top: 10%;
    margin-left: 5%;
    .banner_p {
      height: 64px;
      font-size: 48px;
      font-family: MicrosoftYaHeiSemibold;
      color: #0e253a;
      line-height: 64px;
    }

    .banner_span {
      margin-top: 30px;
      height: 48px;
      font-size: 36px;
      font-family: MicrosoftYaHeiSemilight;
      color: #444e57;
      line-height: 48px;
    }
  }

  .header_item {
    display: flex;
    width: 65%;
    margin-top: 30px;

    justify-content: space-around;
    .image_banner1 {
      width: 280px;
      margin-left: 20px;
    }
  }
}
</style>
