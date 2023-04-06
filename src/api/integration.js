/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 18:14:27
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import { removeListItem } from "@/utils/index";
const APISTR = "integration";
export function integrationNew(query) {
  let list = [];
  if (localStorage.getItem(APISTR)) {
    list = JSON.parse(localStorage.getItem(APISTR)) || [];
  }
  if (query.id) {
    list = removeListItem(list, query.id, query);
  } else {
    let dt = { id: Math.floor(Math.random() * 100000 + 1) };
    dt = Object.assign(query, dt);
    list.unshift(dt);
  }

  localStorage.setItem(APISTR, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/integration/new",
    method: "post",
    params: query,
  });
}

export function integrationDeletd(query) {
  let list = [];
  if (localStorage.getItem(APISTR)) {
    list = JSON.parse(localStorage.getItem(APISTR)) || [];
    list = removeListItem(list, query.id);
  }
  localStorage.setItem(APISTR, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/integration/deleted",
    method: "post",
    params: query,
  });
}

export function integrationList(query) {
  return new Promise((resolve, reject) => {
    let list = [];
    const saveList = localStorage.getItem(APISTR);
    if (saveList && saveList.length > 0) {
      list = JSON.parse(saveList) || [];
    } else {
      const listData = [
        {
          name: "Approval process",
          description: "Internal approval process",
          isIp: true,
          nameType: "黑名单",
          ipdesc: "28.172.23\n29.67.32",
          id: 97757,
        },
        {
          name: "Notification process",
          description: "Overall system notification process",
          id: 61910,
        },
        {
          name: "Reimbursement process",
          description: "Internal reimbursement process",
          id: 38305,
        },
        {
          name: "Leave process",
          description: "Standardization of leave process",
          id: 30635,
        },
        {
          name: "Financial approval process",
          description: "Financial approval process",
          id: 93632,
        },
        {
          name: "On-line process",
          description: "System project on-line process",
          id: 49588,
        },
      ];
      localStorage.setItem(APISTR, JSON.stringify(listData));
      console.log("打印", listData);
      list = listData;
    }

    console.log("打印", list);
    resolve(list);
  });
}
