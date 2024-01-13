import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function Carts() {
  const [ cart, setcart ] = useState([]);
  console.log(cart,"cart")
  const userid=localStorage.getItem("UserId")

  const navigat = useNavigate();

  const handleBackToShopping = () => {
    navigat("/");
  };
     
  const FetchCartproducts=async()=>{
    try {
      const response=await Axios.get(`api/users/${userid}/cart`)
      if(response.status ===200){
        setcart(response.data.data.cart);
      }
    } catch (error) {
      console.error(error)
      toast.error(error)
    }
  }

  useEffect(()=>{
    FetchCartproducts()
  },[])

  const handleRemoveItem=async(itemId)=>{
    try {
      const response=await Axios.delete(`/api/users/${userid}/cart/${itemId}`)
      console.log(response,"dfgfd")
      if (response?.data.data.message) {
        toast.success(response.data.message)
         FetchCartproducts()
      }
    } catch (error) {
      console.error(error);
      toast.error('Error removing product from the cart');
    }
  
  }

  



    return (
    <>
    <Navbar/>
    <section className="h-auto h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="7">
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBTypography
                  tag="h3"
                  className="mb-4 text-center fw-bold text-uppercase text-decoration-underline"
                >
                  Cart products
                </MDBTypography>
                {cart && cart.map((item) => (
                  <div className="d-flex align-items-center mb-4" key={cart.productsId}>
                    <div className="flex-shrink-0">
                      <MDBCardImage
                         src={item.productsId.image}
                        fluid
                        style={{ maxWidth: "150px" }}
                        alt={item.productsId.image}
                        />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <a
                        href="#!"
                        className="float-end text-black"
                        onClick={() =>  handleRemoveItem(item.productsId._id)}
                      >
                        <MDBIcon fas icon="times" />
                      </a>
                      <MDBTypography tag="h5" className="text-primary">
                        {item.productsId.title}
                      </MDBTypography>
                      <div className="d-flex align-items-center">
                        <p className="fw-bold mb-0 me-4">Price: ${item.productsId.price}</p>
                        {/* <MDBBtn
                                style={{ border: "1px" }}
                                className="minus mx-3 "
                                onClick={() => handleQuantity(item._id, -1)}
                                >
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>
                             <span className="me-4">{item.quantity}</span>
                              <MDBBtn
                                className="plus"
                                style={{ border: "1px" }}
                               onClick={() => handleQuantity(item._id, 1)}
                              >
                            <MDBIcon fas icon="plus" />
                          </MDBBtn> */}
                      </div>
                    </div>
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="5">
            <form className="mb-4">
              <MDBTypography tag="h5" className="fw-bold mb-4">
              <p className="text-center fw-bold text-uppercase">
                  {/* GRAND TOTAL: ${calculateTotal(addcart)} */}
                </p>
              </MDBTypography>
              <MDBBtn
                // onClick={() => handleCheckout()}
                className="mb-3"
                block
                size="lg"
              >
                Buy now
              </MDBBtn>
              <a href="#!" onClick={handleBackToShopping}>
                <MDBIcon fas icon="angle-left me-2" />
                Back to shopping
              </a>
            </form>
          </MDBCol> 
        </MDBRow>
      </MDBContainer>
      <div className="mt-3">
      </div>
    </section>
    </>
  );
}