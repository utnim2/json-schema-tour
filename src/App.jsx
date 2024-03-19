import React, { useEffect } from 'react'
import Home from './components/Home'
import { TopBar } from './components/TopBar'

const App = () => {

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <div className="">
      <TopBar />
      <Home />
    </div>
  )
}

export default App
