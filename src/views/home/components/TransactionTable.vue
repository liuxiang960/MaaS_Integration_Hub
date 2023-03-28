<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-25 22:23:16
 * @FilePath: /MaaS_Integration_Hub/src/views/home/components/TransactionTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h3 class="app-eis-h3">应用列表</h3>
    <el-table :data="list" style="width: 100%; padding-top: 15px">
      <el-table-column :label="$t('appName')" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所属项目" width="195" align="center">
        <template slot-scope="scope"> {{ scope.row.projectName }} </template>
      </el-table-column>
      <el-table-column label="更新时间" width="195" align="center">
        <template slot-scope="scope"> {{ scope.row.date }} </template>
      </el-table-column>
      <el-table-column label="运行/调试版本" width="100" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { transactionList } from "@/api/remote-search";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      transactionList().then((response) => {
        this.list = response.data.items.slice(0, 8);
      });
    },
  },
};
</script>

<style scoped>
.app-eis-h3 {
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: #333;
}
</style>
>
