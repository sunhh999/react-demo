import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
export default function Home() {
  const [sum, setSum] = useState(1)
  return (
    <div>
      <h1>Home页面</h1>
      {sum === 2 ? <Navigate to="/about" replace></Navigate> : sum}
      <h3>当前:{sum}的值</h3>
      <button onClick={()=>setSum(2)}>点击将变成2</button>
    </div>
  )
}


