/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-27 07:09:44
 * @FilePath: /MaaS_Integration_Hub/src/api/remote-search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'
import Cookies from 'js-cookie'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
export function applicationNew(query) {
  const list = JSON.parse(Cookies.get('application')) || []
  list.push({
    id: Math.floor(Math.random() * 100 + 1),
    name: query.name
  })
  Cookies.set('application', JSON.stringify(list))
  return request({
    url: '/vue-element-admin/application/new',
    method: 'post',
    params: query
  })
}

