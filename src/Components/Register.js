import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Register() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const usertype = ["Seller", "Buyer"];
    const [user, setUser] = useState("");

    function ClearAll() {
        setName("");
        setMobileNo("");
        setAddress("");
        setUser("");
    }
    function handleRegister(e) {
        debugger;
        e.preventDefault();
        if(user=="")
        {
            toast.error("Select User Type")

        }
        else if(name=="")
        {
            toast.error("Enter Name")
        }
        else if(mobileno=="")
        {
            toast.error("Enter Mobile No")
        }
        else if(address=="")
        {
            toast.error("Enter Address")
        }
        else if(mobileno.length<10)
        {
            toast.error("Enter 10 Digits Mobile No")
        }
        else
        {
        const obj = { name, mobileno, address };
        var url="";
        if(user==="Seller")
        {
            url="http://localhost:8080/SellerRegister";
        }
        else
        {
            url="http://localhost:8080/BuyerRegister";
        }

        axios
            .post(url, obj)
            .then((res) => {
                toast.success(res.data);
                ClearAll();
            })
            .catch((error) => {
                console.log(error);
                alert("Failed");
            });
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card p-5'>
                        <h2 className='text-center text-muted'>Seller/Buyer Register</h2>
                        <div className='mb-3'>
                        <label>Select User Type</label>
                            <select className='form-select mb-3'
                                value={user}
                                onChange={(e) => setUser(e.target.value)} required>
                                <option value={0}>--Select--</option>
                                {usertype.map((user, index) => {
                                    return (
                                        <option key={index} value={user}>{user}</option>
                                    );
                                })}
                            </select>
                        </div>
                        
                        <div className='mb-3'>
                            <label>Enter Name</label>
                            <input type='text'
                                className='form-control'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                      
                        <div className='mb-3'>
                            <label>Enter Mobile No</label>
                            <input type='text'
                                className='form-control'
                                value={mobileno}
                                onChange={(e) => setMobileNo(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Enter Address</label>
                            <input type='text'
                                className='form-control'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className='my-3 text-end'>
                            <Link className='btn btn-primary mx-3' onClick={handleRegister}>Register</Link>
                            <Link className='btn btn-primary' to="/">Home</Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
