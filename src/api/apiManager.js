/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 03:29:02
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import Cookies from "js-cookie";
import { removeListItem } from "@/utils/index";
import { getApiServeData } from "./mock/apiServe";
export function apiManagerNew(query) {
  let list = [];
  if (Cookies.get("apiManager")) {
    list = JSON.parse(Cookies.get("apiManager")) || [];
  }
  if (query.id) {
    list = removeListItem(list, query.id, query);
  } else {
    let dt = { id: Math.floor(Math.random() * 100000 + 1) };
    dt.status = "配置中";
    dt.domain = "域名";

    dt = Object.assign(query, dt);
    list.push(dt);
  }

  Cookies.set("apiManager", JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiManager/new",
    method: "post",
    params: query,
  });
}

export function apiManagerDeletd(query) {
  let list = [];
  if (Cookies.get("apiManager")) {
    list = JSON.parse(Cookies.get("apiManager")) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set("apiManager", JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiManager/deleted",
    method: "post",
    params: query,
  });
}

export function apiManagerList(query) {
  const list = [];

  return request({
    url: "/vue-element-admin/apiManager/list",
    method: "get",
    params: query,
  });
}

// api  api时候需要关联api服务  api服务下关联api
export function apiServeNew(query) {
  let list = [];
  let cookieKey = "apiServe" + query.apiServeMap.id;
  debugger;
  const data = localStorage.getItem(cookieKey);

  if (data) {
    list = JSON.parse(data) || [];
    list = removeListItem(list, query.id);
  }

  let dt = { id: Math.floor(Math.random() * 100000 + 1) };

  dt = Object.assign(query, dt);
  list.push(dt);
  localStorage.setItem(cookieKey, JSON.stringify(list));

  return request({
    url: "/vue-element-admin/apiServe/new",
    method: "post",
    params: query,
  });
}

export function apiServeDeletd(query) {
  let list = [];
  let cookieKey = "apiServe" + query.apiServeMap.id;
  const data = localStorage.getItem(cookieKey);

  if (data) {
    list = JSON.parse(data) || [];
    list = removeListItem(list, query.id);
  }
  localStorage.setItem(cookieKey, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiServe/deleted",
    method: "post",
    params: query,
  });
}

//api  详情
export function apiServeList(query) {
  return new Promise((resolve, reject) => {
    let cookieKey = "apiServe" + query.apiServeMap.id || "";
    let list = [];
    const data = localStorage.getItem(cookieKey);

    if (data) {
      list = JSON.parse(data) || [];
      list = removeListItem(list, query.id);
    } else {
      list = getApiServeData(cookieKey);
      localStorage.setItem(cookieKey, JSON.stringify(list));
    }
    resolve(list);
  });
}
//更新t数据
export function upDataApiServeList(query) {
  return new Promise((resolve, reject) => {
    let cookieKey = "apiServe" + query.apiServeMap.id || "";
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

// 凭证相关

// api
export function apiCertificateNew(query) {
  let list = [];
  let cookieKey = "apiCertificate" + query.apiServeMap.id;
  if (Cookies.get(cookieKey)) {
    list = JSON.parse(Cookies.get(cookieKey)) || [];
    list = removeListItem(list, query.id);
  }

  let dt = { id: Math.floor(Math.random() * 100000 + 1) };

  dt = Object.assign(query, dt);
  list.push(dt);
  Cookies.set(cookieKey, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/certificate/new",
    method: "post",
    params: query,
  });
}

export function apiCertificateDeletd(query) {
  let list = [];
  let cookieKey = "apiCertificate" + query.apiServeMap.id;

  if (Cookies.get(cookieKey)) {
    list = JSON.parse(Cookies.get(cookieKey)) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set(cookieKey, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/certificate/deleted",
    method: "post",
    params: query,
  });
}

export function apiCertificateList(query) {
  return new Promise((resolve, reject) => {
    let cookieKey = "apiCertificate" + query.apiServeMap.id || "";
    let list = [];
    if (Cookies.get(cookieKey)) {
      list = JSON.parse(Cookies.get(cookieKey)) || [];
      list = removeListItem(list, query.id);
    }
    resolve(list);
  });
}
//更新apiList数据
export function upDataApiCertificateList(query) {
  return new Promise((resolve, reject) => {
    let cookieKey = "apiCertificate" + query.apiServeMap.id || "";
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

//获取已发布的api

export function getReleaseApiList(query) {
  return new Promise((resolve, reject) => {
    let list = [];
    if (Cookies.get("apiManager")) {
      list = JSON.parse(Cookies.get("apiManager")) || [];
    }

    let muList = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];

      let cookieKey = "apiServe" + item.id || "";
      let listData = [];
      if (Cookies.get(cookieKey)) {
        listData = JSON.parse(Cookies.get(cookieKey)) || [];
      }

      for (let j = 0; j < listData.length; j++) {
        let dt = listData[j];
        if (dt.status == "success") {
          muList.push(dt);
        }
      }
    }
    resolve(muList);
  });
}

// 凭证列表
export function apiCertificaterList(query) {
  const list = [];

  return request({
    url: "/vue-element-admin/certificateTest/list",
    method: "get",
    params: query,
  });
}

//运维
export function operationList(query) {
  const list = [];

  return request({
    url: "/vue-element-admin/operationTest/list",
    method: "get",
    params: query,
  });
}

//运维日志
export function operationDayList(query) {
  const list = [];

  return request({
    url: "/vue-element-admin/operationDay/list",
    method: "get",
    params: query,
  });
}

export function operationHistory(query) {
  const list = [];

  return request({
    url: "/vue-element-admin/operation/history",
    method: "get",
    params: query,
  });
}
