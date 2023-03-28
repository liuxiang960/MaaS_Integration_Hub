/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-28 09:36:47
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
  {
    url: "/vue-element-admin/apiManager/new",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: true,
      };
    },
  },
  {
    url: "/vue-element-admin/apiManager/list",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },
  {
    url: "/vue-element-admin/apiManager/deleted",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },

  {
    url: "/vue-element-admin/apiServe/new",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: true,
      };
    },
  },
  {
    url: "/vue-element-admin/apiServe/list",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },
  {
    url: "/vue-element-admin/apiServe/deleted",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },
  {
    url: "/vue-element-admin/certificate/new",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },
  {
    url: "/vue-element-admin/certificate/deleted",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: { data: [] },
      };
    },
  },
  {
    url: "/vue-element-admin/certificateTest/list",
    type: "get",
    response: () => {
      const List = [];
      const count = 3;

      for (let i = 0; i < count; i++) {
        List.push(
          Mock.mock({
            id: "@increment",
            date: +Mock.Random.date("T"),
            authentication: "@first",
            name: "@first",
            importance: "@integer(1, 3)",
            "type|1": ["CN", "US", "JP", "EU"],
            "status|1": ["success", "padding"],
          })
        );
      }
      return {
        code: 20000,
        data: {
          list: List,
        },
      };
    },
  },
  {
    url: "/vue-element-admin/operationTest/list",
    type: "get",
    response: () => {
      const List = [];
      const count = 3;

      for (let i = 0; i < count; i++) {
        List.push(
          Mock.mock({
            id: "@increment",
            date: "@date",
            description: "@first",
            authentication: "@first",
            name: "@first",
            env: "体验环境",
            version: "@integer(1, 3)",
            integration: "@first",
            importance: "@integer(1, 3)",
            "type|1": ["CN", "US", "JP", "EU"],
            "status|1": ["success", "padding"],
          })
        );
      }
      return {
        code: 20000,
        data: {
          list: List,
        },
      };
    },
  },

  {
    url: "/vue-element-admin/operationDay/list",
    type: "get",
    response: () => {
      const List = [];
      const count = 3;

      for (let i = 0; i < count; i++) {
        List.push(
          Mock.mock({
            id: "@increment",
            date: "@date",
            description: "@first",
            authentication: "@first",
            operationName: "@first",
            compone: "@first",
            logLeve: "@integer(1, 3)",
            leve: "@integer(1, 3)",
            policy: "@first",
            content: "@first",
            duration: "@integer(1, 3)",
            endTime: "@date",
            startTime: "@date",
            name: "@first",
            env: "体验环境",
            type: "警告",
            version: "@integer(1, 3)",
            integration: "@first",
            "category|1": ["ERROR", "INFO", "WARN"],
            "status|1": ["success", "padding"],
          })
        );
      }
      return {
        code: 20000,
        data: {
          list: List,
        },
      };
    },
  },
];
