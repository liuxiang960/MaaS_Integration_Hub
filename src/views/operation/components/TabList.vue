<template>
  <div class="sdm-bg">
    <div class="sdm-bg-sty sdm-bg-data">
      <div class="sdm-bg-title-btn">
        <div>
          <el-col :span="24" :xs="24" style="margin-bottom: 20px">
            <el-filter
              :data="filterInfo.data"
              :field-list="filterInfo.fieldList"
              :list-type-info="listTypeInfo"
              :fold-btn-hidden="btnHidde"
              @handleFilter="handleFilter"
              @handleReset="handleReset"
              @handleEvent="handleEvent"
            />
          </el-col>
        </div>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="100"
          :index="(i) => (currentPage - 1) * pageSize + i + 1"
        />
        <!-- index 第二页的序号累计在第一页的基础上-->

        <el-table-column prop="desc" label="概述" />
        <el-table-column prop="name" label="应用名称" />
        <el-table-column prop="version" label="应用版本" />
        <el-table-column prop="env" label="环境" />
        <el-table-column prop="date" label="创建时间" />
        <el-table-column prop="integration" label="集成流" />
      </el-table>
      <pagination
        :page="currentPage"
        :limit="pageSize"
        :total="total"
        @pagination="pagination"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
import { applcationList } from '@/api/application'
export default {
  name: 'Index',
  components: { Pagination },
  data() {
    var validator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(rule.message2))
      } else if (value.toString().trim() === '') {
        callback('不能全为空格')
      } else {
        callback()
      }
    }
    return {
      btnHidde: true,
      filterInfo: {
        // 搜索字段
        data: {
          name: null,
          age: null,
          count: 1,
          sex: 1,
          date: null,
          dateTime: null,
          range: null
        },
        // 条件配置项
        fieldList: [
          {
            label: '应用名称',
            type: 'select',
            value: 'appName',
            list: 'appList'
          },
          {
            label: '应用版本',
            type: 'select',
            value: 'appVersion',
            list: 'appVersionList'
          },

          {
            label: '选择流',
            type: 'select',
            value: 'liu',
            list: 'liuList'
          },

          {
            label: '发布环境',
            type: 'select',
            value: 'env',
            list: 'envList'
          },
          {
            label: '时间段',
            type: 'date',
            value: 'range',
            dateType: 'daterange'
          }
        ]
      },
      listTypeInfo: {
        appList: [
          {
            id: 1,
            name: 'test'
          },
          {
            id: 2,
            name: 'test1'
          }
        ],
        appVersionList: [
          {
            id: 1,
            name: '1.0.0'
          },
          {
            id: 2,
            name: '1.0.1'
          }
        ],
        envList: [],
        liuList: []
      },

      title: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      id: -1,
      ruleForm: {
        name: '',
        desc: '',
        code: ''
      },
      loading: false
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    /** 搜索 */
    handleFilter(row) {
      console.log(row)
    },
    /** 重置 */
    handleReset(row) {
      console.log(row)
    },
    /** 焦点失去事件 */
    handleEvent(row) {
      console.log(row)
    },
    initPage() {
      this.loading = true

      applcationList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      })
        .then((res) => {
          this.loading = false
          const { code, message, data, total } = res || {}
          if (code === 20000) {
            this.tableData = data.list
            this.total = data.total
          } else {
            this.$message.error(message)
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    refreshList() {
      this.initPage()
    },
    add() {
      this.$api.DS.addDataSetType(this.ruleForm)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.message)
            this.handleClose()
            this.currentPage = 1
            this.initPage()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          // this.$message.error(err.message)
          console.log(err)
        })
    },
    update() {
      this.$api.DS.editDataSetType({
        id: this.id,
        ...this.ruleForm
      })
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.message)
            this.handleClose()
            // this.currentPage = 1
            this.initPage()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          // this.$message.error(err.message)
          console.log(err)
        })
    },
    handleEdit(row) {
      this.id = row.id
      var { name, desc, code } = row
      Object.assign(this.ruleForm, { name, desc, code })
      this.dialogVisible = true
    },
    handleDel(row) {
      // 删除
      // const content = row.locked === 0 ? '确定要锁定吗?' : '确定要解锁吗?'
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete(`web/dataSetType/delete?id=${row.id}`)
            .then((res) => {
              const { status, message } = res.data || {}
              if (status === 200) {
                this.initPage()
                this.$message({
                  type: 'success',
                  message: message
                })
              } else {
                this.$message.error(message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: err
          })
        })
    },
    handlelock(row) {
      const content = row.locked === 0 ? '确定要锁定吗?' : '确定要解锁吗?'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get(`web/tenant/${row.locked == 0 ? 'lock' : 'unlock'}/${row.id}`)
            .then((res) => {
              const { status, message } = res.data || {}
              if (status === 200) {
                this.initPage()
                this.$message({
                  type: 'success',
                  message: message
                })
              } else {
                this.$message.error(message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: err
          })
        })
    },
    handleClose() {
      this.resetForm()
      this.dialogVisible = false
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {
        name: '',
        desc: '',
        code: ''
      }
    },
    save() {
      // 提交
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.id === -1) {
            this.add()
          } else {
            this.update()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDisabled(row) {
      const content = row.disabled === 0 ? '确定要关闭吗?' : '确定要开启吗?'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get(`web/tenant/${row.disabled == 0 ? 'close' : 'open'}/${row.id}`)
            .then((res) => {
              const { status, message } = res.data || {}
              if (status === 200) {
                this.initPage()
                this.$message({
                  type: 'success',
                  message: message
                })
              } else {
                this.$message.error(message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: err
          })
        })
    },
    pagination(val) {
      this.pageSize = val.limit
      this.currentPage = val.page
      this.initPage()
    },
    resetTitle() {
      this.title = ''
      this.initPage()
    }
  }
}
</script>

<style scoped></style>
