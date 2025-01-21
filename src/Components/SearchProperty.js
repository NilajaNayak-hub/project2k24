import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import imgverify from '../verify.jpg';
import imgnotverify from '../p_nverify.jpg';

export default function SearchProperty() {
    const [ptype, setPType] = useState("");
    const [sid, setSId] = useState("");
    const [postmsg, setPostMsg] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();
    const propertytype = ["Commercial Site", "Site", "Agriculture Land", "Industrial Rent"];
    useEffect(() => {
        GetProperty();
    }, [])
    const [list, setList] = useState([])
    // function GetSearchProperty(e) {

    //     axios
    //         .get(`http://localhost:8080/GetSearchProperty/${e.target.value}`)
    //         .then((res) => {
    //             setList(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    function GetProperty() {

        axios
            .get("http://localhost:8080/GetProperty")
            .then((res) => {
                setList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function assigndata(item) {
        debugger;
        setSId(item);
    }
    function assigndatafb(item) {
        debugger;
        setSId(item);
    }
    function assigndatapg(spid) {
        debugger;
        sessionStorage.setItem("SPId",spid);
        //navigate("/viewpropertygallery");
    }
    function handlePostMessage(e) {
        debugger;
        e.preventDefault();
        if(postmsg=="")
        {
            toast.error("Enter Post Message");
        }
        else
        {
        const obj = { postmsg};
        var bid=sessionStorage.getItem("UserId");
        axios
            .post(`http://localhost:8080/BuyerPostMessage/${sid}/${bid}`, obj)
            .then((res) => {
                //(res.data)
                toast.success(res.data);
                ClearAll();
            })
            .catch((error) => {
                console.log(error);
                alert("Failed");
            });
        }
    }
    function handlePostFB(e) {
        debugger;
        e.preventDefault();
        if(msg=="")
        {
            toast.error("Enter Message");
        }
        else
        {
        const obj = { msg};
        var bid=sessionStorage.getItem("UserId");
        axios
            .post(`http://localhost:8080/BuyerPostFeedBack/${sid}/${bid}`, obj)
            .then((res) => {
                //(res.data)
                toast.success(res.data);
                ClearAll();
            })
            .catch((error) => {
                console.log(error);
                alert("Failed");
            });
        }
    }
    function ClearAll() {
        setPostMsg("");
        setMsg("");
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='card p-5'>
                        <h2 className='text-center text-muted'>Search Property Details</h2>
                        <div className='mb-3'>
                            <label className='mb-2'>Select Property Type</label>
                            <select className='form-select mb-3'
                                value={ptype}
                                onChange={(e) => setPType(e.target.value)} required>
                                <option value={0}>--Select--</option>
                                {propertytype.map((ptype, index) => {
                                    return (
                                        <option key={index} value={ptype}>{ptype}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="list-group">
                            {list.filter(p => p.ptype == ptype).map((item, index) => {
                                return (
                                    <div className="list-group-item py-3">
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h5 className="mb-1">
                                                    {item.pname}
                                                </h5>

                                                <p className="mb-1">Property Details:{item.pdetail}</p>
                                                <small>Cost: <span className='fw-bold fs-5'>{item.cost}</span></small>
                                            </div>
                                            <div className='col-4'>
                                                <div>{item.verifystatus === "Verified" ? (
                                                    <>
                                                        <img src={imgverify} className='img-fluid' width="100" height="100" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <img src={imgnotverify} className='img-fluid' width="100" height="100" />
                                                    </>
                                                )}

                                                </div>

                                            </div>
                                        </div>

                                        <div className='row mt-1'>
                                            <div className='col-4'>
                                                <p>Seller Name:{item.sellermaster.name}</p>
                                            </div>

                                            <div className='col-4'>
                                                <p>Seller Mobile No:{item.sellermaster.mobileno}</p>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <Link className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#divmodal" onClick={() => assigndata(item.sellermaster.sid)} >Post Message</Link>
                                            </div>
                                            <div className='col-4'>
                                                <Link className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#divmodal_fb" onClick={() => assigndatafb(item.sellermaster.sid)} >Post Feedback</Link>
                                            </div>
                                            <div className='col-4'>
                                                <Link className="btn btn-warning" to="/buyerdashboard/viewpropertygallery" onClick={() => assigndatapg(item.spid)} > View Gallery</Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}


                        </div>


                    </div>

                </div>


            </div>
            <div className="modal fade" id="divmodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Post Message</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">


                            <div className="mb-3">
                                <label className="form-label">Enter Message</label>
                                <input type='text'
                                    className='form-control'
                                    value={postmsg}
                                    onChange={(e) => setPostMsg(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" value="Close" className="btn btn-secondary" data-bs-dismiss="modal" />
                            <Link className="btn btn-primary" onClick={handlePostMessage}>
                                Post Message
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
            <div className="modal fade" id="divmodal_fb">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Post Feedback</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">


                            <div className="mb-3">
                                <label className="form-label">Enter Message</label>
                                <input type='text'
                                    className='form-control'
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" value="Close" className="btn btn-secondary" data-bs-dismiss="modal" />
                            <Link className="btn btn-primary" onClick={handlePostFB}>
                                Post Feedback
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
