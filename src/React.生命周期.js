import React from 'react'

class Test extends React.Component {
  // 如果数据时组件的状态 需要去影响视图 则需要定义到state中
  // 而如果我们需要的数组状态 不和试图绑定 不影响UI渲染 那就可以定义成一个普通的实例属性就行
  timer = null
  componentDidMount(){
    this.timer = setInterval(()=>{
      console.log('定时器触发');
    },1000)
  }
  
  componentWillUnmount() {
    // 清理定时器
    clearInterval(this.timer)
    console.log('componentWillUnmount,组件销毁时会被触发')
  }

  render(){
    return (
      <div>Test组件 模拟组件卸载</div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
  }

  state = {
    count: 0,
    flag: true
  }

  handleAddCount = () => {
    this.setState({
      count: this.state.count + 1,
      flag: !this.state.flag
    })
  }

  componentDidMount() {
    console.log('componentDidMount,初始化时触发，此时DOM渲染完成')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate,数据发生改变就会触发')
    console.log(this.state.flag,'flag');
  }
  render() {
    console.log('render函数只会在渲染UI的时候触发')
    // console.log('componentDidMount =》 同一个render 《= componentDidUpdate')
    return (
      <div>
        {/* 渲染的数据 */}
        计数器 <button onClick={() => this.handleAddCount()}>{this.state.count}</button>
        {/* 数据状态切换 */}
        {this.state.flag ? <Test></Test> : '没有被卸载'}
      </div>
    )
  }
}

export default App
