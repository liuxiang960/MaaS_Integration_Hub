import i18n from "@/lang/index";

const data = {
  good: [
    "2554",
    "2443",
    "1844",
    "2844",
    "1975",
    "2575",
    "2984",
    "1490",
    "1665",
    "1447",
    "2635",
    "2107",
    "2096",
    "1776",
    "1485",
    "2458",
    "1935",
    "2542",
    "2862",
    "1668",
    "2175",
    "1481",
    "1519",
    "2456",
    "1909",
    "1697",
    "1185",
    "2505",
    "1583",
    "2975",
    "2527",
  ], //最优
  preferably: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ], //其次
  common: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ], //一般
  difference: [
    "7",
    "36",
    "48",
    "48",
    "27",
    "16",
    "59",
    "21",
    "30",
    "6",
    "22",
    "23",
    "36",
    "60",
    "35",
    "2",
    "52",
    "44",
    "52",
    "56",
    "20",
    "16",
    "6",
    "29",
    "22",
    "7",
    "29",
    "28",
    "6",
    "14",
    "20",
  ], //差
  other: [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ], //其他
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
    "2023-03-30",
  ],
  legend: ["2xx", "3xx", "4xx", "5xx", i18n.t("app_1123")],
  settingList: [
    { name: "2xx", color: "#5bb26d" },
    { name: "3xx", color: "#db5d58" },
    { name: "4xx", color: "#eab54a" },
    { name: "5xx", color: "#3d8fe7" },
    { name: i18n.t("app_1123"), color: "#4aa49b" },
  ],
};
export function getLineData() {
  return data;
}
