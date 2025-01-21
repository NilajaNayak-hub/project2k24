import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AddProperty() {
    const [pname, setPName] = useState("");
    const [pdetail, setPDetail] = useState("");
    const [cost, setCost] = useState("");
    //const [plocation, setPLocation] = useState("");
    const propertytype = ["Commercial Site", "Site", "Agriculture Land", "Industrial Rent"];
    const [ptype, setPType] = useState("");
    const [sid, setSId] = useState("");
    const [spid, setSPId] = useState("");
    const [vstatus, setVStatus] = useState(false);
    const [pstatus, setPStatus] = useState(false);

    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");

    const [filepath, setFilePath] = useState("");

    function ClearAll() {
        setPName("");
        setPDetail("");
        setCost("");
       setlatitude("");
       setlongitude("");
        setPType("");
        setSPId("");
        setVStatus(false);
        setPStatus(false);
    }
    function AssignData(propertydata) {
        debugger
        setPName(propertydata.pname);
        setPType(propertydata.ptype);
        setPDetail(propertydata.pdetail);
        //setPLocation(propertydata.plocation);
        setCost(propertydata.cost);
        setSPId(propertydata.spid);
        setlatitude(propertydata.latitude);
        setlongitude(propertydata.longitude);
        //setVStatus(propertydata.vstatus);
        if(propertydata.vstatus=="false")
        {
            setVStatus(false);
        }
        else
        {
            setVStatus(true);
        }

        if(propertydata.pstatus=="false")
        {
            setPStatus(false);
        }
        else
        {
            setPStatus(true);
        }
        
        
    }
    function handleAddProperty(e) {
        debugger;
        e.preventDefault();
        if(ptype=="")
        {
            toast.error("Select Property Type");
        }
        else if(pname=="")
        {
            toast.error("Enter Property Name");
        }
        else if(pdetail=="")
        {
            toast.error("Enter Property Details");
        }
        else if(cost=="")
        {
            toast.error("Enter Property Cost");
        }
        else if(longitude=="")
        {
            toast.error("Enter Property longitude");
        }
        else if(latitude=="")
        {
            toast.error("Enter Property latitude");
        }
        else if(filepath=="")
        {
            toast.error("Select Property File");
        }
        else
        {
        var sid = sessionStorage.getItem("UserId");
        const obj = { pname, ptype, pdetail, cost, latitude,longitude,vstatus,pstatus,filepath };
        axios
            .post(`http://localhost:8080/AddProperty/${sid}`, obj)
            .then((res) => {
                toast.success(res.data);
                ClearAll();
                GetProperty();
            })
            .catch((error) => {
                console.log(error);
                alert("Failed");
            });
        }
    }
    useEffect(() => {
        GetProperty();
        setSId(sessionStorage.getItem("UserId"));
    }, [])
    const [list, setList] = useState([])
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
    function handleEdit() {
        debugger;
        const obj = { spid, pname, pdetail, cost, latitude,longitude, ptype,pstatus,vstatus };
        axios
            .put("http://localhost:8080/UpdateProperty", obj)
            .then((res) => {
                toast.success(res.data);
                ClearAll();
                GetProperty();
            })

    }
    function checkHandler(){
        setVStatus(!vstatus)
    }
    function checksaleHandler(){
        setPStatus(!pstatus)
    }
    const Image = (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        setFilePath(reader.result);
        };
      };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <div className='card p-5'>
                        <h2 className='text-center text-muted'>Add Property Details</h2>
                        <div className='mb-3'>
                            <label>Select Property Type</label>
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

                        <div className='mb-3'>
                            <label>Enter Property Name</label>
                            <input type='text'
                                className='form-control'
                                value={pname}
                                onChange={(e) => setPName(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Enter Property Detail</label>
                            <input type='text'
                                className='form-control'
                                value={pdetail}
                                onChange={(e) => setPDetail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Enter Property Cost</label>
                            <input type='text'
                                className='form-control'
                                value={cost}
                                onChange={(e) => setCost(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Enter Property Longitude</label>
                            <input type='text'
                                className='form-control'
                                value={longitude}
                                onChange={(e) => setlongitude(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Enter Property Latitude</label>
                            <input type='text'
                                className='form-control'
                                value={latitude}
                                onChange={(e) => setlatitude(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <div class="form-check form-check-inline form-switch">
                                <input class="form-check-input" type="checkbox" value={vstatus} checked={vstatus}
                                onChange={checkHandler}  />
                                <label class="form-check-label" >Active/Deactive</label>
                            </div>
                            <div class="form-check form-check-inline form-switch">
                                <input class="form-check-input" type="checkbox"  value={pstatus} checked={pstatus} onChange={checksaleHandler}/>
                                <label class="form-check-label" >Sold/Unsold</label>
                            </div>
                        </div>
                        <div className='my-3 text-end'>
                            <Link className={spid ? 'btn btn-warning' : 'btn btn-primary'}
                                onClick={spid ? handleEdit : handleAddProperty}>{spid ? "Edit Property" : "Add Property"}</Link>
                        </div>
                        <div className="form-group py-2">
                  <label>Choose image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={Image}
                  />
                </div>
                    </div>

                </div>
                <div className='col-6'>
                    <table className='table table-striped w-100 mx-auto'>
                        <thead>
                            <tr>
                                <th>Property No</th>
                                <th>Property Name</th>
                                <th>Property Type</th>
                                <th>Property Details</th>
                                <th>Property Cost</th>
                                <th>Property Longitude</th>
                                <th>Property Latitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.filter(pl => pl.sellermaster["sid"] == sid).map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.spid}</td>
                                        <td>{item.pname}</td>
                                        <td>{item.ptype}</td>
                                        <td>{item.pdetail}</td>
                                        <td>{item.cost}</td>
                                        <td>{item.longitude}</td>
                                        <td>{item.latitude}</td>
                                        <td>
                                            <Link className='btn btn-primary' onClick={() => AssignData(item)}>Edit</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}
