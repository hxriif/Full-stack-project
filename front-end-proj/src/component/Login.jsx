import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Navbar from "./Navbar";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Axios } from "../App";
import axios from "axios";



export default function Loginform() {
  const navigat = useNavigate();


  const handleLogin = async (a) => {
    a.preventDefault();

    const Email = a.target.email.value;
    const Password = a.target.password.value;
    // console.log("eeee",Email)
    // console.log("password",Password)
    const adminemail = process.env.REACT_APP_ADMIN_EMAIL;
    // console.log("nnn", adminemail);

    if (Email === "" || Password === "") {
      toast.error("Input field is empty");
      return;
    }

    let url = "http://localhost:3003/api/users/login";
    if (adminemail && Email === adminemail) {
      url = "http://localhost:3003/api/admin/login";
    }

    try {
      const payload = { email: Email, password: Password };
      const response = await Axios.post(url, payload);

      if (response.status === 200) {

        if (adminemail && Email === adminemail) {
          localStorage.setItem("role", "admin");
          localStorage.setItem("Admin jwt", response.data.data);
          navigat("/Adm");
          toast.success("Admin Login Successful");

        } else {
          localStorage.setItem("UserId", response.data.data);
          localStorage.setItem("jwt", response.data.Token);
          localStorage.setItem("UserEmail", response.data.email);
          localStorage.setItem("UserName", response.data.username);

          setTimeout(() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("UserId");
            localStorage.removeItem("UserEmail");
            localStorage.removeItem("UserName");
            localStorage.removeItem("Admin jwt");
          }, 3600000);

          navigat("/");
          toast.success("Login Successful");
        }
      } else {
        toast.error("Login Failed:", response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid EMAIL or PASSWORD");
    }
};


  return (
    <>
      <Navbar />
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://i.pinimg.com/474x/dd/bc/fa/ddbcfa9286a78e092e91eaaf94640eb3.jpg"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">Login</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>
                <form action="" onSubmit={handleLogin}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="email"
                    type="email"
                    size="lg"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="password"
                    type="password"
                    size="lg"
                    required
                  />

                  <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                    Login
                  </MDBBtn>
                </form>

                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <a href="#!" style={{ color: "#393f81" }}>
                    <Link to="/Register">Register here</Link>
                  </a>
                </p>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
