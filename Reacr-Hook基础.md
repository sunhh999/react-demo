# Hooks

## 什么是Hooks

> Hooks的本质:一套能够使函数组件更加强大，更加**灵活的钩子**

React体系里分 **类组件**和 **函数组件**

函数组件是一个更加匹配React的设计理念 `UI=f(data)`，也更有利于逻辑拆分与重用的组件表达形式,而**先前的函数组件是不可以有自己的状态的**,为了能让函数组件可以拥有自己的状态，所以从 **reactV16.8开始 Hooks 应运而生**

**⚠️注意点**

1. 有了Hooks 之后,为了兼容老版本，class 类组件并没有被移除,两者都可以使用
2. 有了Hooks之后，不能再把函数当成无状态组件了，因为hooks 胃函数组件提供了状态
3. **Hooks只能在函数组件中使用⚠️**



### 2.Hooks 解决了什么问题

Hooks的出现解决了两个问题 1.组件的状态逻辑复用 2.class组件自身的问题

1. 组件的逻辑复用

2. class 组件自身的问题

   class 组件就像一个厚重的 ==战舰==  一样 大而全，提供了很多东西，有不可忽视的学习成本，比如各种生命周期，this指向问题等等，而我们更多时间需要的是一个轻快灵活的 ==快艇==



### 3.Hooks 优势总结

1. 告别难以理解的Class
2. 解决业务逻辑难以拆分的问题
3. 使状态逻辑复用变得简单可行
4. 函数租价你的在设计思想上，更加契合React 的理念



## 1.hooks-useState

- 只能出现在函数组件中
- 不能嵌套在 if / for /其他函数中 (**react按照hooks 的顺序识别每一个hook**)
- 可以通过开发者工具查看 hooks 状态

```js
import { useState } from 'react'

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
```



### useState 的初始值

```js

function App() {
// 可以直接讲默认值传入
  const [count, setCount] = useState(0)

  // useState 可以以函数的模式设置 初始值
  // 可以进行计算得到所谓的初始值
  const [name,setName] = useState(()=>{
    return 'hello'
  })

  (
    <div>
      <h2>useState 默认初始值 可以设置为函数模式</h2>
      <span>{name}</span>
      <button onClick={() => {setName('name初始值变化') }}>name的初始值可以为函数</button>

    </div>
  )
}

```



## 2.hooks-useEffect

> 副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于React组件来说，主要作用是根据数据（**state/props**）渲染UI，除此之外都是副作用（比如,手动修改DOM）



### 基本使用

最常见的副作用- 副作用主要是在来**在函数组件中触发,组件外部内容发生改变的方法**

1. 数据请求 axjs 请求
2. 手动修改DOM
3. loaclstorage 操作

useEffect 函数的作用就是为**react** 函数组件提供副作用处理的

 **1.导入useEffect函数**

 **2.在函数组件中执行 传入回调 并且定义副作用**

 **3.当修改状态更新组件时，副作用也会不断执行**

```js
function App() {
  // count :数据状态
  // setCount :修改count状态的专有函数
  const [count, setCount] = useState(0)

  // 函数副作用
  useEffect(() => {
    document.title = `当前计数为${count}`
  })

  return (
    <div>
      <h1>计数器</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>{count}</p>

      <h1>函数副作用</h1>
      {/* 触发方法 useEffect 方法是在函数内部 去修改函数外部变量的方法 */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
```



### 依赖项控制副作用的执行时机

##### 1.默认状态(无依赖项)

>   组件初始化的时候先执行一次 等到**每次数据修改** 组件更新再次会执行

```js
import { useState, useEffect } from 'react'

function App() {
  // count :数据状态
  // setCount :修改count状态的专有函数
  const [count, setCount] = useState(0)

  // 副作用
  useEffect(() => {
    document.title = `当前计数为${count}`
  })

  return (
    <div>
      <h1>函数副作用</h1>
      {/* 触发方法 useEffect 方法是在函数内部 去修改函数外部变量的方法 */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
```



##### 2.添加空数组

>   组件只在首次渲染时执行一次

```js
import { useState, useEffect } from 'react'

function App() {
  // count :数据状态
  // setCount :修改count状态的专有函数
  const [count, setCount] = useState(0)

  // 副作用
  useEffect(() => {
    document.title = 1
  },[]) // 此时副作用函数 只会在首次执行一次 之后不会再次执行

  return (
    <div>
      <h1>函数副作用</h1>
      {/* 触发方法 useEffect 方法是在函数内部 去修改函数外部变量的方法 */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
```



##### 3.添加特定依赖项

>   **useEffect** 副作用函数在首次渲染时执行，在**指定依赖项**发生变化时会重新执行

```js
import { useState, useEffect } from 'react'

function App() {
  // count :数据状态
  // setCount :修改count状态的专有函数
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `当前计数为${count}`
    console.log('当前计数为', count);
  },[count]) // 添加指定依赖项 useEffect 只会在首次以及指定依赖更改的时候才会再次执行

  return (
    <div>
      <h1>函数副作用</h1>
      {/* 触发方法 useEffect 方法是在函数内部 去修改函数外部变量的方法 */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
```



