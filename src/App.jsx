import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Editor from './components/Editor'
import Step1 from './components/Step1'
import Hyper from './components/Hyper'
import Step2 from './components/Step2'
import Home from './components/Home'
import { TopBar } from './components/TopBar'
import Data from './components/Data'
import Hyper2 from './components/Hyper2'

const App = () => {
  return (
    <div className="">
    {/* <Data /> */}
    {/* <Hyper2 /> */}
    {/* <Editor /> */}
      <TopBar />
      <Home />
      {/* <Hyper2 /> */}
    </div>
  )
}

export default App
