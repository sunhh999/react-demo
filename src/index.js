import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import './pages/rem.js'

import Context from './contex'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // 严格模式节点 去掉
  // useEffect 的执行时机
  // 1. 严格模式下，会执行两次
  // 2. 严格模式下，useEffect 会执行两次
  // 3. 严格模式下，useLayoutEffect 会执行两次
  // 4. 严格模式下，useLayoutEffect 会比 useEffect 先执行
  // <React.StrictMode>
  <Context.Provider value={{ name: '小明', age: 20 }}>
    <App />
  </Context.Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
