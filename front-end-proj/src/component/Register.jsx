
import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Await, Link, useNavigate } from "react-router-dom";
// import { Productcontext } from "../Context";
import { Mycontext } from "../Context/Context";
import { Toast } from "react-bootstrap";
import toast from "react-hot-toast"
import axios from "axios"
import { Axios } from "../App";



export default function Register() {
  

  const navigate = useNavigate();
  

  const register = async(event) => {
    event.preventDefault();
    const name=event.target.name.value.trim(); 
    const email=event.target.email.value.trim();
    const username=event.target.username.value.trim(); 
    const password = event.target.Password.value.trim();


    if(name === "" || email === "" || username === "" || password === "") {
      toast("Please fill all input fields");
    }
    
    try {
      const payload = { name, email, password, username };
      const response = await Axios.post("/api/users/register", payload);
    
      if(response.status === 201) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
    

  };
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard
        className="mt-5"
        style={{ height: "500px", marginBottom: "8rem" }}
      >
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form action="" onSubmit={register}>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              id="name"
              type="text"
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              id="email"
              type="email" 
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              size="lg"
              id="username"
              type="text"
              required
              />
            <MDBInput
              wrapperClass="mb-4"
              label="Your password"
              size="lg"
              id="Password"
              type="password"
              required

            />
            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
              />
            </div>

            <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
              Register
            </MDBBtn>
          </form>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
