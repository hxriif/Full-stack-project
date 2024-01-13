import React, { useContext } from "react";
import Navbar from "./Navbar";
import Productcategory from "../Products/Productcategory";

import { Allproduct } from "../Products/Allproduct";
import Carousel from "./Carousel";
import { Mycontext } from "../Context/Context";
import "./Home.css";
// import Navbar from "./Navbar";
function Home() {
  const { serchTerm } = useContext(Mycontext);
  return (
    <>
  <Navbar />

  <div className="container-fluid" style={{ backgroundColor: "black" }}>
    {!serchTerm ? (
      <>
        <Carousel />
        <Productcategory />
        <div className="row">
          <div className="col-md-4">
            <img
              className="img-fluid"
              src="https://cdn.dribbble.com/users/1997192/screenshots/17509443/media/7ad0ad0a124cf1731c736845487916d4.png?resize=400x0"
              alt=""
            />
          </div>
          <div className="col-md-4">
            <img
              className="img-fluid"
              src="https://cdn.fcglcdn.com/brainbees/images/cattemplate/mobile_Def_baby_strollers_&_carriers_250823.webp"
              alt=""
            />
          </div>
          <div className="col-md-4">
            <img
              className="img-fluid"
              src="https://sep.turbifycdn.com/ty/cdn/albee-baby/homepage-mobile-blackfriday-oct24.png"
              alt=""
            />
          </div>
        </div>
        <Allproduct />
        <div className="row">
          {/* Add your responsive images here */}
        </div>
      </>
    ) : (
      <>
        <Allproduct />
        <Productcategory />
      </>
    )}
  </div>
</>
  )
}
export default Home;
