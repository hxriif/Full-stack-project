import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import {
  MDBCard,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBTypography
} from "mdb-react-ui-kit";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function View() {
  const { id } = useParams();
  const [Products,setproducts]=useState([])
  const navigate = useNavigate();
const userid=localStorage.getItem("UserId")
// const Username=localStorage.getItem("UserName")


  useEffect(()=>{
  const fetchedData=async()=>{
    try{
      const response=await Axios.get(`/api/users/view/${id}`)
      if(response.status===200){
        setproducts(response.data.data||[])
      }
    }
    catch(error){
      console.log("error fetching products details")
      toast.error(error)
    }
  }
  fetchedData()
  window.scrollTo(0,0);
  },[]);
  


  const handleAddToCart = async (id) => {
    try {
      const response = await Axios.post( `/api/users/${userid}/cart`,{productId:id })
      console.log(response,"harif")
      if (response){
        await Axios.get(`/api/users/${userid}/cart`)
          return toast.success("Product added to the cart!")
      }
      // if(response.status === 404){   
      //    return toast.error("Product already included!!") 

      // }
      
    } catch (error) {
      console.error('Error adding product to the cart:', error)
      toast.error(error.response.data.message)
    }
    // navigate("/cart")
  };

  
 

  return(
    <>
    <div className="sticky-top">
      <Navbar/>
    </div>      
      <div key={Products._id}>
        <main className="mt-5 pt-4">
          <MDBContainer className="mt-5">
            <MDBRow>
              <MDBCol md="6" mb="4"> 
                <MDBCard
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <img
                    src={Products.image}
                    className="img-fluid hover-shadow card-img-top"
                    alt="Product"
                  />
                </MDBCard>
              </MDBCol>

              <MDBCol md="6" mb="4">
                <MDBCard
                  className="md-6 mb-0"
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <div className="p-4">
                    <p className="lead">
                      <span className="me-1">
                        <h1>{Products.title}</h1>
                        {/* <h5>
                          Price :<del>${products.price2}</del>
                        </h5> */}
                      </span>
                      <h3>
                        <span className="blockquote-footer">
                          Price 
                        </span>
                        {Products.price}
                      </h3>
                    </p>

                    <strong>
                      <p style={{ fontSize: "20px" }}>Description</p>
                    </strong>

                    <p>{Products.description}</p> 

                    <form className="justify-content-left d-flex p-2">
                      <div className="form-outline me-1" style={{ width: "100px" }}>
                        <MDBInput type="number" defaultValue="1" label="Quantity" />
                      </div>
                      <MDBBtn
                        color="primary"
                        className="ms-1"
                        id={Products.id}
                        onClick={() => handleAddToCart(Products._id)} 
                      >
                        Add to cart <i className="fas fa-shopping-cart ms-1"></i>
                      </MDBBtn>
                    </form>
                    <div>
                      {/* <MDBBtn
                        color="outline-primary"
                        size="lg"
                        id={Products.id}
                        onClick={() => handleAddToCart(Products._id)}
                      >
                        BUY NOW
                      </MDBBtn> */}
                    </div>
                  </div>
                </MDBCard>
                <hr />
                <MDBCard className="mt-0">
                  <MDBContainer className="container extra-images">
                    <MDBRow>
                      <MDBCol className="mt-4 justify-content-center ps-5" style={{ height: "7rem" }}>
                        <img
                          src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
                          alt="icon"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                        <p>Returns Policy</p>
                      </MDBCol>

                      <MDBCol className="mt-4 justify-content-center ps-5" style={{ height: "7rem" }}>
                        <img
                          src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png"
                          alt="icon"
                          style={{ maxWidth: "60px", maxHeight: "60px" }}
                        />
                        <p>1 year warranty</p>
                      </MDBCol>

                      <MDBCol className="mt-4 justify-content-center ps-5" style={{ height: "7rem" }}>
                        <img
                          className="more-image"
                          src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB617044271_.png"
                          alt="icon"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                        <p>Top Brand</p>
                      </MDBCol>
                      <MDBCol className="mt-4 justify-content-center ps-5" style={{ height: "7rem" }}>
                        <img
                          src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png"
                          alt="icon"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                        <p>Secure transaction</p>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBCard>
                <hr />
                <MDBTypography className="mt-2 mb-0">
                  <div className="d-flex">
                    <img
                      src="https://img.icons8.com/?size=2x&id=mnqCs95ap07K&format=png"
                      style={{ maxWidth: "30px", maxHeight: "30px" }}
                      alt="offer icon"
                    />
                    <h5 className="ms-2 mt-1">Offers</h5>
                  </div>
                </MDBTypography>
                <MDBCard>
                <div className="container extra-images">
                  <div className="row">
                    <div
                      className="col-12 col-md-6 col-lg-4 card mt-2"
                      style={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <div className="pt-3">
                        <h6>Bank Offer</h6>
                        <p>
                          Upto ₹1,500.00 discount on SBI Credit CardsUpto ₹1,500.00 discount on SBI Credit Cards
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-12 col-md-6 col-lg-4 card mt-2"
                      style={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <div className="pt-3">
                        <h6>No Cost EMI</h6>
                        <p>
                          Upto ₹3,377.13 EMI interest savings on ICICI Credit Card
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-12 col-md-6 col-lg-4 card mt-2"
                      style={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      }}
                    >
                      <div className="pt-3">
                        <h6>Partner Offers</h6>
                        <p>
                          Get GST invoice and save up to 28% on business purchases.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCard>

                <hr />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </main>
      </div>
    <div className='mt-3'>
    {/* <Footer/> */}
    </div>
  </>
);
}
