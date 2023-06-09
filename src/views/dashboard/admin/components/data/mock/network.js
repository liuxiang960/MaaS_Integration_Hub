/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-31 23:59:30
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/components/data/mock/network.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import i18n from "@/lang/index"

const data = {
  good: [
    "3620",
    "3913",
    "3607",
    "3970",
    "3312",
    "3701",
    "3145",
    "2045",
    "2807",
    "3740",
    "2825",
    "2632",
    "3335",
    "3870",
    "2469",
    "3554",
    "3760",
    "3279",
    "2761",
    "3496",
    "3398",
    "3079",
    "3185",
    "2464",
    "2245",
    "3593",
    "3263",
    "2040",
    "3023",
    "2398",
    "2967"
  ], // 最优
  preferably: [
    "2646",
    "3639",
    "2016",
    "3374",
    "3351",
    "3649",
    "2096",
    "3841",
    "2110",
    "2199",
    "3671",
    "3653",
    "3407",
    "2241",
    "3272",
    "2995",
    "2901",
    "2462",
    "3369",
    "2116",
    "2728",
    "3273",
    "2312",
    "2793",
    "3479",
    "3659",
    "3675",
    "3156",
    "2997",
    "3117",
    "3204"
  ], // 其次
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
  legend: [i18n.t("app_1120"), i18n.t("app_1121")],
  settingList: [
    { name: i18n.t("app_1120"), color: "#5bb26d" },
    { name: i18n.t("app_1121"), color: "#3d8fe7" }
  ]
}
export function getLineData() {
  return data
}
