<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 10:20:48
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24" :xs="24">
        <activity />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Activity from "./components/Activity";

export default {
  name: "Home",
  components: {
    Activity,
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
