import moment from "moment";
import "moment/dist/locale/zh-cn";

export function displayTime(secTime: number) {
  secTime *= 1000; // 后端传回的时间戳是秒级的，需要乘以1000变为微秒级，因为JS的时间戳是微秒级的
  const now = new Date().getTime();
  if (now < secTime) {
    secTime = now;
  }
  const time = moment(secTime);
  if (time.year() != moment(now).year()) {
    return time.format("YYYY-MM-DD");
  } else {
    return time.format("MM-DD");
  }
}
