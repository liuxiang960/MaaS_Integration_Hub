/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 03:20:17
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import Cookies from "js-cookie";
import { removeListItem } from "@/utils/index";
import { getApiServeData } from "./mock/apiServe";

export function apiServeNew(query) {
  let list = [];
  if (Cookies.get("apiServe")) {
    list = JSON.parse(Cookies.get("apiServe")) || [];
  }
  if (query.id) {
    list = removeListItem(list, query.id, query);
  } else {
    let dt = { id: Math.floor(Math.random() * 100000 + 1) };

    dt = Object.assign(query, dt);
    list.push(dt);
  }

  Cookies.set("apiServe", JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiServe/new",
    method: "post",
    params: query,
  });
}

export function apiServeDeletd(query) {
  let list = [];
  if (Cookies.get("apiServe")) {
    list = JSON.parse(Cookies.get("apiServe")) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set("apiServe", JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiServe/deleted",
    method: "post",
    params: query,
  });
}

export function apiServeList(query) {
  return new Promise((resolve, reject) => {
    let list = [];

    if (Cookies.get("apiServe")) {
      list = JSON.parse(Cookies.get("apiServe")) || [];
      list = removeListItem(list, query.id);
      list = getApiTotal(list);
    } else {
      list = [
        {
          nameType: "白名单",
          isIp: false,
          name: "Bus-Api",
          description: "MSP-Bus API",
          id: "101",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "Tram-Api",
          description: "MSP-Tram API",
          id: "111",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "Shuttle-Bus-Api",
          description: "MSP-Shuttle-Bus API",
          id: "121",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "E-Bike-Api",
          description: "MSP-E-Bike API",
          id: "131",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "Taxi-Api",
          description: "MSP-Taxi API",
          id: "141",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "Parking-Api",
          description: "MSP-Parking API",
          id: "151",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "SMTP-Api",
          description: "Service-SMTP API",
          id: "161",
        },
        {
          nameType: "白名单",
          isIp: false,
          name: "Backend-Api",
          description: "MaaS-Backend API",
          id: "171",
        },
      ];

      Cookies.set("apiServe", JSON.stringify(list));
      list = getApiTotal(list, true);
    }

    resolve(list);
  });
}
// isSet 设置
function getApiTotal(list, isSet) {
  let muList = [];
  for (let i = 0; i < list.length; i++) {
    let item = list[i];

    let cookieKey = "apiServe" + item.id || "";
    let listMu = [];
    item.num = 0;
    if (isSet) {
      const apiList = getApiServeData(cookieKey);
      // setTimeout(function () {
      localStorage.setItem(cookieKey, JSON.stringify(apiList));
      // }, 5);
      item.num = apiList.length;
    } else {
      const data = localStorage.getItem(cookieKey);
      if (data) {
        listMu = JSON.parse(data) || [];
        item.num = listMu.length || 0;
      }
    }

    muList.push(item);
  }
  return muList;
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
