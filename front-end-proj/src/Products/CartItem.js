import React from "react";
import { MDBBtn, MDBCardImage, MDBIcon, MDBTypography } from "mdb-react-ui-kit";

const CartItem = ({ item, onRemoveItem }) => {
  return (
    <div className="d-flex align-items-center mb-4">
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
          onClick={() => onRemoveItem(item.productsId._id)}
        >
          <MDBIcon fas icon="times" />
        </a>
        <MDBTypography tag="h5" className="text-primary">
          {item.productsId.title}
        </MDBTypography>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-4">Price: ${item.productsId.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;