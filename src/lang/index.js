/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 16:15:30
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 02:06:52
 * @FilePath: /MaaS_Integration_Hub/src/lang/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 进行多语言支持配置
import Vue from "vue" // 引入Vue
import VueI18n from "vue-i18n" // 引入国际化的插件包
import Cookies from "js-cookie" // 引入 Cookies 保存当前默认语言选项

import elementEnLocale from "element-ui/lib/locale/lang/en" // element-ui 英文包
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN" // element-ui 中文包

// 自定义的中英文配置
import enLocale from "./en"
import zhLocale from "./zh"

Vue.use(VueI18n) // 全局注册国际化包

// 创建国际化插件的实例
const i18n = new VueI18n({
  // 指定语言类型 zh表示中文  en表示英文 set locale 设置默认初始化的语言 i18n
  locale: Cookies.get("language") || "en",
  // 将将elementUI语言包 和自定义语言包 加入到插件语言数据里 set locale messages
  messages: {
    // 英文环境下的语言数据
    en: {
      ...enLocale,
      ...elementEnLocale
    },
    // 中文环境下的语言数据
    zh: {
      ...zhLocale,
      ...elementZhLocale
    }
  }
})

export default i18n
