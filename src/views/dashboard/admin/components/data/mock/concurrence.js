/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-04-01 00:02:54
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/components/data/mock/concurrence.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import i18n from "@/lang/index"

const data = {
  good: [
    "89",
    "47",
    "58",
    "46",
    "81",
    "54",
    "52",
    "52",
    "92",
    "66",
    "39",
    "94",
    "72",
    "99",
    "38",
    "63",
    "50",
    "33",
    "87",
    "46",
    "95",
    "35",
    "39",
    "70",
    "96",
    "67",
    "42",
    "40",
    "73",
    "77",
    "47"
  ], // 最优
  date: [
    "2023-02-28",
    "2023-03-01",
    "2023-03-02",
    "2023-03-03",
    "2023-03-04",
    "2023-03-05",
    "2023-03-06",
    "2023-03-07",
    "2023-03-08",
    "2023-03-09",
    "2023-03-10",
    "2023-03-11",
    "2023-03-12",
    "2023-03-13",
    "2023-03-14",
    "2023-03-15",
    "2023-03-16",
    "2023-03-17",
    "2023-03-18",
    "2023-03-19",
    "2023-03-20",
    "2023-03-21",
    "2023-03-22",
    "2023-03-23",
    "2023-03-24",
    "2023-03-25",
    "2023-03-26",
    "2023-03-27",
    "2023-03-28",
    "2023-03-29",
    "2023-03-30"
  ],
  legend: [i18n.t("app_1119")],
  settingList: [{ name: i18n.t("app_1119"), color: "#3d8fe7" }]
}
export function getLineData() {
  return data
}
