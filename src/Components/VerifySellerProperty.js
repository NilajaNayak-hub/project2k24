import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function VerifySellerProperty() {
    const [ptype, setPType] = useState("");
    const propertytype = ["Commercial Site", "Site", "Agriculture Land", "Industrial Rent"];
    useEffect(() => {

    }, [])
    const [list, setList] = useState([])
    function GetSearchProperty(e) {
        axios
            .get(`http://localhost:8080/GetSearchProperty/${e.target.value}`)
            .then((res) => {
                setList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleVerify = (spid) =>{
        debugger;
        const obj = { spid};
        axios
          .put("http://localhost:8080/VerifyProperty", obj)
          .then((res) => {
            //(res.data)
            toast.success(res.data);
            //ClearAll();
          
          })
          .catch((error) => {
            console.log(error);
            alert("Failed");
          });
      }
  return (
    <div className='container'>
    <div className='row'>
        <div className='col-12'>
            <div className='card p-5'>
                <h2 className='text-center text-muted'>Search Property Details</h2>
                <div className='mb-3'>
                    <label>Select Property Type</label>
                    <select className='form-select mb-3'
                        value={ptype}
                        onChange={GetSearchProperty} required>
                        <option value={0}>--Select--</option>
                        {propertytype.map((ptype, index) => {
                            return (
                                <option key={index} value={ptype}>{ptype}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="list-group">
                    {list.filter(pl => pl.verifystatus != "Verified").map((item, index) => {
                        return (
                            <div className="list-group-item py-3">
                                <h5 className="mb-1">
                                    {item.pname}
                                </h5>

                                <p className="mb-1">Property Details:{item.pdetail}</p>
                                <small>Cost: <span className='fw-bold fs-5'>{item.cost}</span></small>
                                <div className='row mt-1'>
                                    <div className='col-3'>
                                        <p>Seller Name:{item.sellermaster.name}</p>
                                    </div>
                                
                                    <div className='col-3'>
                                        <p>Seller Mobile No:{item.sellermaster.mobileno}</p>
                                    </div>
                                    <div className='col-2'>
                                        <a href={item.filepath} download> Download Document</a>
                                       
                                    </div>
                                    <div className='col-4'>
                                        <Link className="btn btn-primary me-3" onClick={() => handleVerify(item.spid)}>Property Verified</Link>
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
