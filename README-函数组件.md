# Jsx

- 原则：模板中的逻辑尽量保持精简
- 负责的多分支的逻辑 收敛为一个函数 通过一个专门的函数来写分支逻辑，模板中只负责调用

## Jsx样式处理

style

- 行内样式 `style`

```js
function App(){
  return (
  	<div className="App">
  		<div style={{color:'red'}}>this is a div </div>
	  </div>
  )
}

export default App
```

- 行内样式 - style 更有效的写法

```js
const styleObj = {
  color:red
}

function App(){
  return (
    <div className="App">
			<div style={styleObj}>this is a div </div>
    <div>
  )
}Ï
export default App
```



class类名样式 常用

- 等同于按文件分类处理内容
- 区别为 react  className 绑定类名
- 可以使用三元表达式`className={active? '类名':''}`



## 注视事项

1. JSX必须有一个**根节点**，如果没有根节点，可以使用`<></>`(**幽灵节点**)替代
2. 所有标签必须形成，**成对闭合**或者**自闭合**都可以
3. JSX中的语法更加贴近JS语法，属性名采用驼峰命名发`class -> className for -> htmlFor`
4. JSX支持 多行、换行，如果需要换行，需使用`()`包裹，防止bug出现





# 组件函数



## 函数组件

**约定说明**

1. 组件的名称必须**首字母**大写，react 内部会根据这个来判断是组件还是普通的 HTML 标签
2. 函数组件必须有返回值，表示该组件的 UI 机构，如果不需要渲染任何内容，则返回**null**
3. 组件就想 HTML 标签一样可以被渲染到页面中。组件表示的是一个段结构内容，对于函数组件来说，渲染的内容是函数组件的**返回值**就是对应的内容
4. 使用**函数名**称作为**组件标签名称**，可以成对出现也可以自闭合

```jsx
function Hello(){
	return <div>hello</div>
}

// 基础渲染
<Hello/> 首字母必须是大写
```



## 类组件

- **类组件**也**必须是以大写字母开头**
- 类组件是以 **extends** 继承**React.Component**父类，从而使用父类中提供的方法或属性
- 
- 
- 类组件必须提供**render**方法，必须有返回值，表示该组件的 UI 结构

```jsx
import React from 'react'

// 类组件
class HelloComponent extends React.Component(
	render(){
  	return <div>this is class Component</div>
  }
)

// 类组件渲染
function App(){
  return(
  	<>
    {/*类组件渲染*/}
    <HelloComponent/></HelloComponent>
    </>
  )
}
```



## 事件绑定

- 语法 on + 事件名称,比如 **比如<div onClick=(()=>{})/><div>**
- 注意点：react 事件采用驼峰命名法，比如：`onFocus` `onClick`

```js

// 函数组件
function Hello(){
  const clickHandleer =()=>{
    console.log('函数组件中的事件被触发。。。。');
  }

  return <div onClick={clickHandleer}>Hello</div>
}

// 类组件
class HelloComponent extends React.Component{
  // class 组件不能是用函数声明式去生命函数
    clickHandle=()=>{
      console.log('类组件中的事件被触发。。。。');
  }
  render(){
    // 使用this.的方法直接调用即可
    return <div onClick={this.clickHandle}>Hello Component</div>
  }
}

```

### 获取事件对象

- 听过传入形成就可以获取到默认的事件对象

```js

// 函数组件
function Hello() {
  // e 为形参数
  const clickHandleer = (e) => {
    // 阻止默认行为
    e.preventDefault()
    console.log(e, '函数组件中的事件被触发。。。。')
  }

  return (
    <div>
      <a onClick={clickHandleer} href="www.baidu.com">
        Hello
      </a>
    </div>
  )
}
```

==!注意==

获取自定义事件参数

```js
// 函数组件 传递参数
function Hello() {
  // e 事件对象 默认
  // msg 传递的参数
  const clickHandleer = (e,msg) => {
    console.log(e, msg)
  }

  return (
    <div onClick={(e)=>clickHandleer(e,'传递参数')}>
     click me
    </div>
  )
}
```





## 组件状态

> 在react hook 出来之前，函数式组件式没有自己的状态的，所以通过类组件来讲解步骤：初始化步骤 ->读取状态 -> 修改状态 ->影响视图

注意点：

- **数组驱动视图 只要修改数据状态**，那么页面就会自动刷新，无需手动操作Dom
- **不要直接修改 state 中的值，必须通过 setState 方法进行修改**

