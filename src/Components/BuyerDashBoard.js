import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function BuyerDashBoard() {
  return (
    <>
    <div className='container'>
      <h2 className='text-center text-primary mt-2'>Buyer Dashboard Component</h2>
      <div className='text-center my-5'>
      <Link to="searchproperty" className='btn btn-primary mx-3'>Search Property</Link>
    
      
      <Link to="/" className='btn btn-primary  mx-3'>Logout</Link>
      </div>
      
    </div>
    <Outlet/>
    </>
  )
}
