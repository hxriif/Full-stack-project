import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../component/Navbar";
import { Axios } from "../App";
import { Nav } from "react-bootstrap";
import {motion} from 'framer-motion'


export default function Wishlist(){

const [products,setproducts]=useState([])
const userId=localStorage.getItem("UserId");




const fetchwishlistProducts= async()=>{
    try{
        const response=await Axios.get(`/api/users/${userId}/viewWishlist`)
        setproducts(response.data.data)
    }
    catch(error){}
}

useEffect(()=>{
    fetchwishlistProducts()
},[])


const removeWishlistproducts=async(productId)=>{
    try{
        const response=await Axios.delete(`/api/users/${userId}/removewishlist`,{data:{productId}})

      if(response.status===200){
        setproducts(response.data.data)
        fetchwishlistProducts()
      }
    }
    catch(error){
      console.log(error)
      toast.error("error removing products")
    }
}


return (
    <>
      <Navbar/>
      <section
        className="products d-flex flex-column align-items-center mb-5"
        style={{ paddingTop: "80px" }}
      >
        <h1 className="mt-5 text-black fw-bolder">
          <span>My</span> Wishlist
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="product-content d-flex justify-content-evenly">
          {products&&products.length !== 0 ? (
            products.map((value) => (
              <div className="box mx-3" key={value._id}>
                <div className="box-img">
                  <img
                    src={value.image}
                    style={{ width: 100 }}
                    alt={value.title}
                  />
                </div>
                <h3>{value.title}</h3>
                <div className="inbox">
                  <span className="strike-price">
                  </span>
                  <span className="price">${value.price}</span>
                </div>
                <div className="heart">
                  {products.some((item) => item._id === value._id) && (
                    <MDBIcon
                      fas
                      style={{ color: "red" }}
                      icon="heart"
                      className="clicked-heart-icon"
                      onClick={() =>removeWishlistproducts (value._id)}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0}} animate={{ opacity: 5 }}>
            <i  class="fa-solid fa-beer-mug-empty"></i>
          </motion.div>
          )}
        </div>
      </section>
    </>
  );
 }
