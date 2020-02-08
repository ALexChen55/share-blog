const path = require("path");
const getIPAddress = require("./utils/getIPAddress.js");
const port = 5599;
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  title: "个人备忘",
  description: "自己对学习、生活的一些记录",
  host: getIPAddress(),
  port: port,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/blog/" },
      { text: "测试", link: "/test/" }
    ],
    sidebar: "auto"
  },
  markdown: {
    lineNumbers: true
  },
  locales: {
    "/": {
      lang: "zh"
    }
  },
  head: [
    ["link", { rel: "icon", href: "/512.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
  ],
  plugins: [
    "@vuepress/nprogress",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ],
  chainWebpack: config => {
    config.resolve.mainFiles.add("index").add("Index");
  }
};
