import moment from "moment";
import "moment/dist/locale/zh-cn";

export function adaptTime(time: number) {
  if (time > 1e11) {
    return time;
  }
  return time * 1e3;
}

export function displayTime(timestamp: number) {
  timestamp = adaptTime(timestamp);
  const now = new Date().getTime();
  if (now < timestamp) {
    timestamp = now;
  }
  const time = moment(timestamp);
  if (time.year() != moment(now).year()) {
    return time.format("YYYY-MM-DD");
  } else {
    return time.format("MM-DD");
  }
}

export function displayDate(timestamp: number, format = "YYYY-MM-DD") {
  timestamp = adaptTime(timestamp);
  const time = moment(timestamp);
  return time.format(format);
}
