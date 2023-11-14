import React, { createContext } from 'react'
import { InputComState, InputComStateRef } from './pages/inputComState'

// 函数组件的创建和渲染
// 创建
function Hello() {
  return <div>hello</div>
}

// 类组件
class HelloComponent extends React.Component {
  render() {
    return <div>this is class Component</div>
  }
}

// 类子组件 接受父组件数据
class ChildComponent extends React.Component {
  render() {
    // 类组件必须使用this 关键词才能获取到props上的数据
    return <div>我是`ChildComponent`:接受到的父组件的数据{this.props.msg}</div>
  }
}

// 函数组件 接受父组件数据
function ChildComponent2({ msg, getChildMsg }) {
  // props 是一个对象 里面存储了父组件传递过来的数据

  // 子组件如何调用父组件不受限制
  function ContentFn() {
    console.log('1')
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

const { Provider, Consumer } = createContext()

/**
 * 非父子组件传参
 */
// 提供数据
function ProvideCon() {
  return (
    <>
      <div>ChildComponent3</div>
      <ConsumerCon></ConsumerCon>
    </>
  )
}

// 消费者
function ConsumerCon() {
  return (
    <>
      <Consumer>{(value) => <div>ConsumerCon接受到的数据：{value}</div>}</Consumer>
    </>
  )
}

class App extends React.Component {
  state = {
    name: '父组件的数据2-隔代传递的数据',
    BorderVal: ''
  }

  getChildMsg = (msg) => {
    console.log('本身数据', '接受数据', msg)
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
        {/* 渲染hello组件 */}
        <Hello></Hello>

        {/* 渲染class 类组件 */}
        <HelloComponent></HelloComponent>

        {/* input */}
        <InputComState></InputComState>

        {/* 不受控组件 */}
        <InputComStateRef></InputComStateRef>

        {/* 类子组件 */}
        <ChildComponent msg={this.state.name}></ChildComponent>

        {/* 函数组件 */}
        <ChildComponent2 getChildMsg={this.getChildMsg} msg={this.state.name}></ChildComponent2>

        {/* 兄弟组件 传递 1 */}
        <BrotherComponent1 getBrotherMsg={this.getBrotherMsg}></BrotherComponent1>
        {/* 兄弟组件 接受 2 */}
        <BrotherComponent2 BorderVal={this.state.BorderVal}></BrotherComponent2>

        <Provider value={this.state.name}>
          {/* ProvideCon 隔代传参 */}
          <ProvideCon></ProvideCon>
        </Provider>
      </div>
    )
  }
}

export default App
