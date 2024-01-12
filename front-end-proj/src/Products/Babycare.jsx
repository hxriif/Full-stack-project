import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Toast } from 'react-bootstrap'
import Navbar from '../component/Navbar'
// import { Axios } from "../App";
import toast from 'react-hot-toast'
import axios from 'axios'


const Babycare=()=> {
    const Navigate=useNavigate();
     const [products,setproducts]=useState([])
     const category="care"

     useEffect(()=>{
      const productcategory=async()=>{
        try {
          const response=await axios.get(`http://localhost:3003/api/users/products/${category}`)
          if(response){
            console.log("sooo")
            setproducts(response.data.data)
          }
        } catch (error) {
          console.log("error fetching the product",error)
          toast.error("error")
        }
      }
      productcategory()
      window.scrollTo(0,0);
     },[])


    // const filteredproducts=babypro.filter((p)=>p.type.toLowerCase()==='babycare');






  return (
    <>
    <Navbar/>
    <div  style={{backgroundColor:'black'}}>
      <header className='sticky-top'>
        
      </header>
      <br />
      <div className='container py-5'>
        <div className='row'>
          <div className='d-flex flex-wrap justify-content-center '>
            {products.map((babypro) => (
              <Card
                key={babypro._id}
                style={{ width: '20%', marginBottom: '10px', marginRight: '10px' }}
                onClick={() => Navigate(`/viewp/${babypro._id}`)}
                className='card-container'
              >
                <Card.Img className='card-img-top' src={babypro.image} />
                <Card.Body style={{backgroundColor:'white'}}>
                  <Card.Title>{babypro.title}</Card.Title>
                  <Card.Text>₹{babypro.price}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Babycare