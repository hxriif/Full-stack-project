import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useContext } from "react";
import { Mycontext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import Adminnav from "./Adminnav";
import axios from "axios";
import toast from "react-hot-toast";



export default function Admin() {
  const navigate = useNavigate();
  const removeItem = (itemId)=>{
   
  };

const [allproducts,setallproducts]=useState([])
const [ products, setproducts]  = useState([])



const FetchAllProducts=async()=>{
try {
  const jwtToken = {
    headers: {
      Authorization: `${localStorage.getItem("Admin jwt")}`,
    },
  };

  const response=await axios.get("http://localhost:3003/api/admin/view",jwtToken )
  if(response){
    setallproducts(response.data.data)
  }
} catch (error) {
  console.log(error)
  toast.error("No Products Found")
}
}


const handleRemove = async (productId) => {
  try {
    const jwtToken = {
      headers: {
        Authorization: `${localStorage.getItem("Admin jwt")}`,
      },
    };
    
    const response = await axios.delete(`http://localhost:3003/api/admin/delete`,{...jwtToken,data:{ productId }})
    console.log(response)
    if (response.status === 200) {
      setproducts(response.data.data);
      toast.success("Product deleted successfully!");
      FetchAllProducts() 
      
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product.");
  }
};

useEffect(()=>{
  FetchAllProducts()
},[])





  return (
    <>
    <Adminnav/>
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col">Remove</th>
          <th scope="col">Edit</th>
        </tr>
      </MDBTableHead>
      {allproducts.map((pro) => (
        <MDBTableBody>
          <tr>
            <td>
              <p>{pro._id}</p>
              </td>
              <td>
                <div className="ms-3">
                  <p className="fw-bold mb-1">{pro.title}</p>
                </div>
              <td>
              <div className="d-flex align-items-center">
                <img
                  src={pro.image}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                  />
                </div>
                </td>
                  </td>
            <td>
              <p className="fw-normal mb-1">{pro.description}</p>
              {/* <p className="text-muted mb-0">₹{pro.price2}</p> */}
            </td>
            <td>
              <p className="fw-normal mb-1">{pro.category}</p>
              {/* <p className="text-muted mb-0">₹{pro.price2}</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill >
              ₹{pro.price}
              </MDBBadge>
            </td>
            <td>
              <MDBBtn 
              onClick={()=>handleRemove(pro._id)}>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </MDBBtn>
            </td>
            <td>
              <MDBBtn
                color="link"
                rounded
                size="sm"
                onClick={() => navigate(`/Edt/${pro._id}`)}
              >
                Edit
              </MDBBtn>
            </td>
          </tr>
        </MDBTableBody>
      ))}
    </MDBTable>
    </>
  );
}
