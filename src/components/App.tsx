import React, { useState } from "react";
import './App.scss'
export const App = () => {
  const [counter, setCounter] = useState<number>(0)

  const increment = () => setCounter(prev => prev+1)
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>Click</button>
    </div>
  )
}