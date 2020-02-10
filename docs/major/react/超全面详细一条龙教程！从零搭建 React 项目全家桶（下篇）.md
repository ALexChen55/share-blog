---
title: 超全面详细一条龙教程！从零搭建 React 项目全家桶（下篇）
date: 2020-02-09
description: React 是近几年来前端项目开发非常火的一个框架，其背景是 Facebook 团队的技术支持，市场占有率也很高。很多初学者纠结一开始是学 react 还是 vue。个人觉得，有时间的话，最好两个都掌握一下。从学习难度上来说，react 要比 vue 稍难一些。万事开头难，但是掌握了 react 对于大幅提高前端技能还是非常有帮助的。本文一步步详细梳理了从创建 react、精简项目、集成插件、初步优化等过程。对于 react 开发者来说，能够节省很多探索的时间。下面请跟着我来一步步操作。
image: https://vuepress.vuejs.org/hero.png
---

在开始前，先回顾下【上篇】介绍的内容：

**1 创建 React-APP**

**2 精简项目**

2.1 删除文件

2.2 简化代码

2.3 使用 Fragment 去掉组件外层标签

**3 项目目录结构**

3.1 引入全局公用样式

3.2 支持 Sass/Less/Stylus

**4 路由**

4.1 页面构建

4.2 使用 react-router-dom

4.3 路由跳转

**5 组件引入**

5.1 创建 header 组件

5.2 引入 Header 组件

5.3 组件传参

**6 React Developer Tools 浏览器插件**

在本次的【下篇】中，继续分享以下内容：

先睹为快
----

**7 Redux 及相关插件**

7.1 安装 redux

7.2 安装 react-redux

7.3 安装 redux-thunk

7.4 安装浏览器 Redux 插件

7.5 创建 store

7.6 复杂项目 store 分解

7.7 对接 react-redux 与 store

7.8 启动 Redux DevTools

7.9 安装使用 immutable

**8 Mock.js 安装与使用**

**9 解决本地开发跨域问题**

**10 其他常用工具**

11 附赠章节：集成 Ant Design

11.1 安装 Ant Design

11.2 实现按需加载

11.3 自定义主题颜色

7 Redux 及相关插件
-------------

做过 vue 开发的同学都知道 vuex，react 对应的工具就是 Redux，当然还有一些附属工具，比如 react-redux、redux-thunk、immutable。

redux 涉及内容篇幅较多，可以单独作为一次分享。本次分享篇幅有限，仅简要介绍下安装部署流程，如有看不懂的地方可先跳过或自行查阅官方文档。

### 7.1 安装 redux

执行：

```
npm install  redux --save
复制代码

```

仅安装 redux 也是可以使用的，但是比较麻烦。redux 里更新 store 里的数据，需要手动订阅 (subscribe) 更新。可以借助另一个插件（react-redux）提高开发效率。

### 7.2 安装 react-redux

执行：

```
npm install react-redux --save
复制代码

```

react-redux 允许通过 connect 方法，将 store 中的数据映射到组件的 props，省去了 store 订阅。原 state 中读取 store 的属性改用 props 读取。

由于 store（7.5 小节）还没讲到，react-redux 使用方法在 7.6 小节介绍。

### 7.3 安装 redux-thunk

执行：

```
npm install redux-thunk --save
复制代码

```

redux-thunk 允许在 actionCreators 里返回函函数。这样可以把业务逻辑（例如接口请求）集中写在 actionCreator.js，方便复用的同时，可以使组件的主文件更简洁。

### 7.4 安装浏览器 Redux 插件

为了更方便跟踪 redux 状态，建议安装 chrome 插件。

先科学上网，在 chrome 网上应用店里搜索 “Redux DevTools” 并安装。

