import React from 'react'
import CompanyNavbar from './company/CompanyNavbar'
import CompanyFooter from './company/CompanyFooter'


export default function CompanyLayout(props) {
  return (
    <>
        <CompanyNavbar/>
        {props.children}
        <CompanyFooter/>
    </>
  )
}
