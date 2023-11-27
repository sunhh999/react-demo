import { useState } from 'react'

/**
 * userState
 * 1.导入useState 函数 react
 * 2.执行这个函数并且传入初始值
 * 3.[数据，修改数据的方法]
 * 4.使用数据修改数据
 */

/**
 * 状态的读取和修改
 * const [count, setCount] = useState(0)
 * 1.useState 传过来的参数 作为 count的初始值 
 * 2.[count, setCount] 这里的写法是一个结构赋值 useState 返回值是一个数组
 *   名字可以是任何值 但是要和 useState 传过来的参数一致 保持语义一致
 * 3.setCount 是一个函数 用来修改 count 的值 以来保持不能直接修改 count的原来值，还是生成一个新值替换原值setCount
 */


// 首次渲染

// 首次被渲染的时候组件内部的代码会被执行一次
// 其中useState也会跟着执行这里重点注意初始值只在首次渲染时生效

//更新渲染
//  setCount都会更新

function App() {
  // count :数据状态
  // setCount :修改count状态的专有函数
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>计数器</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>{count}</p>
    </div>
  )
}

export default App
