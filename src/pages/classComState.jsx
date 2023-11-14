import React from 'react'

// 数组驱动视图 只要修改数据状态，那么页面就会自动刷新，无需手动操作Dom
export default class classComState extends React.Component {
  // 1.定义组件状态
  // 注意：不要直接修改 state 中的值，必须通过 setState 方法进行修改
  state = {
    count : 0,
    list: [1,2,3],
    person: {
       name:'jack',
       age:18
    }
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

  handleCount (){
    this.state.count+1
  }

  render() {
    // 读取状态
    // 3. 读取状态
    return <button onClick={()=>this.handleCount}>计数器{this.state.count}</button>
  }
}
