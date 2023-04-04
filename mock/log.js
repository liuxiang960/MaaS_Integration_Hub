/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 13:53:05
 * @FilePath: /MaaS_Integration_Hub/mock/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const dayManager = require("./data/dayRecordManage");
const count = 8;

module.exports = [
  {
    url: "/vue-element-admin/log/new",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: true,
      };
    },
  },
  {
    url: "/vue-element-admin/log/list",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: { data: dayManager.returnData },
        total: count,
      };
    },
  },
  {
    url: "/vue-element-admin/log/deleted",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },
];