### useEffect 清除副作用

```js
// 带有副作用操作的子组件
function UseEffectFn() {
  useEffect(() => {
    console.log('副作用')
 //  定时器
    const timer = setInterval(() => {
      console.log('setInterval,副作用一直在运行')
    }, 1000)

    // 当子组件消失的时候 副作用中的定时器就会被清除掉
    return () => {
      console.log('清理副作用')
      clearInterval(timer)
    }
  })

  return (
    <div>
      <h2>函数副作用</h2>
    </div>
  )
}

```



```js
function App() {
   //  控制组件是否展示
  const [flag, setFlag] = useState(true)

  return (
    <div style={{ height: '1200px' }}>
    
      <h2>函数副作用 函数被消除的时候 清除副作用</h2>
      <span>{flag ? <UseEffectFn/>: '函数副作用被消除'}</span>
      <button onClick={() => setFlag(!flag)}>切换flag,函数副作用的内容就被消除掉</button>
    </div>
  )
}
```



### useEffect 发送网络请求

```js
// useEffect 发送网络请求
function FetchData() {
  useEffect(() => {
    console.log('副作用中发送网络请求')

     //  fetch  提供的原生发送网络请求的API
    const res = fetch('https://api.github.com/users').then(res => res.json())

    res.then((resData) => {
      console.log(resData)
    })
  })
}
```



### 注意

useEffect 回调函数中用到的数据 (比如 count) 就是依赖数据，就应该出现在依赖数组中，如果不添加依赖项就会**有BUG出现**

### 练习

#### 1.检测 窗口滚动的高度

```js
import { useEffect, useState } from 'react'

// Hooks

// 实时检测 窗口滚动的高度
export function useWindowsScroll() {
  const [Y, setY] = useState(0)

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      const h = window.document.documentElement.scrollTop
      setY(h)
    })
  })

  return [Y]
}
```

使用

```js
import { useWindowsScroll } from './hooks/useWindowScroll'

function App() {
  const [Y] = useWindowsScroll()

  return (
    <div style={{ height: '1200px' }}>
      {/* 函数副作用的实战实用 */}
      <h2>useEFFect函数使用：监控窗口滚动的高度{Y}</h2>
      <span>{Y}</span>
    </div>
  )
}

```



#### 2.自动同步到本地 loaclStorage

```js
import { useEffect, useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [message, setMessage] = useState(defaultValue)

  // 每次只要 message 变化 就会自动将最新的message 自动同步存储到 本地 localStorage
  useEffect(() => {
    window.localStorage.setItem(key, message)
  }, [message, key])
  return [message, setMessage]
}

```

```js
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [message, setMessage] = useLocalStorage('message', 'hello world') // 读取本地存储的数据

  setTimeout(() => {
    setMessage('message',' hello React')
  }, 5000);

  return (
    <div>
      <h2>useEffect函数：将使用的message 自动存储在message中</h2>
      <span>{message}</span>
    </div>
  )
}

export default App
```



## 3.hook-useRef

>   用来获取真实的DOM元素的方法

#### 基本使用

```js

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

// 注意class 组件获取的Ref内容和函数组件获取到的不一样
class ClassText extends React.Component {
  
  render() {
    return (  
      <div>
        <h2>classText 测试组件</h2>
      </div>
    );
  }
}

```



## 4.hooks-useContext

>   隔代传参 

```js
// 隔代传参数 hooks 版本

import { createContext, useContext } from 'react'

// 1.创建上下文
const Context = createContext()

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
    <Context.Provider value={{ name: '小明', age: 18 }}>
      <div>
        <Child />
      </div>
    </Context.Provider>
  )
}

export default App
```



## hooks - useContext 拓展

### 静态使用

当传入的内容是静态的 就可以在` index.js` 文件中 集中管理  `context`

使用`useContext` 的值是静态的并且不会随意的修改，那么可以在index.js 文件中管理

创建 全局上下文内容

`context.js`

```js
// 1.调用createContext，创建上下文
// 2.通过顶层组件包裹一下 Context.Provider
// 3.底层通过 useContext 获取上下文的值

import { createContext } from 'react'

const Context = createContext()

export default Context

```

`Index.js 主文件引入`

```js
// 引入
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
    // 全局挂载
  <Context.Provider value={{ name: '小明', age: 20 }}>
    <App />
  </Context.Provider>
  // </React.StrictMode>
)
```

项目中引入使用

```js
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
```



### 动态使用

>   如果传递的值是动态的 需要计算的 那么可以在 `app.js` 文件中配置

```js
// 隔代传参数 hooks 版本

import { createContext, useContext } from 'react'



// 1.创建上下文
const Context = createContext()

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
    <Context.Provider value={{ name: '小明', age: 18 }}>
      <div>
        <Child />
      </div>
    </Context.Provider>
  )
}

export default App
```

