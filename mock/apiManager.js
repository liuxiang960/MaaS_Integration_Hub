/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 15:10:59
 * @FilePath: /MaaS_Integration_Hub/mock/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Mock = require("mockjs");

const RunningLog = require("./data/runningLog");
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
            id: "@integer(1, 3)",
            startTime: "@date",
            content: "@first",
            type: "warn",
            endTime: "@date",
            "duration|1": ["10s", "20s", "30s", "35s"],
            version: "@integer(1, 3)",

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
    response: (params) => {
      let List = RunningLog.returnData;
      let startNum = (params.query.pageNum - 1) * params.query.pageSize;
      let endNum = params.query.pageNum * params.query.pageSize;
      let max = List.length;
      List = List.slice(startNum, endNum);

      console.log(List);

      return {
        code: 20000,
        data: {
          list: List,
          total: max,
        },
      };
    },
  },

  {
    url: "/vue-element-admin/operation/history",
    type: "get",
    response: () => {
      const List = [];
      const count = 8;

      for (let i = 0; i < count; i++) {
        List.push(
          Mock.mock({
            id: "@integer(1, 3)",
            startTime: "@date",
            content: "@first",
            type: "warn",

            "leve|1": ["1", "2", "3", "4"],

            endTime: "@date",
            "duration|1": ["10s", "20s", "30s", "35s"],
            version: "@integer(1, 3)",

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
];
