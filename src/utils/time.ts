import moment from "moment";
import "moment/dist/locale/zh-cn";

export function displayTime(secTime: number) {
  secTime *= 1000;
  const now = new Date().getTime();
  if (now < secTime) {
    secTime = now;
  }
  const timeStr = moment(secTime).fromNow();
  return timeStr.replace(" ", "");
}
