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
