import { useContext, useEffect,useState } from "react";
import { Mycontext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap'
import axios from "axios";
import toast from "react-hot-toast";
// import { Axios } from "../App";
// import Navbar from "../component/Navbar";




export const Allproduct=()=>{
    const {babypro,serchTerm} = useContext(Mycontext);
    const [products,setproducts]=useState([])
    // const IsUser=localStorage.getItem("UserId")
    const navigate=useNavigate();

    useEffect(() => {
      const productsfetch=async()=>{
        try {
          const response=await axios.get("http://localhost:3003/api/users/products")
          if(response.status === 200){
            setproducts(response.data.data)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message || "Failed to fetch products")
        }
      }
      productsfetch();
      
          window.scrollTo(0, 0);
        }, []);
    
return(
    <>
    {/* <Navbar/> */}
    
    {/* <h1 style={{textAlign:"center",color:"#000000	"}}>BABYPRODUCTS</h1> */}
      <section id="all" style={{backgroundColor:'black'}}>
        <div className="container py-5" >
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
            {products.map((products, i) => (
              <div className="col" key={i}>
                <div className="card shadow-sm h-100" style={{backgroundColor:'black	'}}>
                  <div className="d-flex justify-content-between p-3">
                    <div
                      id="animated-div"
                      className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{
                        width: "80px",
                        height: "30px",
                        marginBottom: "10px",
                        marginRight: "10px",
                      }}
                    >
                      {/* <p className="text-white mb-0 small">In Offer</p> */}
                    </div>
                  </div>
                  <img
                    src={products.image}
                    style={{ width: "200px", height: "150px" }}
                    className="card-img-top d-flex align-items-center justify-content-center"
                    alt={products.name}
                  />

                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <h2 style={{color:'	white'}} className="small">{products.title}</h2>
                      {/* <p style={{color:'red'}}> */}
                        {/* <s >₹{babypro.price2}</s> */}
                      {/* </p> */}
                    </div>

                    <div  className="mb-3">
                      <h5   className="text-warning mb-0 " >₹{products.price}</h5>
                    </div>

                    <Button
                    style={{backgroundColor:"black",color:"red"}}
                      variant="primary"
                      className="ms-5 card-container"
                      onClick={() => navigate(`/viewp/${products._id}`)}
                      type="submit"
                    >
                      
                      <i class="fa-solid fa-binoculars"></i>                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>

)
}