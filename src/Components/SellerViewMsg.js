import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function SellerViewMsg() {
    useEffect(() => {
        GetPostMessage();
    }, [])
    const [list, setList] = useState([]);
    function GetPostMessage() {
        axios
            .get("http://localhost:8080/GetPostMessage")
            .then((res) => {
                debugger
                setList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
  return (
    <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card p-5'>
                        <h2 className='text-center text-muted mb-2'>Buyer Post Messages</h2>
                      
                        <div className="list-group">
                            {list.filter(p => p.sellermasterlst.sid == sessionStorage.getItem("UserId")).map((item, index) => {
                                return (
                                    <div className="list-group-item py-3" key={index}>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h5 className="mb-1">
                                                  Message:  {item.postmsg}
                                                </h5> 
                                            </div>
                                            
                                        </div>

                                        <div className='row mt-1'>
                                            <div className='col-4'>
                                                <p>Buyer Name:{item.buyermaster.name}</p>
                                            </div>

                                            <div className='col-4'>
                                                <p>Buyer Mobile No:{item.buyermaster.mobileno}</p>
                                            </div>

                                        </div>
                                        
                                    </div>
                                );
                            })}


                        </div>


                    </div>

                </div>


            </div>
            
            
        </div>
  )
}
