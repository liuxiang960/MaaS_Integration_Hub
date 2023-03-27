<template>
  <el-card style="margin-bottom: 20px; margin-top: 40px">
    <div slot="header" class="clearfix">
      <span class="title_p">环境管理</span>
    </div>

    <div class="user-bio" style="margin-top: 0">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" /><span>试用环境</span>

          <span style="float: right; color: #1890ff">立即购买</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">2023-04-23 12:20:31 到期</div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" /><span>详情</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>环境类型</span>

            <span
              style="float: right; color: #000; font-weight: 500"
            >共享环境</span>
          </div>

          <div class="progress-item" style="height: 40px; line-height: 40px">
            <span>可运行集成流数 </span>

            <span
              style="float: right; color: #000; font-weight: 500"
            >0/20个
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./common.scss");
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.progress-item {
  height: 40px;
  line-height: 40px;
}
</style>
