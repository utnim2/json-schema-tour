import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Editor from './components/Editor'
import Step1 from './components/Step1'
import Hyper from './components/Hyper'
import Step2 from './components/Step2'
import Home from './components/Home'
import { TopBar } from './components/TopBar'

const App = () => {
  return (
    <div className="">
      <TopBar />
      <Home />
    </div>
  )
}

export default App
