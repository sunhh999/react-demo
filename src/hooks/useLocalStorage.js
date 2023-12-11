import { useEffect, useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [message, setMessage] = useState(defaultValue)

  // 每次只要 message 变化 就会自动将最新的message 自动同步存储到 本地 localStorage
  useEffect(() => {
    window.localStorage.setItem(key, message)
  }, [message, key])
  return [message, setMessage]
}