```jsx
import React from 'react'

// 数组驱动视图 只要修改数据状态，那么页面就会自动刷新，无需手动操作Dom
export default class classComState extends React.Component {
  // 1.定义组件状态
  // 注意：不要直接修改 state 中的值，必须通过 setState 方法进行修改
  state = {
    count: 0
  }

  // 2.修改状态
  // setState 方法 
  // 2.1 修改state 中的数据状态
  // 2.2 更新UI
  setCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    // 读取状态
    // 3. 读取状态
    return <button onClick={this.setCount}>计数器{this.state.count}</button>
  }
}
```



注意点：

1. 编写组件其实就是编写原生js类或者函数
2. 定义状态必须通过state 实例属性的方法 提供一个对象 名称是固定的就叫做 state
3. 修改 state 中的任何属性 都不可以通过直接修改赋值 必须走 setState 方法 这个方法来自于继承得到
4. 这里的this 关键词 很容易出现指向错误的错误 上面的写法是最推荐和最规范的 没有this 指向问题



## this问题说明

> 你必须谨慎对待JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this。handleclick 并把它传入了 onclick，当你调用这个函数的时候 this 的值为 undefined。这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加（），例如 onClick={this。handleclick}，你应该为这个方法绑定 this。
>

- 使用箭头函数也可以解决 this 指向的问题
  - 如果不在 constructor 中修改this 指向问题 

```js
import React from 'react';

// this 有问题的写法
class Test extends React.Component {
  
  constructor(
  	 super() // 调用继承过来的参数
		
  	 // 使用bind 强行修证 this 的指向
     // 相当于在类组件初始化的解读啊 就可以把毁掉函数的this修正到永远指向当前组件的实例化对象
     this.handler = this.handler.bind(this)
	)
  
  handler () {
    console.log(this)
    // this.setState 去修改数据还可以吗 ? 不可以 会报错
  }

  render(){
    return (
    	<button onClick={this.handler}>click </button>
    )
  }
}
```



## 表单处理

### 受控组件

- 受控组件就是可以被 react 的状态控制的组件
- React组件的状态的地方是在state中，input表单元素也有自己的状态是在Value中，React将state 与sate表单元素的值（value）绑定到一起，有state的值来控制表单元素的值，从而保证单一数据源特性

```jsx
import React from 'react'

export default class InputComState extends React.Component {
  state = {
    message: 'this is a message'
  }

  onInputChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return <input type="text" onChange={this.onInputChange} value={this.state.message} />
  }
}
```



- 非受控
  - 非受控组件就是通过手动操作dom的方式获取文本框的值,文档框的状态不受react组件的state 中的状态控制，直接通过原声DOM获取输入框的值
  - 使用 createRef 方法 获取DOM元素的值

```jsx
import React,{createRef} from 'react'

// 不受控组件
export class InputComStateRef extends React.Component {
  // 通过 ref获取到DOM 的值
  msgRef = createRef()

  onButtonClick = () => {
    console.log(this.msgRef.current.value)
  }

  render() {
    return (
      <>
        {/* 通过使用 ref 绑定DOM元素 */}
        <input type="text" ref={this.msgRef} />

        <button onClick={this.onButtonClick}>获取DOM元素的内容</button>
      </>
    )
  }
}

```





# 组件通信

## props 组件

- 传递的参数不受限制
  - 特别注意 JSX 函数 数据类型
- 传递的内容是只读的 不能修改
- 可以在入**形参**的地方 解构赋值 接受
- 可以在代码中使用 `const {传递的参数名} = props]`



### 父传子通信

- 子组件访问的参数 是父组件传递数据所有的**参数名**

```js
// 类子组件 接受父组件数据
class ChildComponent extends React.Component {
  render() {
    // 类组件必须使用this 关键词才能获取到props上的数据
    return <div>我是`ChildComponent`:接受到的父组件的数据{this.props.msg}</div>
  }
}

// 函数组件 接受父组件数据
function ChildComponent2(props) {
  // props 是一个对象 里面存储了父组件传递过来的数据
  return <div>我是`ChildComponent2`:接受到的父组件的数据{props.msg}</div>
}



class App extends React.Component {
  state = {
    name: '父组件的数据'
  }

  render() {
    return (
      <div className="App">
        {/* 类子组件 */}
        <ChildComponent msg={this.state.name}></ChildComponent>

        {/* 函数组件 */}
        <ChildComponent2 msg={this.state.name}></ChildComponent2>
      </div>
    )
  }
}

export default App
```



