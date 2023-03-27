<!--
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-27 07:25:00
 * @FilePath: /MaaS_Integration_Hub/src/views/home/components/UserCard.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="card_bg app-eis-card">
    <div class="app-eis-card__body">
      <div class="app-eis-card__title">
        <div class="app-eis-justify-grid">
          <div
            class="app-eis-justify-grid__col app-eis-justify-grid__col--left"
          >
            <h3 class="app-eis-h3">数据概览</h3>
          </div>
        </div>
      </div>
      <div class="app-eis-card__content">
        <div class="home-data__con">
          <div class="home-data__item running">
            <div class="home-data__item--num">
              <span class="app-eis-text-primary">0</span> /
              {{ this.appList.length }}
            </div>
            <div class="home-data__item--tit">运行中应用数 / 应用总数</div>
          </div>
          <div class="home-data__item failed">
            <div class="home-data__item--num">
              <span class="app-eis-text-danger">0</span> / 0
            </div>
            <div class="home-data__item--tit">运行失败次数 / 运行总次数</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookies = require('js-cookie')
export default {
  name: 'CardTitle',
  data() {
    return {
      like: true,
      value1: 4154.564,
      value2: 2222,
      title: '今年的增长',
      appList: []
    }
  },
  mounted() {
    this.flashData()
  },
  methods: {
    flashData() {
      this.appList = JSON.parse(Cookies.get('application')) || []
    }
  }
}
</script>
<style lang="scss">
.card_bg {
  .app-eis-card {
    background-color: #fff;

    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    border-radius: 8px;
    color: #333;
  }
  .app-eis-card__title .app-eis-h3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    color: #333;
  }
  .home-data__item + .home-data__item:before {
    content: "";
    background: #e9ecef;
    width: 1px;
    left: 0;
    top: 2px;
    height: calc(100% - 4px);
    position: absolute;
  }

  .app-eis-card__content {
    .home-data__con {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    .home-data__item {
      text-align: center;
      flex: 1;
      padding: 0 32px;
      position: relative;

      .page-home .home-data__item--num {
        font-size: 28px;
        font-weight: 500;
        line-height: 36px;
        color: #333;
      }

      .app-eis-text-primary {
        color: #3c58db !important;
      }
      .home-data__item--tit {
        line-height: 26px;
        color: #666;
        font-size: 16px;
        font-weight: 400;
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .home-data__item--num {
        font-size: 28px;
        font-weight: 500;
        line-height: 36px;
        color: #333;
      }
    }

    .app-eis-text-danger {
      color: #f45c5c !important;
    }
  }
}
</style>
