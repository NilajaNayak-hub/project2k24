import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function AdminDashBoard() {
  return (
    <>
    <div className='container'>
      <h2 className='text-center text-primary mt-2'>Admin Dashboard Component</h2>
      <div className='text-center my-5'>
      <Link to="verifysellerproperty" className='btn btn-primary mx-3'>Verify Property</Link>
      <Link to="adminviewfeedback" className='btn btn-primary mx-3'>View Buyer Feedback</Link>
      
      <Link to="/" className='btn btn-primary  mx-3'>Logout</Link>
      </div>
      
    </div>
    <Outlet/>
    </>
  )
}
