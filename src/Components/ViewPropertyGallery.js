import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ViewPropertyGallery() {
    const [spid, setSPId] = useState("");
    useEffect(() => {
        GetPropertyImage();
    }, [])

    const [list, setList] = useState([])
    function GetPropertyImage() {

        axios
            .get("http://localhost:8080/GetPropertyImage")
            .then((res) => {
                setList(res.data);
                debugger
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
                <h2 className='text-center text-muted'>Property Gallery</h2>
                <div className='row'>
                {
                    list.filter(p => p.propertymaster["spid"] == sessionStorage.getItem("SPId")).map((item,index)=>{
                        return(
                            <div className='col'>
                                <img src={item.photopath} width="200" height="200" />
                            </div>
                           
                        )
                    })
                }
                </div>
                
            </div>
        </div>
    </div>  
</div>
  )
}
