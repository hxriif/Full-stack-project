import React, { useContext, useState } from 'react';
import { Mycontext } from '../Context/Context';
import { useNavigate } from 'react-router';
import axios from "axios"
import toast from 'react-hot-toast';


const AddProduct = () => {

  const navigate=useNavigate()
  
  const [title, settitle] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const handleImageChange = (item) => {
    const selectedImage = item.target.files[0];
    setImage(selectedImage);


 }  

 const handleSubmit = async (item) => {
  item.preventDefault();

  if (!title || !image || !category || !price || !description) {
    toast.error("Please fill in all fields");
    return;
  }


  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", image);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("description", description);


  try {
    const jwtToken = {
      headers: {
        Authorization: `${localStorage.getItem("Admin jwt")}`,
      },
    };

    const response = await axios.post("http://localhost:3003/api/admin/add", formData, jwtToken);
    if (response.status === 201) {
      toast.success("Product added successfully!");
      navigate("/Adm");
    } else {

      toast.error("Failed to add product.");
    }
  } catch (error) {
    console.error("Error uploading product:", error.message);
    toast.error("Failed to add product.");
  }
};


const handleCategoryChange = (event) => {
  setCategory(event.target.value);
};


  return (
    <>
    
    
    <div className="container" >
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>

        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" onChange={(e)=>settitle(e.target.value)}   required />
        </div>
      
        
        
    <br></br>


    <div className="mb-3">
          <label htmlFor="src" className="form-label">Image:</label>
          <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                  placeholder="img-1" 
                />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="text" className="form-control" id="price" onChange={(e)=>setPrice(e.target.value)}   required />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type:</label>
          <select  id="type" onChange={handleCategoryChange}>
                <option value="">select</option>
                <option value="food">food</option>
                <option value="toy">toy</option>
                <option value="cloth">cloth</option>
                <option value="care">care</option>
         </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea className="form-control" id="description" onChange={(e)=>setDescription(e.target.value)}  required />
        </div>
        <button  className="btn btn-primary" >Add Product</button>
        <br/>
        <br/>
        <button  className="btn btn-success"  onClick={()=>navigate('/Adm')} >Back To All Product</button>
      </form>
    </div>
    </>
  );
};

export default AddProduct;