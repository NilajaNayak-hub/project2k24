import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login'
import Register from './Components/Register'
import SellerDashBoard from './Components/SellerDashBoard'
import AddProperty from './Components/AddProperty'
import UploadPropertyPhoto from './Components/UploadPropertyPhoto'
import BuyerDashBoard from './Components/BuyerDashBoard'
import SearchProperty from './Components/SearchProperty'
import AdminDashBoard from './Components/AdminDashBoard'
import VerifySellerProperty from './Components/VerifySellerProperty'
import SellerViewMsg from './Components/SellerViewMsg'
import AdminViewFeedBack from './Components/AdminViewFeedBack'
import ViewPropertyGallery from './Components/ViewPropertyGallery'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="sellerdashboard" element={<SellerDashBoard/>}>
        <Route path="addproperty" element={<AddProperty/>}/>
        <Route path="uploadphoto" element={<UploadPropertyPhoto/>}/>
        <Route path="sellerviewmsg" element={<SellerViewMsg/>}/>
        </Route>
        <Route path="buyerdashboard" element={<BuyerDashBoard/>}>
        <Route path="searchproperty" element={<SearchProperty/>}/>
        <Route path="viewpropertygallery" element={<ViewPropertyGallery/>}/>
        </Route>
        <Route path="admindashboard" element={<AdminDashBoard/>}>
        <Route path="verifysellerproperty" element={<VerifySellerProperty/>}/>
        <Route path="adminviewfeedback" element={<AdminViewFeedBack/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
