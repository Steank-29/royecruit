import React from 'react'
import Navbar from "../components/interfaces/Navbar"
import Footer from './interfaces/Footer'


export default function Layout(props) {
  return (
    <>
        <Navbar/>
        {props.children}
        <Footer/>
    </>
  )
}
