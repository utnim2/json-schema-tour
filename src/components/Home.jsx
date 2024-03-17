import React, { useState } from 'react'
import { Globe } from './Globe'

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <Globe />
    </div>
  )
}

export default Home
