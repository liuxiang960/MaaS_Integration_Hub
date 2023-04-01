/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-30 20:22:28
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import Cookies from "js-cookie";
import { removeListItem, getIncloudList } from "@/utils/index";
const APISTR = "apiNew";
export function apiNew(query) {
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
    url: "/vue-element-admin/api/new",
    method: "post",
    params: query,
  });
}

export function apiDeletd(query) {
  let list = [];
  if (Cookies.get(APISTR)) {
    list = JSON.parse(Cookies.get(APISTR)) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set(APISTR, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/api/deleted",
    method: "post",
    params: query,
  });
}

export function apiList(query) {
  return new Promise((resolve, reject) => {
    let list = [];

    if (Cookies.get(APISTR)) {
      list = JSON.parse(Cookies.get(APISTR)) || [];
    }
    if (query.apiServeMap) {
      list = getIncloudList(list, query.apiServeMap.id);
    }
    resolve(list);
  });
}

//更新t数据
export function upDataApiServeList(query) {
  return new Promise((resolve, reject) => {
    let cookieKey = APISTR + query.apiServeMap.id || "";
    let list = [];
    if (Cookies.get(cookieKey)) {
      list = JSON.parse(Cookies.get(cookieKey)) || [];
      list = removeListItem(list, query.id, query);
      Cookies.set(cookieKey, JSON.stringify(list));
    }
    resolve(list);
  });
  // return request({
  //   url: "/vue-element-admin/apiServe/list",
  //   method: "get",
  //   params: query,
  // });
}
