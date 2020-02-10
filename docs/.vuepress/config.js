const path = require("path");
const getIPAddress = require("./utils/getIPAddress.js");
const port = 5599;
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  title: "私たちの記念",
  description: "我们生活中的记录",
  host: getIPAddress(),
  port: port,
  base: "/share-blog/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "专业", link: "/major/",
	  items:[
		  { text: "vue", link: "/major/vue/" },
		  { text: "react", link: "/major/react/" },
		  { text: "others", link: "/major/others/" }
		],
	  },
      { text: "爱好", link: "/hobby/" },
      { text: "影视", link: "/video/" },
    ],
    sidebar: "auto"
  },
  markdown: {
    lineNumbers: true,
	anchor:{ permalink: true, permalinkBefore: true, permalinkSymbol: '🖌' }
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
  },
  postcss: { plugins: [require('tailwindcss'), require('autoprefixer')] }
};
