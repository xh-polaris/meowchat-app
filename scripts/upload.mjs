import ci from "miniprogram-ci";
import fs from "fs";

const version = JSON.parse(
  fs.readFileSync("./package.json", "utf8").toString()
)["version"];
let versionTag = "";
if (!version) {
  versionTag = "v1.0.0";
} else {
  versionTag = "v" + version;
}

fs.writeFileSync("upload.key", process.env.UPLOAD_KEY, "utf8");
const project = new ci.Project({
  appid: "wxd7e995c7b9d793b8",
  type: "miniProgram",
  projectPath: "dist/build/mp-weixin",
  privateKeyPath: "upload.key",
  ignores: ["node_modules/**/*"]
});

// 上传模式
async function upload() {
  try {
    const result = await ci.upload({
      project,
      version: versionTag
    });
    console.log("上传成功");
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1)
  }
}

upload();

