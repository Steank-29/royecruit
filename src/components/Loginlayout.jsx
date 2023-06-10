import React from 'react'
import Lognavbar from './Log/Lognavbar'


export default function Loginlayout(props) {
  return (
    <>
        <Lognavbar/>
        {props.children}

    </>
  )
}
