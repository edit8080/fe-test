// 단일 속성 데이터 카운팅
export const singleCount = (categories, stats, type) => {
  let genderCnt = [];

  categories.forEach((category) => {
    let cnt = 0;

    stats.forEach((stat) => {
      if (stat[type] === category) cnt += stat.count;
    });

    let obj = {};
    obj["name"] = category;
    obj["value"] = cnt;
    genderCnt.push(obj);
  });

  return genderCnt;
};
