import React, {  useEffect, useState } from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBContainer } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Adminnav from './Adminnav';
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewUsers() {
    const navigate = useNavigate()
    const [userdetail,setuserdetail]=useState([])
    // console.log(list);
    const handlClick = (userId) => {
        navigate(`/more/${userId}`)

    }


    const FetchAllProducts=async()=>{
      try {
        const jwtToken = {
          headers: {
            Authorization: `${localStorage.getItem("Admin jwt")}`,
          },
        };
      
        const response=await axios.get("http://localhost:3003/api/admin/users",jwtToken )
        if(response){
          setuserdetail(response.data.data)
        }
      } catch (error) {
        console.log(error)
        toast.error("No Products Found")
      }
      }
      
      
      useEffect(()=>{
        FetchAllProducts()
      },[])




  return (
    <>
    <Adminnav/>
    <MDBContainer>
    <MDBTable align='middle' className='mt-5'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {userdetail.map((user) => (

            <tr key={user._id} onClick={()=> handlClick(user._id)}>
               <td>
            <MDBBadge color='success' pill>
              {user._id}
            </MDBBadge>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.username} </p>
                <p className='text-muted mb-0'> </p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{user.email} </p>
            
          </td> 
        </tr>
        
            ))}
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>
    </>
  );
}