// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Route,Routes} from 'react-router-dom'
import Home from './component/Home';
import Loginform from './component/Login';
import Navbar from './component/Navbar';
import Register from './component/Register';
import Productcategory from './Products/Productcategory';
import { Mycontext } from './Context/Context';
import  {Babyproducts}  from './Products/Products';
import { Allproduct } from './Products/Allproduct';
import Footer from './Footer/Footer';
import Foods from './Products/Foods';
import Toyss from './Products/Toys';
import Clothes from './Products/Clothes';
import Babycare from './Products/Babycare';
import Carts from './Products/Cart';
import View from './Products/Displayproduct';
import { useState } from 'react';
import axios from 'axios';
import Carousel from './component/Carousel';
import Admin from './component/Admin';
import Editproducts from './component/Edit';
// import { Adminlogin } from './component/Adminlogin';
import Adminnav from './component/Adminnav';
// import Adminallproduct from './component/Adminallproduct';
// import Adminhome from './component/Adminhome';
import AdminProduct from './component/Adminaddproduct';
import { userdetails } from './component/Usersdummy';
import ViewUsers from './component/Users';
import Moredetails from './component/Viewuserprofile';
import { Toaster } from 'react-hot-toast';
import Wishlist from './Products/wishlist';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem('jwt')
  }
});


function App() {
  const [serchTerm,setSerchTerm] = useState("")
  const [logged,setlogged]=useState(false)
  const[cart,addcart]=useState([])
  // const[ulogin,setUlogin]=useState([])
  const[babypro,setbabypro]=useState([])
  const[userdetail,setuserdetail]=useState(userdetails)
  return (
    <>
    <Mycontext.Provider value={{cart,addcart,Babyproducts,serchTerm,setSerchTerm,logged,setlogged,babypro,setbabypro,userdetail,setuserdetail}}>
    <Toaster position="top-center" reverseOrder={false}/>

    <Routes>
      <Route path='a' element={<Adminnav/>}/>
      <Route path='e' element={<Navbar/>} />
      <Route path='/' element={<Home/>}/>
      <Route path='/' element={<Carousel/>}/>
      <Route path='/login' element={<Loginform/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/pro' element={<Productcategory/>}/>
      <Route path='/All' element={<Allproduct/>}/>
      <Route path='/food' element={<Foods/>}/>
      <Route path='/Toy' element={<Toyss/>}/>
      <Route path='/Clothe' element={<Clothes/>}/>
      <Route path='/Care' element={<Babycare/>}/>
      {/* <Route path='/cart' element={<Carts/>}/> */}
      <Route path='/viewp/:id' element={<View/>}/>
      <Route path='/Adm' element={<Admin/>}/>
      <Route path='/Edt/:id' element={<Editproducts/>}/>
      {/* <Route path='/Admap' element={<Adminallproduct/>}/> */}
      {/* <Route path='/Admh' element={<Adminhome/>}/> */}
      <Route path='/Admp' element={<AdminProduct/>}/>
      <Route path='/a' element={<userdetails/>}/>
      <Route path='/user' element={<ViewUsers/>}/>
      <Route path='/more/:id' element={<Moredetails/>}/>
      <Route path='/cart' element={<Carts/>}/>
      <Route path='/wish' element={<Wishlist/>}/>


    </Routes>
    </Mycontext.Provider>
    <Footer/>

    </>
  );
}

export default App;
