import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AdminViewFeedBack() {
    useEffect(() => {
        GetPostFeedBack();
    }, [])
    const [list, setList] = useState([]);
    function GetPostFeedBack() {
        axios
            .get("http://localhost:8080/GetPostFeedBack")
            .then((res) => {
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
                            {list.map((item, index) => {
                                return (
                                    <div className="list-group-item py-3">
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h5 className="mb-1">
                                                    Message:  {item.msg}
                                                </h5>
                                            </div>

                                        </div>
                                        <div className='row mt-2'>
                                            <div className='col-4'>
                                                <p>Seller Name:{item.sellerlst.name}</p>
                                            </div>

                                            <div className='col-4'>
                                                <p>Seller Mobile No:{item.sellerlst.mobileno}</p>
                                            </div>

                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-4'>
                                                <p>Post Buyer Name:{item.buyerlst.name}</p>
                                            </div>

                                            <div className='col-4'>
                                                <p>Post Buyer Mobile No:{item.buyerlst.mobileno}</p>
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
