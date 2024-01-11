import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mycontext } from "../Context/Context";
import Navbar from "../component/Navbar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function View() {
  const { id } = useParams();
  const { babypro, cart, addcart } = useContext(Mycontext);
  const [Products,setproducts]=useState([])
  const [count, setCount] = useState(1);
  const navigate = useNavigate();


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
  

  // const handleAddToCart = () => {
  //   if (cart.includes(viewProduct[0])) {
  //     alert("Product is already added to the cart");
  //   } else {
  //     // Add the selected product to the cart
  //     addcart(()=>[...cart, ...viewProduct]);
  //     console.log(cart);
  //     alert("Product successfully added to the cart");
  //   }
  //   navigate("/cart")
  // };

  // const handleBuyNow = () => {
  //   navigate('/cart');
  // };

  return (
    <>
    <Navbar/>

    <div className="container mt-5">
      <MDBRow key={Products.id}>
        <MDBCol md="6">
            <MDBCard>
            <MDBCardImage src={Products.image} alt={Products.name} />
          </MDBCard>
        </MDBCol>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{Products.name}</MDBCardTitle>
              <MDBCardText>{Products.description}</MDBCardText>
              <MDBCardText>
                <strong>Price:</strong> ₹{Products.price}
              </MDBCardText>
              {/* <div className="d-flex align-items-center">
                <MDBBtn color="primary" className="me-2" onClick={decreaseCount}>
                  -
                </MDBBtn>
                <span className="me-2">{count}</span>
                <MDBBtn color="primary" onClick={increaseCount}>
                  +
                </MDBBtn>
              </div> */}
              {/* <p className="mt-3">
                <strong>Total:</strong> ₹{Products.price*count}
              </p> */}

              {/* <MDBBtn className="mx-2" color="primary" onClick={handleAddToCart}>
                Add to Cart
              </MDBBtn>
              <MDBBtn color="success" onClick={handleBuyNow}>
                Buy Now
              </MDBBtn> */}
            </MDBCardBody>
          </MDBCard>

          
        </MDBCol>
      </MDBRow>
    </div>
    </>
  );
}