#### 子传父通信

- 子组件调用父组件传递过来的函数,并且把想要传递的数据当成函数的实参
- 父组件将函数传递给子组件之后，子组件如何调用都没有限制,  

```jsx
// 函数组件 接受父组件数据
function ChildComponent2({ msg, getChildMsg }) {
  // props 是一个对象 里面存储了父组件传递过来的数据
 // getChildMsg 父组件用来接受子组件的参数事件
  return (
    <>
      <div>我是`ChildComponent2`:接受到的父组件的数据{msg}</div>
      {/* getChildMsg('ChildComponent2组件的数据2') 立即执行 */}
      {/* ()=> getChildMsg('ChildComponent2组件的数据2') 触发执行 */}
      <button type="button" onClick={() => getChildMsg('ChildComponent2组件的数据2')}>
        ChildComponent2组件的数据 将子数据传递给父组件
      </button>
    </>
  )
}



// 父组件
class App extends React.Component {

  getChildMsg = (msg) => {
    console.log('本身数据', '接受数据', msg)
  }

  render() {
    return (
      <div className="App">
        {/* 函数组件 */}
        <ChildComponent2 getChildMsg={this.getChildMsg} msg={this.state.name}></ChildComponent2>
      </div>
    )
  }
}
```



知识点：

```jsx

// 函数组件 接受父组件数据
function ChildComponent2({ msg, getChildMsg }) {
  // props 是一个对象 里面存储了父组件传递过来的数据

  // 子组件如何调用父组件不受限制
  // 只要能触发就能使用
  function ContentFn() {
    console.log('1');
    getChildMsg('ChildComponent2组件的数据2')
  }

  return (
    <>
      <div>我是`ChildComponent2`:接受到的父组件的数据{msg}</div>
      {/* getChildMsg('ChildComponent2组件的数据2') 立即执行 */}
      {/* ()=> getChildMsg('ChildComponent2组件的数据2') 触发执行 */}
      <button type="button" onClick={() => ContentFn()}>
        ChildComponent2组件的数据 将子数据传递给父组件
      </button>
    </>
  )
}
```



## 兄弟组件通信

- 状态提升 -- 通过公共的父组件管理这个状态

```js

// 兄弟组件传值

// 兄弟组件1
// 通过公共的父组件传递数据
function BrotherComponent1({ getBrotherMsg }) {
  return (
    <>
      <div>BrotherComponent1</div>
      <button
        onClick={() => {
          getBrotherMsg('BrotherComponent1的传递的数据')
        }}>
        Brother1 button
      </button>
    </>
  )
}

// 兄弟组件2
function BrotherComponent2({ BorderVal }) {
  return (
    <>
      <div>BrotherComponent2</div>
      <div>接受到兄弟组件传递的数据：{BorderVal}</div>
    </>
  )
}

// 公共父组件
class App extends React.Component {
  state = {
    // 接受子组件接受的数据
    BorderVal: ''
  }

  // 兄弟组件传值 父组件进行接受
  getBrotherMsg = (msg) => {
    console.log('父组件进行接受', msg)
    // 父组件存储 border 组件传递过来的数据
    this.setState({
      BorderVal: msg
    })
  }

  render() {
    return (
      <div className="App">
        {/* 兄弟组件 传递 1 */}
        <BrotherComponent1 getBrotherMsg={this.getBrotherMsg}></BrotherComponent1>
        {/* 兄弟组件 接受 2 */}
        <BrotherComponent2 BorderVal={this.state.BorderVal}></BrotherComponent2>
      </div>
    )
  }
}

```





## 跨组件通信

- react 中完成这个功能的是 **context**
  - Vue 中 隔代数据传参
    - provide  提供数据
    - inject  接受数据

实现步骤

- 创建 Context 对象 导出 **Provider ｜ 提供数据** 喝 **Consumer ｜消费者** 对象

```jsx
const {Provider, consumer } = createContext() 
```

- 使用 Provider 包裹根组件提供数据

```jsx
<Provider value={this.state.message}>

{根组件}
<Provider/>
```

- 需要用到数据的组件使用 Consumer 包裹获取数据

```jsx
<Consumer >
 {valie = > /* 基于context 值进行渲染}
</Consumer>
```



