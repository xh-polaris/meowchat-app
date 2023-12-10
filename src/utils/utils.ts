import { nextTick, Ref } from "vue";
import { PictureStyle } from "@/apis/cos/cos-interface";

export function getVersionCode(versionName: string) {
  const pattern = /(\d+)\.(\d+)\.(\d+)/;
  const result = versionName.match(pattern);

  if (result) {
    const [, num1, num2, num3] = result;
    return Number(num1 + num2 + num3);
  }
}

export function refresh(show: Ref<boolean>) {
  show.value = false;
  nextTick(() => {
    show.value = true;
  });
}

export type Callback<T> = (data: T) => void;

export class EventEmitter<T> {
  private callbacks: Callback<T>[] = [];
  constructor(...callbacks: Callback<T>[]) {
    this.callbacks = callbacks;
  }

  addCallback(callback: Callback<T>): void {
    this.callbacks.push(callback);
  }

  triggerCallbacks(data: T): void {
    this.callbacks.forEach((callback) => {
      callback(data);
    });
  }
}

export function getThumbnail(url: string) {
  return url + PictureStyle.Thumbnail;
}
