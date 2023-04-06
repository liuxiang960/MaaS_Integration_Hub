/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-02 23:23:23
 * @FilePath: /MaaS_Integration_Hub/src/api/application.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request"
import Cookies from "js-cookie"
import { removeListItem } from "@/utils/index"
const APISTR = "Operation"
export function operationNew(query) {
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
    url: "/vue-element-admin/operation/new",
    method: "post",
    params: query
  })
}

export function operationDeletd(query) {
  let list = []
  if (Cookies.get(APISTR)) {
    list = JSON.parse(Cookies.get(APISTR)) || []
    list = removeListItem(list, query.id)
  }
  Cookies.set(APISTR, JSON.stringify(list))
  return request({
    url: "/vue-element-admin/operation/deleted",
    method: "post",
    params: query
  })
}

export function operationList(query) {
  return new Promise((resolve, reject) => {
    let list = []

    if (Cookies.get(APISTR)) {
      list = JSON.parse(Cookies.get(APISTR)) || []
    } else {
      list = [
        {
          name: "MSP-Bus",
          level: "Notice",
          appName: "MSP-Bus",
          description: "MSP-Bus",
          paramsList: [
            {
              name: "Abnormal health",
              period: "Every day",
              condition: ">",
              params: 1,
              id: 88179
            }
          ],
          paramsUserList: [
            {
              name: "vicent",
              role: "admin",
              mobile: "19572922269",
              email: "welcomeqf@sina.cn",
              id: 16737
            }
          ],
          id: 78624
        },
        {
          name: "MSP-Tram",
          level: "Notice",
          appName: "MSP-Tram",
          description: "MSP-Tram",
          paramsList: [
            {
              name: "Abnormal health",
              period: "Every day",
              condition: ">",
              params: 1,
              id: 88179
            }
          ],
          paramsUserList: [
            {
              name: "vicent",
              role: "admin",
              mobile: "19572922269",
              email: "welcomeqf@sina.cn",
              id: 16738
            }
          ],
          id: 78626
        },
        {
          name: "MaaS-Backend",
          level: "Notice",
          appName: "MaaS-Backend",
          description: "MaaS-Backend",
          paramsList: [
            {
              name: "Abnormal health",
              period: "Every day",
              condition: ">",
              params: 1,
              id: 88179
            }
          ],
          paramsUserList: [
            {
              name: "vicent",
              role: "admin",
              mobile: "19572922269",
              email: "welcomeqf@sina.cn",
              id: 16739
            }
          ],
          id: 78629
        }
      ]

      Cookies.set(APISTR, JSON.stringify(list))
    }

    resolve(list)
  })
}
