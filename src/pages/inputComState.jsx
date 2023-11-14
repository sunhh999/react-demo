import React, { createRef } from 'react'

export class InputComState extends React.Component {
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
