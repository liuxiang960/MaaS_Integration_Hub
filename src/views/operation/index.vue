<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-26 14:40:58
 * @FilePath: /MaaS_Integration_Hub/src/views/home/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="22" :xs="24">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="监控概述" name="opt1">
            <el-card>
              <tab-list />
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="错误管理" name="opt2">
            <el-card>
              <tab-list1 />
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="投递管理" name="opt3">
            <el-card>
              <tab-list2 />
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6" :xs="24">
        <user-card :user="user" />
        <timeline />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TabList from './components/TabList'
import TabList1 from './components/TabList1'
import TabList2 from './components/TabList2'

export default {
  name: 'Application',
  components: {
    TabList,
    TabList1,
    TabList2
  },
  data() {
    return {
      user: {},
      activeTab: 'opt1'
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>
