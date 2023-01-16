import moment from "moment";
import "moment/dist/locale/zh-cn";

export function displayTime(secTime: number) {
  const timeStr = moment(secTime * 1000).fromNow();
  return timeStr.replace(" ", "");
}
