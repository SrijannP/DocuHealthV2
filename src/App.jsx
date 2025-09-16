import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderSec from './component/HeaderSec'
import FooterSec from './component/FooterSec'

function App() {
  //conditional rendering
  return (
    <>
      <HeaderSec />
      <main>
        <Outlet/>
      </main>
      <FooterSec />

    </>
  )

}
// import { formatProdErrorMessage } from '@reduxjs/toolkit'


export default App
