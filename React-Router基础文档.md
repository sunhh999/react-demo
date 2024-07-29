# Router 课程目录

中文文档地址：https://react-guide.github.io/react-router-cn/

github地址：https://github.com/remix-run/react-router

npm 下载地址 ：yarn add react-router-dom @6



## 基本使用

安装 router-dom@6

```bash
npm install react-router-dom@6
```



## 核心组件-基本使用

```js
// react-router-dom

// 1.引入子页面
import Home from './views/Home.js'
import About from './views/About.js'
// 2.引入 react-router-dom
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

/* 
  基础使用
  
  BrowserRouter 路由容器
  Link 路由链接
  Routes 路由出口
  Route 路由对应的组件
*/

function App() {
  return (
    <div className="App">
      <h1>3.使用路由</h1>
      {/* BrowserRouter 声明 用的是一个 非hash模式的路由 */}
      <BrowserRouter>
      {/* Link 指定跳转的组件 to用来配置跳转的路由地址 */}
        <Link to={'/'} style={{ marginRight: '20px' }}>
          首页
        </Link>
        <Link to={'/about'}>关于</Link>

        <h2>4.路由展示区域 中间不能放除了route 以外的内容 否则会报错</h2>
        {/* 路由出口 路由对应的展示会在这里进行渲染 */}
        <Routes>
          {/* 
            Route 指定路径和组件的对应关系 
            path 路由地址
            element 组件
            两者必须同时存在 否则会报错
           */}
          <Route path={'/'} element={<Home />}></Route>
          <Route path={'/about'} element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

```



## 编程式导航(跳转与参数)





## 嵌套路由
