import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import SearchScreen from './pages/SearchScreen'


export default function App(){
  return (
  <BrowserRouter>
    <Routes>  
      <Route path="/" element={<HomeScreen/>}/>
    </Routes>
  </BrowserRouter>
  )
}