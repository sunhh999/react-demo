import React,{ useState, useEffect, useRef } from 'react'
import { useWindowsScroll } from './hooks/useWindowScroll'
import { useLocalStorage } from './hooks/useLocalStorage'

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

// useEffect 副作用
/* 
 1.导入useEffect函数
 2.在函数组件中执行 传入回调 并且定义副作用
 3.当修改状态更新组件时，副作用也会不断执行
*/

class ClassText extends React.Component {
  
  render() {
    return (  
      <div>
        <h2>classText 测试组件</h2>
      </div>
    );
  }
}


// useEffect 发送网络请求
function FetchData() {
  useEffect(() => {
    console.log('副作用中发送网络请求')

    const res = fetch('https://api.github.com/users').then((res) => res.json())

    res.then((resData) => {
      console.log(resData)
    })
  })

  return (
    <div>
      <h2>useEffect 发送网络请求</h2>
    </div>
  )
}

// useRef 的时候 获取dom元素
function DomRef() {
  const HtmlRef = useRef(null)
  const useEffRef = useRef(null)
  

  // 打印DOM元素的函数
  function getRefDom() {
    console.log(HtmlRef.current,'html的DOM元素')
    console.log(useEffRef,'函数组件的函数内容');
  }

  return (
    <div>
      <h3>直接获取Html标签</h3>
      <div ref={HtmlRef}>useRef 获取dom元素</div>
      <button
        onClick={() => {
          getRefDom()
        }}>
        获取dom元素
      </button>
      <h3>获取函数组件</h3>
      <ClassText ref={useEffRef}/>
    </div>
  )
}

// useEffect 函数副作用 清除
function UseEffectFn() {
  useEffect(() => {
    console.log('副作用')

    const timer = setInterval(() => {
      console.log('setInterval,副作用一直在运行')
    }, 1000)

    return ()=>{
      console.log('清理副作用')
      clearInterval(timer)
    }
  },[])

  return (
    <div>
      <h2>函数副作用</h2>
    </div>
  )
}

function App() {
  // count :数据状态
  // setCount :修改count状态的专有函数
  const [count, setCount] = useState(0)

  const [name, setName] = useState(() => {
    return 'hello'
  })

  const [flag, setFlag] = useState(true)

  useEffect(() => {
    document.title = `当前计数为${count}`
    console.log('当前计数为', count)
  }, [count]) // 添加指定依赖项 useEffect 只会在首次以及指定依赖更改的时候才会再次执行

  const [Y] = useWindowsScroll()
  const [message, setMessage] = useLocalStorage('message', 'hello world') // 读取本地存储的数据

  setTimeout(() => {
    setMessage('message', ' hello React')
  }, 5000)

  return (
    <div style={{ height: '1200px' }}>
      <h1>计数器</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>{count}</p>

      <h2>useState 默认初始值 可以设置为函数模式</h2>
      <span>{name}</span>
      <button
        onClick={() => {
          setName('name初始值变化')
        }}>
        name的初始值可以为函数
      </button>

      <h1>函数副作用</h1>
      {/* 触发方法 useEffect 方法是在函数内部 去修改函数外部变量的方法 */}
      <button onClick={() => setCount(count + 1)}>{count}</button>

      {/* 函数副作用的实战实用 */}
      <h2>useEFFect函数使用：监控窗口滚动的高度{Y}</h2>
      <span>{Y}</span>

      <h2>useEffect函数：将使用的message 自动存储在message中</h2>
      <span>{message}</span>

      <h2>函数副作用 函数被消除的时候 清除副作用</h2>
      <span>{flag ? <UseEffectFn /> : '函数副作用被消除'}</span>
      <button onClick={() => setFlag(!flag)}>切换flag,函数副作用的内容就被消除掉</button>

      <h2>useEffect中发送网络请求</h2>
      <FetchData />


      <h2>useRef 获取DOM元素</h2>
      <DomRef />
    </div>
  )
}

export default App
