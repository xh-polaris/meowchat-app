export function getVersionCode(versionName: string) {
  const pattern = /(\d+)\.(\d+)\.(\d+)/;
  const result = versionName.match(pattern);

  if (result) {
    const [, num1, num2, num3] = result;
    return Number(num1 + num2 + num3);
  }
}
