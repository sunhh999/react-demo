// 隔代传参数 hooks 版本

import {  useContext } from 'react'
import Context from './contex'

// 1.创建上下文
// const Context = createContext()

function Child() {
  // 2.使用上下文
  const ctx = useContext(Context)
  return (
    <div>
      <h2>Child 组件</h2>
      <p>姓名：{ctx.name}</p>
      <p>年龄：{ctx.age}</p>

      <Child2/>
        
    </div>
  )
}

function Child2() {
  // 2.子组件的子组件 使用上下文
  const ctx = useContext(Context)
  return (
    <div>
      <h2>Child2 组件</h2>
      <p>姓名：{ctx.name}</p>
      <p>年龄：{ctx.age}</p>
    </div>
  )
}

function App() {
  return (
    // <Context.Provider value={{ name: '小明', age: 18 }}>
      <div>
        <Child />
      </div>
    // </Context.Provider>
  )
}

export default App
