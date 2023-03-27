<template>
  <div class="user-activity">
    <div class="header_bg">
      <div class="header_top">
        <div class="banner_p">{{ $t("home.title") }}</div>
        <div class="banner_span">{{ $t("home.secTitle") }}</div>
      </div>
      <div class="header_item">
        <img
          class="image_banner1"
          src="../../../assets/home/home_2.jpg"
          fit="fit"
        >

        <img
          class="image_banner1"
          src="../../../assets/home/home_1.jpg"
          fit="fit"
          @click="newAdd"
        >
      </div>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import { applicationNew } from '@/api/remote-search'

export default {
  components: {},
  data() {
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      appList: []
    }
  },
  methods: {

    newAdd() {
      this.$prompt('应用名称', '创建空白应用', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入应用名称'
      })
        .then(({ value }) => {
          if (!value || value.length <= 0) {
            this.$message.error('请输入应用名称')

            return
          }

          applicationNew({ name: value }).then((response) => {
            this.$message.success('新增成功')
            this.$router.push({
              path: '/flowDesign'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .header_bg {
    width: 100%;
    // height: 300px;
    padding-top: 5%;
    padding-left: 2%;
    padding-bottom: 5%;
    background: url("../../../assets/home/home_bg.png") 0/100% no-repeat;
    .header_top {
      .banner_p {
        font-size: 28px;
        font-weight: 500;
        line-height: 40px;
      }

      .banner_span {
        font-size: 18px;
        line-height: 28px;
        color: #666;
        margin-top: 8px;
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
  .user-block {
    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;
    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {
      &:hover,
      &:focus {
        color: #999;
      }
    }
  }
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
