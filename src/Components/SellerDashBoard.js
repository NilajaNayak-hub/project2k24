import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function SellerDashBoard() {
  return (
    <>
    <div className='container'>
      <h2 className='text-center text-primary mt-2'>Seller Dashboard Component</h2>
      <div className='text-center my-5'>
      <Link to="addproperty" className='btn btn-primary mx-3'>Post Property</Link>
      <Link to="uploadphoto" className='btn btn-primary mx-3'>Upload Property Photo</Link>
      <Link to="sellerviewmsg" className='btn btn-primary mx-3'>View Messages</Link>
      <Link to="/" className='btn btn-primary  mx-3'>Logout</Link>
      </div>
      
    </div>
    <Outlet/>
    </>
  )
}
