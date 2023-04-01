// 数据源从最优填写到最差   如只有一项就填写该项目，如只有一项目就填good  2项就 good  preferably ;依次
//#5bb26d  绿色; #db5d58  红色;#eab54a 黄色; 蓝色 #3d8fe7;  #4aa49b 其他颜色

const data = {
  good: ["69.04", "25.67"], //最优
  preferably: ["12.29", "15.76"], //其次
  common: ["11.30", "11.88"], //一般
  difference: ["10.26", "29.08"], //差
  other: ["10.62", "10.70"], //其他
  date: ["2023-03-29", "2023-03-30"], //时间
  legend: ["探针总数", "异常探针数量", "正常探针数量"],
  settingList: [
    { name: "探针总数", color: "#3D8FE7" },
    { name: "异常探针数量", color: "#5BB26D" },
    { name: "正常探针数量", color: "#4AA49B" },
  ],
};

export function getLineData() {
  return data;
}
