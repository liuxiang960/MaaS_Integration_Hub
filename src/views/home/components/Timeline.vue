<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-25 23:56:47
 * @FilePath: /MaaS_Integration_Hub/src/views/home/components/Timeline.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card style="margin-bottom: 20px; margin-top: 40px">
    <div slot="header" class="clearfix">
      <span class="title_p">产品动态</span>
    </div>

    <div class="block">
      <el-timeline style="padding-left: 0px">
        <el-timeline-item
          v-for="(item, index) of timeline"
          :key="index"
          :timestamp="item.timestamp"
          placement="top"
        >
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2023/3/24',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2023/3/24 20:46'
        },
        {
          timestamp: '2023/3/22',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2023/3/22 21:46'
        },
        {
          timestamp: '2023/3/21',
          title: 'Build Template',
          content: 'PanJiaChen committed 2023/3/21 22:46'
        },
        {
          timestamp: '2023/3/20',
          title: 'Release New Version',
          content: 'PanJiaChen committed 2023/3/20 20:26'
        }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
@import url("./common.scss")
</style>
