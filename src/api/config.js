/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 17:01:00
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import Cookies from "js-cookie";
import { removeListItem } from "@/utils/index";
const APISTR = "configNew";
export function configNew(query) {
  let list = [];
  if (Cookies.get(APISTR)) {
    list = JSON.parse(Cookies.get(APISTR)) || [];
  }
  if (query.id) {
    list = removeListItem(list, query.id, query);
  } else {
    let dt = { id: Math.floor(Math.random() * 100000 + 1) };

    dt = Object.assign(query, dt);
    list.push(dt);
  }

  Cookies.set(APISTR, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/user/new",
    method: "post",
    params: query,
  });
}

export function configDeletd(query) {
  let list = [];

  if (Cookies.get(APISTR)) {
    list = JSON.parse(Cookies.get(APISTR)) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set(APISTR, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/user/deleted",
    method: "post",
    params: query,
  });
}

export function configList(query) {
  return new Promise((resolve, reject) => {
    let list = [];

    if (Cookies.get(APISTR)) {
      list = JSON.parse(Cookies.get(APISTR)) || [];
    } else {
      list = [
        {
          name: "protocolType",
          content: "http(s)",
          description: "protocolType",
          code: "PROTOCOL_TYPE",
          id: 52868,
        },
        {
          name: "whiteList",
          content: "ip",
          description: "whiteList",
          code: "BLACK_LIST",
          id: 52877,
        },
      ];
    }

    resolve(list);
  });
}