![](https://user-gold-cdn.xitu.io/2020/2/3/1700920f3046b748?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

安装完成后还不能直接使用，需要在项目代码中进行配置。接下来进行说明。

### 7.5 创建 store

安装以上各种插件后，可以 store 用来管理状态数据了。

如果项目比较简单，只有一两个页面，可以只创建一个总 store 管理整体项目。目录结构参考如下：

```
    ├─ /src   
+   |  ├─ /store
+   |  |  ├─ actionCreators.js
+   |  |  ├─ contants.js       <-- 定义方法的常量
+   |  |  ├─ index.js
+   |  |  └─ reducer.js
复制代码

```

以下是各文件的代码示例：

src/store/actionCreators.js:

```
import * as constans from './constants'

export const getData = (data) => ({
  type: constans.SET_DATA,
  data
})
复制代码

```

src/store/contants.js:

```
export const SET_DATA = 'SET_DATA'
复制代码

```

src/store/index.js:

```
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 这里让项目支持浏览器插件Redux DevTools
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(
  reducer,
  enhancer
)

export default store
复制代码

```

> 以上是 store 的核心代码，支持了 Redux DevTools。同时，利用 redux 的集成中间件（applyMiddleware）功能将 redux-thunk 集成进来，最终创建了 store。

src/store/reducer.js:

```
import * as constants from './constants'

// 初始默认的state
const defaultState = {
    myData: null
}

export default (state = defaultState, action) => {
    // 由于state是引用型，不能直接修改，否则是监测不到state发生变化的。因此需要先复制一份进行修改，然后再返回新的state。
    let newState = Object.assign({}, state)
    switch(action.type) {
        case constants.SET_DATA:
            newState.myData = action.data
            return newState
        default:
            return state
    }
}
复制代码

```

以上代码，我们在 store 设置了一个 myData。如何更好地解决 state 修改问题，在 7.8 小节会提到。

### 7.6 复杂项目 store 分解

应对更多页面的项目，如果数据都集中放在一个 store 里，其维护成本非常高。接下来分享下如何将 store 分解到各个组件中。

一般来说，每个组件有自己的 store，再由 src 下的 store 作为总集，集成每个组件的 store。

以 header 和 login 两个组件为例，分别创建组件自己的 store。

header 的 store 目录结构如下：

```
    |  |  ├─ /components
    |  |  |  ├─ /header
+   |  |  |  |  ├─ /store
+   |  |  |  |  |  ├─ actionCreators.js
+   |  |  |  |  |  ├─ contants.js      
+   |  |  |  |  |  ├─ index.js
+   |  |  |  |  |  └─ reducer.js
复制代码

```

组件 store 下的 index.js 代码如下：

```
import reducer from './reducer'
import * as actionCreators from './actionCreators'
import * as constants from './constants'

export { reducer, actionCreators, constants}
复制代码

```

其实就是把组件 store 下的其他文件集中起来作为统一输出口。

组件 store 下的 contants.js 代码如下：

```
const ZONE = 'components/header/'

export const SET_DATA = ZONE + 'SET_DATA'
复制代码

```

ZONE 是用来避免与其他组件的 contants 重名。

同样的方式，在 login 下进行创建 store（不再赘述）。

然后修改项目 src 下的总 store，目录结构变动如下：

```
    ├─ /src   
    |  ├─ /store
-   |  |  ├─ actionCreators.js <-- 删除
-   |  |  ├─ contants.js       <--删除
    |  |  ├─ index.js
    |  |  └─ reducer.js
复制代码

```

src/store/index.js 重写如下：

```
import { combineReducers } from 'redux'

import { reducer as loginReducer } from '../pages/login/store'
import { reducer as headerReducer } from '../components/header/store'

const reducer = combineReducers({
    login: loginReducer,
    header: headerReducer
})

export default reducer
复制代码

```

以上代码的作用就是把 login 和 header 的 store 引入，然后通过 combineReducers 合并在一起，并分别加上唯一的对象 key 值。

这样的好处非常明显：

1.  避免各组件的 store 数据互相污染
2.  组件独立维护自己的 store，减少维护成本

非常建议使用这种方式维护 store。

### 7.7 对接 react-redux 与 store

为了方便每个组件都能使用 store，而不用一遍一遍的引用 store。下面来对接 react-redux 与 store。

修改 src/index.js:

```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'
+   import { Provider } from 'react-redux'
+   import store from './store'
    import './common/style/frame.styl'

+   const Apps = (
+       <Provider store={store}>
+           <App />
+       </Provider>
+   )

M   ReactDOM.render(Apps, document.getElementById('root'))
复制代码

```

以上代码就是用 react-redux 提供的 Provider，把 store 传给了整个 App。

在需要使用 store 的组件中，要使用 react-redux 提供的 connect 方法对组件进行包装。

以 login 为例，修改 src/pages/login/index.js:

```
    import React, { Component } from 'react'
    import Header from '../../components/header'
+   import { connect } from 'react-redux'
+   import * as actionCreators from './store/actionCreators'
    import './login.styl'

    class Login extends Component {
        render() {
            return (
                <div class>
                    <Header />
                    <h1>Login page</h1>
+                   <p>login: myData = {this.props.myData}</p>
+                   <button onClick={()=> {this.props.getData('123456')}}>更改login的myData</button>
                    <button onClick={this.gotoHome.bind(this)}>跳转Home页</button>
                </div>
            )
        }

        gotoHome() {
            this.props.history.push('/home')
        }
    }

+   // 把store中的数据映射到组件的props
+   const mapStateToProps = (state) => ({
+       myData: state.getIn(['login', 'myData']),
+   })

+   // 把store的Dispatch映射到组件的props
+   const mapDispatchToProps = (dispatch) => ({
+       getData(data) {
+           const action = actionCreators.getData(data)
+           dispatch(action)
+       }
+   })

M   export default connect(mapStateToProps, mapDispatchToProps)(Login)
复制代码

```

最大的变化就是代码最后一行，被 connect 方法包装了。

然后把 store 里的 state 和 dispatch 都映射到了组件的 props。这样可以直接通过 props 进行访问了，store 中数据的变化会直接改变 props 从而触发组件的视图更新。

点击按钮后，可以看到页面中显示的 myData 发生了变化。

![](https://user-gold-cdn.xitu.io/2020/2/3/170092145b7f0fe6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

下面通过 Redux DevTools 进行可视化跟踪查看。

### 7.8 启动 Redux DevTools

经过 7.5 小节的设置，7.4 小节的 Redux DevTools 可以正常使用了。点击浏览器右上角的图标，在出现的面板里，可以相信地跟踪查看 store 里各数据的变化，非常方便。

![](https://user-gold-cdn.xitu.io/2020/2/3/1700921651927c2a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

还可以通过调试工具栏启动 Redux DevTools：

![](https://user-gold-cdn.xitu.io/2020/2/3/1700921814587f59?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

具体使用方法这里不赘述了。

### 7.9 安装使用 immutable

在 7.5 小节，提到了 store 里不能直接修改 state，因为 state 是引用类型，直接修改可能导致监测不到数据变化。

immutable.js 从字面上就可以明白，immutable 的意思是 “不可改变的”。使用 immutable 创建的数据是不可改变的，对 immutable 数据的任何修改都会返回一个新的 immutable 数据，不会改变原始 immutable 数据。

immutable.js 提供了很多方法，非常方便修改对象或数组类型的引用型数据。

安装 immutable 和 redux-immutable，执行：

```
npm install immutable redux-immutable --save
复制代码

```

然后对代码进行改造：

src/store/reducer.js:

```
-   import { combineReducers } from 'redux'
+   import { combineReducers } from 'redux-immutable'
    ...(略)
复制代码

```

以上代码就是把 combineReducers 换成 redux-immutable 里的。

然后修改 src/pages/login/store/reducer.js

```
    import * as constants from './constants'
+   import { fromJS } from 'immutable'

M   const defaultState = fromJS({
        myData: null
M   })

+   const getData = (state, action) => {
+       return state.set('myData', action.data)
+   }

    export default (state = defaultState, action) => {
        switch(action.type) {
            case constants.SET_DATA:
M               return getData(state, action)
            default:
                return state
        }
    }
复制代码

```

immutable 的介入，就是利用 fromJS 方法，把原始的 JS 类型转化为 immutable 类型。

由于 state 已经是 immutable 类型了，可以使用 immutable 的 set 方法进行数据修改，并返回一个新的 state。代码简洁很多，不需要手动通过 Object.assign 等方法去复制再处理了。

header 组件的代码修改同理不再赘述。

immutable 还有很多其他非常使用方法，具体请参阅官方文档：

> [immutable-js.github.io/immutable-j…](https://immutable-js.github.io/immutable-js/)

8 Mock.js 安装与使用
---------------

在开发过程中，为了方便前端独自调试接口，经常使用 Mock.js 拦截 Ajax 请求，并返回预置好的数据。本小节介绍下如何在 react 项目中使用 Mock.js。

执行安装：

```
npm install mockjs --save
复制代码

```

在 src 下新建 mock.js，代码如下：

```
import Mock from 'mockjs'

const domain = '/api/'

// 模拟getData接口
Mock.mock(domain + 'getData', function () {
    let result = {
      code: 200,
      message: 'OK',
      data: 'test'
    }
    return result
})
复制代码

```

然后在 src/index.js 中引入 mock.js:

```
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'
    import { Provider } from 'react-redux'
    import store from './store'
+   import './mock'
    import './common/style/frame.styl'

    ...（略）
复制代码

```

如此简单。这样，在项目中请求`/api/getData`的时候，就会被 Mock.js 拦截，并返回 mock.js 中写好的数据。

9 解决本地开发跨域问题
------------

在 react 开发环境中，默认启动的是 3000 端口，而后端 API 服务可能在本机的 80 端口，这样在 ajax 请求的时候会出现跨域问题。可以借助 http-proxy-middleware 工具实现反向代理。

执行安装：

```
npm install http-proxy-middleware --save-dev
复制代码

```

在 src 下创建 setupProxy.js，代码如下：

```
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '^/api',
        proxy({
            target: 'http://localhost',
            changeOrigin: true
        })
    )
}
复制代码

```

这代码的意思就是，只要请求地址是以 "/api" 开头，那就反向代理到 http://localhost 域名下，跨域问题解决！大家可以根据实际需求进行修改。

> ※注意：setupProxy.js 设置后，一定要重启项目才生效。

10 其他常用工具
---------

1.  Axios - Ajax 请求工具

【官网】[github.com/axios/axios](https://github.com/axios/axios)

【安装命令】

```
npm install axios --save
复制代码

```

2.  better-scroll - 页面原生滚动体验效果工具

【官网】[ustbhuangyi.github.io/better-scro…](http://ustbhuangyi.github.io/better-scroll/doc/)

【安装命令】

```
npm install better-scroll --save
复制代码

```

3.  react-transition-group - CSS3 动画组合工具

【官网】[github.com/reactjs/rea…](https://github.com/reactjs/react-transition-group)

【安装命令】

```
npm install react-transition-group --save
复制代码

```

4.  react-loadable - 动态加载组件工具

【官网】[www.npmjs.com/package/rea…](https://www.npmjs.com/package/react-loadable)

【安装命令】

```
yarn add react-loadable
复制代码

```

11 附赠章节：集成 Ant Design
---------------------

Ant Design 是非常好用的前端 UI 库，很多项目都使用了 Ant Design。

【官网】

> [ant.design/index-cn](https://ant.design/index-cn)

本章节内容基于上述章节将 create-react-app 进行 eject 后集成 Ant Design。


