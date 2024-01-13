import React from "react";
import { MDBBtn,MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ cart }) => {
    const navigate=useNavigate();
    
    const handleBackToShopping = () => {
        navigate("/");
      };
  return (
    <div className="mb-4">
      <MDBTypography tag="h5" className="fw-bold mb-4">
        {/* <p className="text-center fw-bold text-uppercase">
          GRAND TOTAL: ${calculateTotal(addcart)}
        </p> */}
      </MDBTypography>
      <MDBBtn className="mb-3" block size="lg">
        Buy now
      </MDBBtn>
      <a href="#!" onClick={handleBackToShopping}>
        <MDBIcon fas icon="angle-left me-2" />
        Back to shopping
      </a>
    </div>
  );
};

export default CartSummary;