/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-02 07:16:29
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";
import Cookies from "js-cookie";
import { removeListItem, getIncloudList } from "@/utils/index";

export function appNew(query) {
  let list = [];
  if (Cookies.get("appNew")) {
    list = JSON.parse(Cookies.get("appNew")) || [];
  }
  if (query.id) {
    list = removeListItem(list, query.id, query);
  } else {
    let dt = { id: Math.floor(Math.random() * 100000 + 1) };
    dt = Object.assign(query, dt);
    list.push(dt);
  }

  Cookies.set("appNew", JSON.stringify(list));
  return request({
    url: "/vue-element-admin/app/new",
    method: "post",
    params: query,
  });
}

export function appDeletd(query) {
  let list = [];
  debugger;
  if (Cookies.get("appNew")) {
    list = JSON.parse(Cookies.get("appNew")) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set("appNew", JSON.stringify(list));
  return request({
    url: "/vue-element-admin/app/deleted",
    method: "post",
    params: query,
  });
}

export function appList(query) {
  return new Promise((resolve, reject) => {
    let list = [];
    if (Cookies.get("appNew")) {
      list = JSON.parse(Cookies.get("appNew")) || [];
      list = removeListItem(list, query.id);
    } else {
      list = [
        {
          isIp: false,
          path: "/bus",
          SecretKey: "9v70teVzNcUKRmdn",
          serveType: "Third-party systems",
          SecretId: "3sR0Zwca",
          name: "MSP-Bus",
          description:
            "Docking basic data such as bus lines, stations, vehicles, etc.",
          id: "10",
          paramsList: [
            { port: "60100", ip: "218.2.27.54", weight: "0", id: "101" },
          ],
        },
        {
          isIp: false,
          path: "/tram",
          SecretKey: "diR8zQhgx8c6yaNx",
          serveType: "Third-party systems",
          SecretId: "g3u6wu6y",
          name: "MSP-Tram",
          description: "Docking light rail real-time vehicle information",
          id: "11",
          paramsList: [
            { port: "8081", ip: "192.162.23.141", weight: "0", id: "111" },
          ],
        },
        {
          isIp: false,
          path: "/shuttleBus",
          SecretKey: "PoIpEsZp5Cbq2ImA",
          serveType: "Third-party systems",
          SecretId: "YZkCGa73",
          name: "MSP-Shuttle-Bus",
          description: "Online booking, carpooling and group access, etc.",
          id: "12",
          paramsList: [
            { port: "8082", ip: "192.162.23.142", weight: "0", id: "121" },
          ],
        },
        {
          isIp: false,
          path: "/eBike",
          SecretKey: "kKGcKS2puWzJH9if",
          serveType: "Third-party systems",
          SecretId: "sHBy7dDh",
          name: "MSP-E-Bike",
          description:
            "Realize the functions of bicycle code scanning, unlocking and locking",
          id: "13",
          paramsList: [
            { port: "8083", ip: "192.162.13.122", weight: "0", id: "131" },
          ],
        },
        {
          isIp: false,
          path: "/taxi",
          SecretKey: "3PFc8dzn6y9s4XCJ",
          serveType: "Third-party systems",
          SecretId: "fakiFOvC",
          name: "MSP-Taxi",
          description:
            "Connect with Mushroom platform for real-time, appointment ordering, etc.",
          id: "14",
          paramsList: [
            { port: "8084", ip: "192.162.22.42", weight: "0", id: "141" },
          ],
        },
        {
          isIp: false,
          path: "/taxi",
          SecretKey: "Nj8VHP9sddAeRLCJ",
          serveType: "Third-party systems",
          SecretId: "VI49cWVj",
          name: "MSP-Parking",
          description:
            "Realize functions such as vehicle entry, exit, order consumption deduction, etc.",
          id: "15",
          paramsList: [
            { port: "8085", ip: "192.162.22.14", weight: "0", id: "151" },
          ],
        },
        {
          isIp: false,
          path: "/smtp",
          SecretKey: "kURRXHbYqvoV8nus",
          serveType: "Third-party systems",
          SecretId: "5pPcxyrD",
          name: "Service-SMTP",
          description:
            "Realize the functions of sending and receiving mailboxes",
          id: "16",
          paramsList: [
            { port: "8086", ip: "192.162.42.3", weight: "0", id: "161" },
          ],
        },
        {
          isIp: false,
          path: "/backend",
          SecretKey: "TyPfvMApda6tC5fV",
          serveType: "Third-party systems",
          SecretId: "kwLxVhEx",
          name: "MaaS-Backend",
          description:
            "MaaS travel docking platform, opening up payment channels with third parties, same user identity authentication, etc.",
          id: "17",
          paramsList: [
            { port: "8087", ip: "192.162.13.43", weight: "0", id: "171" },
          ],
        },
      ];
      Cookies.set("appNew", JSON.stringify(list));
    }

    resolve(list);
  });
}

// api  api时候需要关联api服务  api服务下关联api
export function apiServeNew(query) {
  let list = [];
  let cookieKey = "apiServe" + query.apiServeMap.id;

  if (Cookies.get(cookieKey)) {
    list = JSON.parse(Cookies.get(cookieKey)) || [];
    list = removeListItem(list, query.id);
  }

  let dt = { id: Math.floor(Math.random() * 100000 + 1) };
  dt.status = "配置中";
  dt.domain = "域名";

  dt = Object.assign(query, dt);
  list.push(dt);
  Cookies.set(cookieKey, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiServe/new",
    method: "post",
    params: query,
  });
}

export function apiServeDeletd(query) {
  let list = [];
  let cookieKey = "apiServe" + query.apiServeMap.id;

  if (Cookies.get(cookieKey)) {
    list = JSON.parse(Cookies.get(cookieKey)) || [];
    list = removeListItem(list, query.id);
  }
  Cookies.set(cookieKey, JSON.stringify(list));
  return request({
    url: "/vue-element-admin/apiServe/deleted",
    method: "post",
    params: query,
  });
}

export function apiServeList(query) {
  return new Promise((resolve, reject) => {
    let cookieKey = "apiServe" + query.apiServeMap.id || "";
    let list = [];
    if (Cookies.get(cookieKey)) {
      list = JSON.parse(Cookies.get(cookieKey)) || [];
      list = removeListItem(list, query.id);
    } else {
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
