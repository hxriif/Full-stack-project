import React, { useContext, useEffect, useState } from "react";
// import { Productcontext } from '../../Context';
import { useNavigate, useParams } from "react-router-dom";
import { Mycontext } from "../Context/Context";
import { Axios } from "../App";
import toast from "react-hot-toast";
import axios from "axios";

// ... (imports)

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [productdata, setproductdata] = useState({
      title: "",
      image: "",
      price: "",
      category: "",
      description: "",
    });
  
    useEffect(() => {
      const fetchproduct = async () => {
        try {
          const jwtToken = {
            headers: {
              Authorization: `${localStorage.getItem("Admin jwt")}`,
            },
          };
          const response = await axios.get(`http://localhost:3003/api/admin/update/${id}`, jwtToken);
          if (response.status === 200) {
            const { _id, title, image, price, description, category } = response.data.data;
            setproductdata({
              id: _id,
              title,
              image,
              price,
              category,
              description,
            });
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      };
      fetchproduct();
    }, [id]);
  
    const handlesubmit = async (e) => {
      e.preventDefault();
  
      try {
        const jwtToken = {
          headers: {
            Authorization: `${localStorage.getItem("Admin jwt")}`,
          },
        };
  
        const response = await axios.patch(`http://localhost:3003/api/admin/update`,productdata,jwtToken);
  
        if (response.status === 200) {
          toast.success("Product Edited Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
  
    const handelchange =  (a) => {
      const { name, value } = a.target;
      console.log("hdsfg",value)
      setproductdata((PrevData) => ({
        ...PrevData,
        [name]: value,
      }));
    };
  
    return (
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <h2 className="text-center">Edit Product</h2>
              <form onSubmit={handlesubmit}>
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  onChange={handelchange}
                  value={productdata.title}
                />
  
                <label htmlFor="Category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="form-control"
                  value={productdata.category}
                  onChange={handelchange}
                />
  
                <label htmlFor="Price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                  value={productdata.price}
                  onChange={handelchange}
                />
  
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  value={productdata.description}
                  onChange={handelchange}
                />
  
                <label htmlFor="Image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="form-control"
                  value={productdata.image}
                  onChange={handelchange}
                />
  
                <button type="submit" className="btn btn-success mt-4">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  