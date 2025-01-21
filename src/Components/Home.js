import React from 'react'
import land2 from '../land2.png'

import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='container'>
            <h1 className='text-center my-2 text-primary'>Estate Quest Application</h1>
            <div className='text-end mb-3'>
                <Link className='btn btn-primary mx-3' to="login">Login</Link>
                <Link className='btn btn-primary' to="register">Seller/Buyer Registration</Link>
            </div>
            <div className='row'>
                <div className='col'>
                    <img src={land2} className='img-fluid' />
                </div>
                <div className='col-8'>
                    <div className='card py-5'>
                        
                        <h2 class="text-center text-primary">Find your Dream Property</h2>
                        <h3 className='text-center text-success'>In Estate Quest App.</h3>
                        <p className='text-center py-2 px-2'>The Estate Quest app is dsigned for buying and selling the property that helps you view and save records of urban and rural areas.
                            Estate Quest App is a land records management system.
                        </p>

                    </div>
                </div>
            </div>
            <div className='bg-dark text-light my-5'>
                <p className='py-4 text-center'>© 2024 Estate Quest Application. All Rights Reserved | Secure platform to view property</p>
            </div>
        </div>
    )
}
