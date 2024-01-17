import React from "react";
import Navbar from "../component/Navbar";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardGroup,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function Productcategory() {
  const Nav = useNavigate();
  return (
    <>
      {/* <Navbar/> */}

      <h1 className="mt-5" style={{textAlign:"center" ,color:"black	"}}>ꜱʜᴏᴘ ʙʏ ᴄᴀᴛᴇɢᴏʀʏ</h1>
    
      <MDBCardGroup >
        <MDBCard  style={{backgroundColor:'black'}} className="mx-2 mt-4 my-4 " onClick={() => Nav("/food")}>
          <MDBCardImage
            src="https://m.media-amazon.com/images/I/71AHH4xyg8L._SX679_.jpg"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle className="ms-5" style={{color:"grey"}}>ʙᴀʙʏ ꜰᴏᴏᴅꜱ</MDBCardTitle>
            <MDBCardText>
             
            </MDBCardText>
            <MDBCardText>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard  style={{backgroundColor:'black'}} className="mx-2 mt-4 my-4 " onClick={() => Nav("/Toy")}>
          <MDBCardImage
            src="https://m.media-amazon.com/images/I/81Bri2LIWtL._SX679_.jpg"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle  className="ms-5" style={{color:"grey"}}>ʙᴀʙʏ ᴛᴏʏꜱ</MDBCardTitle>
            <MDBCardText>
            
            </MDBCardText>
            <MDBCardText>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard  style={{backgroundColor:'black'}} className="mx-2 mt-4 my-4 " onClick={() => Nav("/Clothe")}>
          <MDBCardImage
            src="https://m.media-amazon.com/images/I/71LxUcbo05L._SX679_PIbundle-3,TopRight,0,0_AA679SH20_.jpg"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle  className="ms-5" style={{color:"grey"}}>ʙᴀʙʏ ᴄʟᴏᴛʜᴇꜱ</MDBCardTitle>
            <MDBCardText>
          
            </MDBCardText>
            <MDBCardText>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard  style={{backgroundColor:'black'}} className="mx-2 mt-4 my-4 " onClick={() => Nav("/care")}>
          <MDBCardImage
            src="https://m.media-amazon.com/images/I/81vZm4LRdJL._SX679_.jpg"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle  className="ms-5" style={{color:"grey"}}>ʙᴀʙʏ ᴄᴀʀᴇꜱ</MDBCardTitle>
            <MDBCardText>
             
            </MDBCardText>
            <MDBCardText>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </>
  );
}
