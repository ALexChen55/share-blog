---
title: 超全面详细一条龙教程！从零搭建 React 项目全家桶（上篇）
date: 2020-02-10
description: React 是近几年来前端项目开发非常火的一个框架，其背景是 Facebook 团队的技术支持，市场占有率也很高。很多初学者纠结一开始是学 react 还是 vue。个人觉得，有时间的话，最好两个都掌握一下。从学习难度上来说，react 要比 vue 稍难一些。万事开头难，但是掌握了 react 对于大幅提高前端技能还是非常有帮助的。本文一步步详细梳理了从创建 react、精简项目、集成插件、初步优化等过程。对于 react 开发者来说，能够节省很多探索的时间。下面请跟着我来一步步操作。
image: https://vuepress.vuejs.org/hero.png
---
React 是近几年来前端项目开发非常火的一个框架，其背景是 Facebook 团队的技术支持，市场占有率也很高。很多初学者纠结一开始是学 react 还是 vue。个人觉得，有时间的话，最好两个都掌握一下。从学习难度上来说，react 要比 vue 稍难一些。万事开头难，但是掌握了 react 对于大幅提高前端技能还是非常有帮助的。本文一步步详细梳理了从创建 react、精简项目、集成插件、初步优化等过程。对于 react 开发者来说，能够节省很多探索的时间。下面请跟着我来一步步操作。

先睹为快
----

正式开始前，先看下通过本次分享，能掌握什么？

1.  从零创建 React 项目
2.  支持 Sass/Scss/Less/Stylus
3.  路由使用：react-router-dom
4.  组件的创建与引用
5.  React Developer Tools 浏览器插件
6.  redux、react-redux 使用
7.  redux-thunk
8.  store 的创建与使用
9.  Redux DevTools 安装与使用
10.  immutable.js 使用
11.  Mock.js 使用
12.  解决本地跨域反向代理
13.  其他常用工具汇总
14.  超值附赠：集成 Ant Design

即使你是新手，跟着操作一遍以后，也可以快速上手 React 项目啦！

> ※注：本文代码区域每行开头的 “+” 表示新增，“-”表示删除，“M”表示修改；代码中的 “...” 表示省略。

1 创建 React-APP
--------------

为了加速 npm 下载速度，先把 npm 设置为淘宝镜像地址。

```
npm config set registry http://registry.npm.taobao.org/
复制代码

```

也可以使用 cnpm，根据喜好自行选择。

通过官方的 create-react-app，找个喜欢的目录，执行：

```
npx create-react-app react-app
复制代码

```

命令最后的 react-app 是项目的名称，可以自行更改。

稍等片刻即可完成安装。安装完成后，可以使用 npm 或者 yarn 启动项目。

进入项目目录，并启动项目：

```
cd react-app
yarn start  （或者使用npm start）
复制代码

```

如果没有安装 yarn，可以前往 yarn 中文网站安装：