## React组件进阶

### 特殊的 children

- 只要在组件标签的内部写了任何的内容，都是传递给children 属性
  - children 内部可以展示的内容
    - 普通文本
    - 普通标签元素
    - 函数
    - JSX

```js
// 函数组件 接受父组件数据
function ChildComponent2({chidren }) {
  // props 是一个对象 里面存储了父组件传递过来的数据
 // getChildMsg 父组件用来接受子组件的参数事件
  return (
    <>
      <div>我是`ChildComponent2`:接受到的父组件的数据{msg}</div>
     
      <button type="button>
       	可以接受到 父组件在子组件中写的内: {{chidren }}
      </button>
    </>
  )
}



// 父组件
class App extends React.Component {

  getChildMsg = (msg) => {
    console.log('本身数据', '接受数据', msg)
  }

  render() {
    return (
      <div className="App">
        {/* 函数组件 */}
        <ChildComponent2>
          内容可以被children 接受
				</ChildComponent2>
      </div>
    )
  }
}
```



### props 类型效验

1. react 的效验需要使用 `prop-types` 包
2. `yarn add prop-types`
3. 使用 `组件名.protypes = {}` 给组件添加效验规则

**四种常见结构**

1. 常见类型：array、bool、func、number、object、string

2. React元素类型：element
3. 必填项：isReauired
4. 特定的机构对象: shape({})

```js
// 常见类型
optionalFun:ProTypes.func

// 必选
requiredFunc:ProTypes.func.isRequired

// 特定结构的对象
optionalobjectwithShape: PropTypes.shape({ color: 	 PropTypes.string,
fontSize: PropTypes.number
})
```

官方文档：https://zh-hans.react.dev/reference/react/Component#props

```js

PropVerify.propTypes = {
  // 需要一个 list 是必须传递的参数
  list:PropTypes.array.isRequired
}

// 类型效验
function PropVerify (){
  return (
    <>
      <div>PropDefault</div>
    </>
  )
}


class App extends React.Component {

  render() {
    return (
        {/* 组件效验 prop */}
        <PropVerify></PropVerify>
      </div>
    )
  }
}
```



### 传递参数默认值

#### 函数function

```js
// 函数组件的默认值
function PropFnDefault({pageSize =20}) {
  return (
    <>
    <div>{pageSize}</div>
    </>
  )
}
```



第二种

```js

// 函数组件的默认值
function PropFnDefault({pageSize}) {
  return (
    <>
    <div>{pageSize}</div>
    </>
  )
}

// 添加默认值 默认不传递就使用这个内容
PropFnDefault.defaultProps = {
  pageSize:10
}
```



#### class 类组件

```js

// 类组件默认值
class PropClassDefault extends React.Component {
  // 静态类型
  static defaultProps  ={
    limit: 25
  }

  render() {
    return (
      <>
        <div>{this.props.limit}</div>
      </>
    )
  }
}
```

```js

// 类组件默认值
class PropClassDefault extends React.Component {

  render() {
    return (
      <>
        <div>{this.props.limit}</div>
      </>
    )
  }
}
// 会有类名访问先后次序的问题
PropClassDefault.defaultProps = {
  limit: 23
}
```





# React 组件-生命周期

> 组件的生命周期是指组件从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程，注意，**只有类组件才有生命周期** (`类组件` 实力化 函数组件不需要实例化)

查看 生命周期的网站：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

三个阶段

- 挂载阶段
  - 组件挂载阶段执行的钩子函数和执行时机
  - `consructor` => `render` => `componentDidMount`
    - **consructor** 创建组件时，最先执行，初始化的时候只执行一次，作用是初始化 **state** 创建 Ref 使用 **bind** 解决**this** 指向问题等
    - **render** 每次组件渲染都会触发 ， 渲染UI (==注意==: 不能在里面调用 **setState()**)
    - **componentDidMount** 组件挂载(**完成DOM渲染**) 后执行，初始化的时候执行一次 、发送网络请求 DOM操作
- 更新阶段
  - **render** 每次组件渲染都会触发 渲染UI (与挂载阶段是同一个**render**)
  - **componentDidUpdate**  组件更新后(DOM渲染完毕) DOM操作,可以获取到**更新后的DOM内容**,
- 卸载时
  - **componentWillUnmount** 组件卸载(从页面消失) 执行清理工作(比如:**清理定时器**等)

