<template>
  <div class="header_bg">
    <div class="header_top">
      <div class="banner_p">{{ $t("home.title") }}</div>
      <div class="banner_span">{{ $t("home.secTitle") }}</div>
    </div>
  </div>
</template>

<script>
const avatarPrefix = "?imageView2/1/w/80/h/80";
const carouselPrefix = "?imageView2/2/h/440";
import { applicationNew } from "@/api/remote-search";

export default {
  components: {},
  data() {
    return {
      carouselImages: [
        "https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg",
        "https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg",
        "https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg",
        "https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg",
      ],
      avatarPrefix,
      carouselPrefix,
      appList: [],
    };
  },
  methods: {
    newAdd() {
      this.$prompt("应用名称", "创建空白应用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入应用名称",
      })
        .then(({ value }) => {
          if (!value || value.length <= 0) {
            this.$message.error(this.$t("app_1001"));

            return;
          }

          applicationNew({ name: value }).then((response) => {
            this.$message.success("新增成功");
            this.$router.push({
              path: "/flowDesign",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header_bg {
  width: 100%;
  height: 98vh;
  position: relative;
  // padding-top: 5%;
  // padding-left: 2%;
  // padding-bottom: 5%;
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
