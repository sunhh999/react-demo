// 1.调用createContext，创建上下文
// 2.通过顶层组件包裹一下 Context.Provider
// 3.底层通过 useContext 获取上下文的值

import { createContext } from 'react'

const Context = createContext()

export default Context
