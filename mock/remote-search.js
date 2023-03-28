/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 14:01:14
 * @FilePath: /MaaS_Integration_Hub/mock/remote-search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Mock = require("mockjs");
const Cookies = require("js-cookie");
const NameList = [];
const count = 100;

for (let i = 0; i < count; i++) {
  NameList.push(
    Mock.mock({
      name: "@first",
    })
  );
}
NameList.push({ name: "mock-Pan" });

module.exports = [
  // username search
  {
    url: "/vue-element-admin/search/user",
    type: "get",
    response: (config) => {
      const { name } = config.query;
      const mockNameList = NameList.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0);
      });
      return {
        code: 20000,
        data: { items: mockNameList },
      };
    },
  },

  // transaction list
  {
    url: "/vue-element-admin/transaction/list",
    type: "get",
    response: (_) => {
      return {
        code: 20000,
        data: {
          total: 20,
          "items|4": [
            {
              name: "数据连接",
              date: "2023-03-24 10:23:00",
              projectName: "基础项目",
              "status|1": ["success", "pending"],
            },
          ],
        },
      };
    },
  },

  {
    url: "/vue-element-admin/application/new",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: true,
      };
    },
  },
];
