import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import CartItem from "./CartItem"
import CartSummary from "./CartFinal";
import { useNavigate } from "react-router-dom";
import { Axios } from "../App";
import toast from "react-hot-toast";

const Carts = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("UserId");



  const fetchCartProducts = async () => {
    try {
      const response = await Axios.get(`api/users/${userId}/view/cart`);
      setCart(response.data.data.cart,"hhhhh");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await Axios.delete(`/api/users/${userId}/cart/${itemId}`);
      if (response?.data.data.message) {
        toast.success(response.data.message);
        fetchCartProducts();
      }
    } catch (error) {
      setError(error);
      toast.error('Error removing product from the cart');
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <section className="h-auto h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-7">
              {/* Cart items */}
              {cart && cart.map((item) => (
                <CartItem key={item.productsId} item={item} onRemoveItem={handleRemoveItem} />
              ))}
            </div>
            <div className="col-lg-5">
              Cart summary
              <CartSummary cart={cart} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carts