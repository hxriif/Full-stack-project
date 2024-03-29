import React, { useContext, useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../Context/Context";

export default function Navbar() {
  const { serchTerm, setSerchTerm, logged, setlogged } = useContext(Mycontext);
  const [userName, setUsername] = useState([]);
  const navigate = useNavigate();
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  useEffect(() => {
    const storeUsernme = localStorage.getItem("UserName");
    if (storeUsernme) {
      setlogged(true);
      setUsername(storeUsernme);
    } else {
      setlogged(false);
    }
  }, [setlogged, setUsername]);

  const handlLogout = () => {
    localStorage.removeItem("UserName");
    setUsername("");
    localStorage.removeItem("jwt");
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("Admin jwt");
    setlogged(!logged);
  };

  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="black">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <img
              src="https://i.pinimg.com/564x/ea/6d/d7/ea6dd72240d32852fd0b7ec0d6f22d88.jpg"
              alt=""
              style={{ height: "40px" }}
            />
          </MDBNavbarBrand>
          <MDBNavbarBrand style={{ color: "white" }}>ᴮᴬᴮʸ ᶜᴬᴿᵀ</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink
                  active
                  aria-current="page"
                  style={{ color: "white" }}
                  className="me-3"
                  onClick={handleHome}
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  style={{ color: "white" }}
                  className="me-3"
                  onClick={() => navigate("/All")}
                >
                  Products
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  style={{ color: "white" }}
                  className="me-5 shadow "
                  onClick={() => navigate("/pro")}
                >
                  Product Category
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBInputGroup tag="form" className="d-flex mt-3 me-2 mb-3">
              <input
                className="form-control "
                placeholder="Search here"
                aria-label="Search"
                type="Search"
                onChange={(e) => setSerchTerm(e.target.value)}
              />
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>

        {!logged ? (
          <>
            <MDBBtn
              className="me5"
              style={{ backgroundColor: "black",height:"50px" }}
              onClick={() => navigate("/login")}
            >
              login
            </MDBBtn>
          </>
        ) : (
          <>
            <MDBBtn
              className="me-2"
              style={{ backgroundColor: "black",height:"50px" }}
              onClick={handlLogout}
            >
              logout
            </MDBBtn>
            <MDBBtn
              className="me-2"
              style={{ backgroundColor: "black",color:"blue",height:"50px" }}
              onClick={() => navigate("/cart")}
            >
              <i className="fas fa-cart-shopping"></i>
            </MDBBtn>
            <MDBBtn
            
              className="me-2"
              style={{ backgroundColor: "black",color:"red",height:"50px"}}
              onClick={() => navigate("/wish")}
            >
              <i class="fa-solid fa-heart"></i>
            </MDBBtn>
          </>
        )}
        {/* <MDBBtn className='me-2' onClick={()=>navigate('/login')}><i class="fas fa-user"></i></MDBBtn> */}
      </MDBNavbar>
    </>
  );
}
