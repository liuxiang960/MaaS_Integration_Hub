/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-04 16:43:25
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request"
import Cookies from "js-cookie"
import { removeListItem } from "@/utils/index"
const APISTR = "userNew"
export function userNew(query) {
  let list = []
  if (Cookies.get(APISTR)) {
    list = JSON.parse(Cookies.get(APISTR)) || []
  }
  if (query.id) {
    list = removeListItem(list, query.id, query)
  } else {
    let dt = { id: Math.floor(Math.random() * 100000 + 1) }

    dt = Object.assign(query, dt)
    list.push(dt)
  }

  Cookies.set(APISTR, JSON.stringify(list))
  return request({
    url: "/vue-element-admin/user/new",
    method: "post",
    params: query
  })
}

export function userDeletd(query) {
  let list = []
  if (Cookies.get(APISTR)) {
    list = JSON.parse(Cookies.get(APISTR)) || []
    list = removeListItem(list, query.id)
  }
  Cookies.set(APISTR, JSON.stringify(list))
  return request({
    url: "/vue-element-admin/user/deleted",
    method: "post",
    params: query
  })
}

export function userList(query) {
  return new Promise((resolve, reject) => {
    let list = []

    if (Cookies.get(APISTR)) {
      list = JSON.parse(Cookies.get(APISTR)) || []
    } else {
      list = [
        { name: "admin", account: "admin", role: "admin", id: 5576 },
        { name: "join", account: "join", role: "manager", id: 14015 },
        { name: "seate", account: "seate", role: "manager", id: 88915 },
        {
          name: "yeshengguang",
          account: "yeshengguang",
          role: "manager",
          id: 33614
        },
        { name: "wqf", account: "wqf", role: "manager", id: 33601 },
        { name: "liyaoshan", account: "liyaoshan", role: "manager", id: 27485 },
        { name: "huangjie", account: "huangjie", role: "manager", id: 75849 },
        { name: "wangjing", account: "wangjing", role: "manager", id: 583937 },
        { name: "tomom", account: "tomom", role: "manager", id: 347834 },
        { name: "even", account: "even", role: "manager", id: 47835 }
      ]
    }

    resolve(list)
  })
}
