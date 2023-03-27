/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-26 11:19:53
 * @FilePath: /MaaS_Integration_Hub/mock/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Mock = require("mockjs");

const NameList = [];
const count = 100;

for (let i = 0; i < count; i++) {
  NameList.push(
    Mock.mock({
      name: "@first1",
    })
  );
}
NameList.push({ name: "mock-Pan1" });

module.exports = [
  // application list
  {
    url: "/vue-element-admin/application/list",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 4,
          "list|4": [
            {
              name: "数据连接",
              desc: "new_test",
              date: "2023-03-24 10:23:00",
              projectName: "基础项目",
              "status|1": ["success", "pending"],
            },
          ],
        },
      };
    },
  },
];
