import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { Axios } from "../App";
import toast from "react-hot-toast";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Carts = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("UserId");
  const navigate=useNavigate();


  const handleBackToShopping=()=>{
    navigate("/")
  }



  const fetchCartProducts = async () => {
    try {
      const response = await Axios.get(`api/users/${userId}/view/cart`);
      // console.log(response,"hhh")
      setCart(response.data.data.cart);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await Axios.delete(`/api/users/${userId}/cart/${itemId}`);
      if (response===200) {
        toast.success(response.data.message);
        fetchCartProducts();
      }
    } catch (error) {
      toast.error('Error removing product from the cart');
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);




  return (
    <>
      <Navbar />
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
                  <div className="d-flex align-items-center mb-4" key={item.productsId}>
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        src={item.productsId.image}
                        fluid
                        style={{ maxWidth: "150px" }}
                        alt={item.productsId.title}
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
                      {/* <div className="d-flex align-items-center">
                        <p className="fw-bold mb-0 me-4">Price: ${item.productsId.price}</p>
                        <MDBBtn
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
                          </MDBBtn>
                      </div> */}
                    </div>
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="5">
            <form className="mb-4">
              {/* <MDBTypography tag="h5" className="fw-bold mb-4">
              <p className="text-center fw-bold text-uppercase">
                  GRAND TOTAL: ${calculateTotal(addcart)}
                </p>
              </MDBTypography> */}
              {/* <MDBBtn
                onClick={() => handleCheckout()}
                className="mb-3"
                block
                size="lg"
              >
                Buy now
              </MDBBtn> */}
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
};

export default Carts