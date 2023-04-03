/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-31 16:11:01
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 14:44:43
 * @FilePath: /MaaS_Integration_Hub/mock/data/dayRecordManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const manageData = [
  {
    name: "admin",
    date: "2023-03-30 16:12:01",
    result: "success",
    module: "alarmStrategy",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-29 15:44:41",
    result: "success",
    module: "userManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-28 12:20:21",
    result: "success",
    module: "configurationManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-27 11:20:21",
    result: "success",
    module: "userManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-27 11:10:00",
    result: "success",
    module: "userManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-26 10:40:21",
    result: "success",
    module: "userManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-26 09:21:22",
    result: "success",
    module: "userManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-25 10:08:00",
    result: "success",
    module: "configurationManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-25 09:12:01",
    result: "success",
    module: "configurationManagement",
    event: "newly added",
  },
  {
    name: "admin",
    date: "2023-03-24 14:33:01",
    result: "success",
    module: "userManagement",
    event: "newly added",
  },
];

function returnData(currentPage, pageSize) {
  return manageData;
}
module.exports.returnData = returnData()