> [yarn.bootcss.com/](https://yarn.bootcss.com/)

启动后，可以通过以下地址访问项目：

> [http://localhost:3000/](http://localhost:3000/)

![](https://user-gold-cdn.xitu.io/2020/2/2/17005bfe603fd01c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

2 精简项目
------

### 2.1 删除文件

接下来，删除一般项目中用不到的文件，最简化项目。

```
    ├─ /node_modules
    ├─ package.json
    ├─ /public
    |  ├─ favicon.ico
    |  ├─ index.html
-   |  ├─ logo192.png
-   |  ├─ logo512.png
-   |  ├─ mainfest.json
-   |  └─ robots.txt
    ├─ README.md
    ├─ /src
-   |  ├─ App.css
    |  ├─ App.js
-   |  ├─ App.test.js      (jTest自动化测试)
-   |  ├─ index.css
-   |  ├─ index.js
-   |  ├─ logo.svg
-   |  ├─ serviceWorker.js
-   |  └─ setuoTests.js    (PWA)
    └─ yarn.lock
复制代码

```

以上文件删除后，页面会报错。这是因为相应的文件引用已不存在。需要继续修改代码。

### 2.2 简化代码

现在目录结构如下，清爽许多：

```
    ├─ /node_modules
    ├─ package.json
    ├─ /public
    |  ├─ favicon.ico
    |  └─ index.html
    ├─ README.md
    ├─ /src
    |  ├─ App.js
    |  └─ index.js
    └─ yarn.lock
复制代码

```

逐个修改以下文件：

src/App.js 代码简化如下：

```
import React from 'react'

function App() {
  return (
    <div class>
      <h1>This is React App.</h1>
    </div>
  )
}

export default App
复制代码

```

src/index.js 代码简化如下：

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
复制代码

```

public/index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta  />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
复制代码

```

运行效果如下：

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c065ab1b637?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 2.3 使用 Fragment 去掉组件外层标签

react 要求每个组件 HTML 的最外层必须是由一个标签包裹，且不能存在并列的标签。例如，在 src/App.js 中，如果是这样就会报错：

```
 // 以下代码将会报错，最外层不能存在并列的标签。
 function App() {
  return (
    <div class>
      <h1>This is React App.</h1>
    </div>
    <div class>
      <h1>This is React App-other.</h1>
    </div>
  )
}
复制代码

```

如果确实需要这样的 HTML，并且不想再添加一个父级标签，可以使用 Fragment 作为最外层。代码修改如下：

```
M   import React, { Fragment } from 'react'

    function App() {
        return (
+           <Fragment>
                <div class>
                    <h1>This is React App.</h1>
                </div>
                <div class>
                    <h1>This is React App-ohter.</h1>
                </div>
+           </Fragment>
        )
    }

    export default App
复制代码

```

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c08f51c9798?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

以上仅为了说明 Fragment 的使用效果。在某些组件嵌套的使用场景下，非常适合使用 Fragment。例如父组件是`<table>`，而子组件可以用`<Fragment>`包裹多个`<tr>`。

3 项目目录结构
--------

项目目录结构可根据项目实际灵活制定。这里分享下我常用的结构，仅供参考。

```
    ├─ /node_modules
    ├─ package.json
    ├─ /public
    |  ├─ favicon.ico        <-- 网页图标
    |  └─ index.html         <-- HTML页模板
    ├─ README.md
    ├─ /src
    |  ├─ /common            <-- 全局公用目录
    |  |  ├─ /fonts          <-- 字体文件目录
    |  |  ├─ /images         <-- 图片文件目录
    |  |  ├─ /js             <-- 公用js文件目录
    |  |  └─ /style          <-- 公用样式文件目录
    |  |  |  ├─ frame.css    <-- 全部公用样式（import其他css）
    |  |  |  ├─ reset.css    <-- 清零样式
    |  |  |  └─ global.css   <-- 全局公用样式
    |  ├─ /components        <-- 公共模块组件目录
    |  |  ├─ /header         <-- 头部导航模块
    |  |  |  ├─ index.js     <-- header主文件
    |  |  |  └─ header.css   <-- header样式文件
    |  |  └─ ...             <-- 其他模块
    |  ├─ /pages             <-- 页面组件目录
    |  |  ├─ /home           <-- home页目录
    |  |  |  ├─ index.js     <-- home主文件
    |  |  |  └─ home.css     <-- home样式文件
    |  |  ├─ /login          <-- login页目录
    |  |  |  ├─ index.js     <-- login主文件
    |  |  |  └─ login.css    <-- login样式文件
    |  |  └─ ...             <-- 其他页面
    |  ├─ App.js             <-- 项目主模块
    |  └─ index.js           <-- 项目入口文件
    └─ yarn.lock
复制代码

```

### 3.1 引入全局公用样式

在 frame.css 里引入其他公用样式： src/common/style/frame.css

```
@import './reset.css';
@import './global.css';
复制代码

```

然后在 src/index.js 里引入 frame.css

```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'
+   import './common/style/frame.css'

    ReactDOM.render(<App />, document.getElementById('root'))
复制代码

```

如图，页面全局样式已生效。

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c0bdb5741d2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 3.2 支持 Sass/Less/Stylus

工欲善其事必先利其器，这么高大上的 react 怎能好意思用最原始的 css 搭配呢？create-react-app 默认情况下未暴露配置文件。要更灵活配置项目，需要将配置文件暴露出来。

执行以下命令，暴露配置文件：

> ※注意：暴露配置的文件的操作不可逆！

```
npm run eject
复制代码

```

如果之前没有提及 git 的话，可能会报以下错误：

```
Remove untracked files, stash or commit any changes, and try again
复制代码

```

需要先在项目根目录下执行：

```
git add .
git commit -m "初始化项目(备注)"
复制代码

```

稍等片刻，eject 成功，目录变化如下：

```
+   ├─ /config
+   |  ├─ /jest
+   |  ├─ env.js
+   |  ├─ module.js
+   |  ├─ paths.js
+   |  ├─ pnpTs.js
+   |  ├─ webpack.config.js   <-- webpack配置文件
+   |  └─ webpackDevServer.config.js
    ├─ /node_modules
    ├─ package.json
    ├─ /public
    |  ├─ favicon.ico
    |  └─ index.html
    ├─ README.md
+   ├─ /scripts
+   |  ├─ build.js
+   |  ├─ start.js
+   |  └─ test.js
    ├─ /src
    |  ├─ /common         <-- 全局公用目录
    |  ├─ /components     <-- 公共模块组件目录
    |  ├─ /pages          <-- 页面组件目录
    |  ├─ App.js          <-- 项目主模块
    |  └─ index.js        <-- 项目入口文件
    └─ yarn.lock
复制代码

```

#### 3.2.1 支持 Sass/Scss

eject 后，虽然 package.json 以及 webpack.config.js 里有了 sass 相关代码，但是要正确使用 Sass/Scss，还要再安装 node-sass。

执行以下命令：

```
npm install node-sass --save-dev
复制代码

```

安装完成后，项目已支持 Sass/Scss，可以将原 css 文件后缀名修改为 sacc/scss，别忘了把`src/index.js`中引入的 frame.css 后缀名修改为 sacc/scss。

#### 3.2.2 支持 Less

支持 Less 稍微多一点步骤，首先安装 less 和 less-loader：

```
npm install less less-loader --save-dev
复制代码

```

然后修改 config/webpack.config.js：

```
    // style files regexes
    const cssRegex = /\.css$/;
    const cssModuleRegex = /\.module\.css$/;
    const sassRegex = /\.(scss|sass)$/;
    const sassModuleRegex = /\.module\.(scss|sass)$/;
+   const lessRegex = /\.less$/;
+   const lessModuleRegex = /\.module\.less$/;
    ...(略)
    // Opt-in support for SASS (using .scss or .sass extensions).
    // By default we support SASS Modules with the
    // extensions .module.scss or .module.sass
    {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
            'sass-loader'
        ),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
    },
    // Adds support for CSS Modules, but using SASS
    // using the extension .module.scss or .module.sass
    {
        test: sassModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
            },
            'sass-loader'
        ),
    },
    // 以下这里仿照上面sass的代码，配置下less。
+   {
+       test: lessRegex,
+           exclude: lessModuleRegex,
+           use: getStyleLoaders(
+               {
+                   importLoaders: 2,
+                   sourceMap: isEnvProduction && shouldUseSourceMap,
+               },
+               'less-loader'
+            ),
+           sideEffects: true,
+   },
+   {
+       test: lessModuleRegex,
+       use: getStyleLoaders(
+           {
+               importLoaders: 2,
+               sourceMap: isEnvProduction && shouldUseSourceMap,
+               modules: {
+                   getLocalIdent: getCSSModuleLocalIdent,
+               },
+           },
+           'less-loader'
+       ),
+   },
复制代码

```

修改后需要执行`yarn start`重启项目。

然后将原 css 文件的后缀名修改为 less，`src/index.js`中引入的 frame.less，页面已正常解析 less。

#### 3.2.3 支持 Stylus

支持 Stylus 跟 Less 完全一样，首先安装 stylus 和 stylus-loader：

执行以下命令：

```
npm install stylus stylus-loader --save-dev
复制代码

```

安装完成后，按照上一小节介绍的支持 less 的方法，修改 config/webpack.config.js。完成后重启项目，引入 stylus 文件可以正常解析了。

我个人习惯使用 Stylus，因此后续的讲解中使用 Stylus。同时，把 src/common / 下的 style 目录也更名为 stylus。

```
    ├─ /config
    ├─ /node_modules
    ├─ package.json
    ├─ /public
    ├─ README.md
    ├─ /scripts
    ├─ /src
    |  ├─ /common       <-- 全局公用目录    
    |  |  ├─ /fonts       
    |  |  ├─ /images 
    |  |  ├─ /js 
M   |  |  └─ /stylus
M   |  |  |  ├─ frame.styl
M   |  |  |  ├─ reset.styl
M   |  |  |  └─ global.styl  
    |  ├─ /components   <-- 公共模块组件目录
    |  ├─ /pages        <-- 页面组件目录
    |  ├─ App.js        <-- 项目主模块
    |  └─ index.js      <-- 项目入口文件
    └─ yarn.lock
复制代码

```

frame.styl 代码如下：

```
@import './reset.styl';
@import './global.styl';
复制代码

```

src/index.js 代码修改如下：

```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'
M   import './common/style/frame.styl'

    ReactDOM.render(<App />, document.getElementById('root'))
复制代码

```

最基本的配置搞定了，接下来要开始引入页面（pages）了。页面的切换需要使用路由（Router），请继续阅读下面的章节。

4 路由
----

### 4.1 页面构建

首先，构建 home 和 login 页面。

src/pages/home/index.js 代码：

```
import React, { Component } from 'react'
import './home.styl'

class Home extends Component {
    render() {
        return (
            <div class>
                <h1>Home page</h1>
            </div>
        )
    }
}

export default Home
复制代码

```

src/pages/home/home.styl 代码

```
.P-home
    h1
        padding: 20px 0
        font-size: 30px
        color: #fff
        background: #67C23A
        text-align: center
复制代码

```

src/pages/login/index.js 代码：

```
import React, { Component } from 'react'
import './login.styl'

class Login extends Component {
    render() {
        return (
            <div class>
                <h1>Login page</h1>
            </div>
        )
    }
}

export default Login
复制代码

```

src/pages/login/login.styl 代码

```
.P-login
    h1
        background: #E6A23C
复制代码

```

我个人的习惯是，仅供参考：

> 全局公用级别（不需要模块化）的 className，用 G-xxx。例如 G-autocut(截字)、G-color-red(文字红色)。
> 
> 页面级别的 className，用 P-xxx。
> 
> 模块级别的 className，用 M-xxx。

接下来，我们使用 react-router-dom 实现路由。

### 4.2 使用 react-router-dom

执行安装命令：

```
npm install react-router-dom --save
复制代码

```

修改 src/App.js，代码如下：

```
import React, { Fragment } from 'react'
import Login from './pages/login'
import Home from './pages/home'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to={"/home"} />
        </Switch>
      </HashRouter>
    </Fragment>
  )
}

export default App
复制代码

```

App.js 引入了 Home 和 Login 两个页面级组件。然后使用 react-router-dom 分别设置了路径。

import 的机制是默认寻找 index.js，所以每个组件的主文件名设为 index.js，在引用的时候就可以省略文件名。

这里说明一下`<Route>`的属性：

> path 表示路径，这个很好理解。

> component 表示绑定的组件。

> exact 表示是否精确匹配。

如果没有设置 exact，那么：

`localhost:3000/`会显示 Home 页，

`localhost:3000/abc`也会显示 Home 页。

因为匹配到了前面的 "/"，路由就会成功。

最后的`<Redirect>`表示以上都没有匹配成功的会，默认跳转的路由。

来看下效果：

访问`http://localhost:3000/#/login`效果：

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c138dca4e8f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

访问`http://localhost:3000/#/home`效果：

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c15527756ee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 4.3 路由跳转

接下来，简单介绍下如果在页面之间进行路由跳转。

在 Login 页面添加一个用于跳转至 Home 页的按钮，代码修改如下：

```
    import React, { Component } from 'react'
    import './login.styl'

    class Login extends Component {
        render() {
            return (
               <div class>
                    <h1>Login page</h1>
+                   <button onClick={this.gotoHome.bind(this)}>跳转Home页</button>
                </div>
            )
        }

+       gotoHome() {
+           this.props.history.push('/home')
+       }
    }

    export default Login
复制代码

```

注意 button 的 onClick 里要 bind(this)，否则，在 gotoHome 里的 this 是 undefined。

当然，也可以这么写：

```
<button onClick={() => {this.gotoHome()}}>跳转Home页</button>
复制代码

```

最终目的都是要让 gotoHome 中的 this 指向正确的作用域。

![](https://user-gold-cdn.xitu.io/2020/2/2/17005e0d89dbfb2e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

5 组件引入
------

这章节内容也很容易，接触过 vue 的同学应该也很清楚，为了教程的完整性，还是简单说一下。下面来简单实现一个公用的头部组件。

### 5.1 创建 header 组件

目录结构如下：

```
    |  ├─ /components   <-- 公共模块组件目录
+   |  |  ├─ /header    <-- 公用header组件
+   |  |  |  ├─ index.js 
+   |  |  |  └─ header.styl 
复制代码

```

src/components/header/index.js 代码：

```
import React, { Component } from 'react'
import './header.styl'

class Header extends Component {
    render() {
        return (
            <div class>
                Header
            </div>
        )
    }
}

export default Header
复制代码

```

src/components/header/header.styl 代码：

```
.M-header
    height: 40px
    line-height: 40px
    font-size: 36px
    color: #fff
    background: #409EFF
复制代码

```

### 5.2 引入 Header 组件

然后，在 Home 和 Login 页面里引入 Header 组件。

以 Home 页面为例，修改 src/pages/home/index.js：

```
    import React, { Component } from 'react'
+   import Header from '../../components/header'
    import './home.styl'

    class Home extends Component {
        render() {
            return (
                <div class>
+                   <Header />
                    <h1>Home page</h1>
                </div>
            )
        }
    }

    export default Home
复制代码

```

同样的方式在 Login 页面也引入 Header 组件，代码就不放出了。效果如下：

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c1c96afcebc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 5.3 组件传参

使用过 vue 的同学都知道，vue 组件有 data 和 props。对应 react 的是 state 和 props。

react 向子组件传参使用以下方式：

```
<Header 
    param1="abc"
    param2="c"
    func1={()=>{console.log('func1')}}
/>
复制代码

```

在 Header 组件内部，直接使用 this.props 就可以接收。例如：this.props.param1。

本次分享主要是介绍流程性的内容，篇幅有限，关于 react 的 state 和 props 请查阅官方文档。

6 React Developer Tools 浏览器插件
-----------------------------

为了更方便调试 react 项目，建议安装 chrome 插件。

先科学上网，在 chrome 网上应用店里搜索 “React Developer Tools” 并安装。

![](https://user-gold-cdn.xitu.io/2020/2/2/17005c22309bfc29?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

安装完成后，打开 chrome 调试工具，可以清晰的看到 react 项目代码结构。

![](https://user-gold-cdn.xitu.io/2020/2/2/17005e18e0cf35b7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


    