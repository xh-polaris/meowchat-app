// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import moment from "moment";
import "moment/dist/locale/zh-cn";

export function displayTime(secTime: number) {
  const timeStr = moment(secTime).fromNow();
  return timeStr.replace(" ", "");
}
