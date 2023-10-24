import React from 'react'

// 函数组件的创建和渲染
// 创建
function Hello() {
  return <div>hello</div>
}

// 类组件
class HelloComponeny extends React.Component {
  render() {
    return <div>this is class Component</div>
  }
}

function App() {
  return (
    <div className="App">
      {/* 渲染hello组件 */}
      <Hello></Hello>

      {/* 渲染class 类组件 */}
      <HelloComponeny></HelloComponeny>
    </div>
  )
}

export default App
