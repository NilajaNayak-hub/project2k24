import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function UploadPropertyPhoto() {
  const [spid, setSPId] = useState("");
  const [image, setImage] = useState("");
  const [propertylist, setPropertyList] = useState([]);
  const[sid,setSId]=useState("");

  function GetProperty() {
    axios
      .get("http://localhost:8080/GetProperty")
      .then((res) => {
        setPropertyList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    GetProperty();
    setSId(sessionStorage.getItem("UserId"));
  }, [])
  const Image = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };
  function ClearAll() {
    setSPId("");
    setImage("");
}
  function handleUploadPhoto(e){
    e.preventDefault();
        if(spid=="")
        {
            toast.error("Select Property");
        }
        else if(image=="")
        {
            toast.error("Select Image");
        }
        else
        {
    const obj = { photopath:image };
    axios
        .post(`http://localhost:8080/AddPropertyPhoto/${spid}`, obj)
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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card mt-5">
              <h4 className="text-center py-1">Upload Property Photo</h4>
              <div className="card-body">
                <div className="form-group mb-2">
                <label>Select Property</label>
                    <select className='form-select mb-3'
                        value={spid}
                        onChange={(e) =>setSPId(e.target.value)} required>
                        <option value={0}>--Select--</option>
                        {
                            propertylist.filter(pl=>pl.sellermaster["sid"]==sid).map(
                              pl=>(
                                    <option key={pl.spid} value={pl.spid}>
                                    {pl.spid}-{pl.pname}
                                    </option>   
                                )
                            )
                        }
                       
                    </select>
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
              <div className="py-2">
                <Link
                  className="btn btn-success float-end me-4"
                  onClick={handleUploadPhoto}>
                  Upload Photo
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
