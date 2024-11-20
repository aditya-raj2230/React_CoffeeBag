import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Wholesale from './components/Wholesale'
import Product from './components/Product'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-screen w-screen bg-black' >
      <Wholesale/>
      <Product/>
      <Product/>
      <Product/>
    </div>
    </>
  )
}

export default App
