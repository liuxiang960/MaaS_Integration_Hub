/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 14:33:44
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-30 17:17:09
 * @FilePath: /MaaS_Integration_Hub/src/views/dashboard/admin/components/data/health.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getDays } from "@/utils/index";
import { getLineData as mockData } from "./mock/responseTime";

export function getLineData(n) {
  return mockData();

  let dateList = getDays(n ? n : 30);
  let good = [];
  let preferably = [];
  let common = [];
  let difference = [];
  let other = [];
  for (let i = 0; i < dateList.length; i++) {
    let item = dateList[i];

    let randomGood = (Math.random() * (13 - 10) + 10).toFixed(2);

    good.push(randomGood);
  }

  return {
    good: good,
    preferably: preferably,
    common: common,
    difference,
    other: other,
    date: dateList,
  };
}

export function getChartData() {
  const {
    good,
    preferably,
    common,
    difference,
    other,
    date,
    settingList,
    legend,
  } = getLineData();

  return {
    xAxis: {
      data: date, //横向
      boundaryGap: false,
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      padding: [5, 10],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
    },
    legend: {
      data: legend, //标签
    },
    series: [
      {
        name: settingList[0].name,
        itemStyle: {
          normal: {
            color: settingList[0].color,
            lineStyle: {
              color: settingList[0].color,
              width: 2,
            },
          },
        },
        smooth: true,
        type: "line",
        data: good,
        animationDuration: 2800,
        animationEasing: settingList[0].name,
      },
    ],
  };
}
