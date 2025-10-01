import { useState } from 'react'
import './App.css'

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <div>
      <h1 className='bg-green-400'>Hello world!</h1>
    </div>
  )
}

export default App
