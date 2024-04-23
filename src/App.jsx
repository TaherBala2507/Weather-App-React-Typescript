import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CitiesTable from './Components/CitiesTable'
import WeatherPage from './Components/WeatherPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<CitiesTable />} />
        <Route path='/weather/:cityName' element={<WeatherPage />} />
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
