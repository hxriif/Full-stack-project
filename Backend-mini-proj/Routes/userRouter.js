const express = require("express");
const TryCatchMiddleware = require("../middlewares/Trycatchmiddleware");
const Usercontroller = require("../controllers/Usercontroller");
const router = express.Router();
const userVerifyToken=require('../middlewares/userAuthMiddleware')
     
router
  .post("/register", TryCatchMiddleware(Usercontroller.userRegister))
  .post("/login", TryCatchMiddleware(Usercontroller.userlogin))   

  .get("/products",TryCatchMiddleware(Usercontroller.userViewProduct))
  .get("/view/:id",TryCatchMiddleware(Usercontroller.productById))
  .get("/products/:categoryname",TryCatchMiddleware(Usercontroller.productByCategory))
  
.use(userVerifyToken)  
          
.post("/:id/cart",TryCatchMiddleware(Usercontroller.addToCart))    
.get("/:id/view/cart/",TryCatchMiddleware(Usercontroller.viewcart))
.delete("/:id/cart/:itemId",TryCatchMiddleware(Usercontroller.DeleteCart))
.post("/:id/wishlists",TryCatchMiddleware(Usercontroller.AddToWishlist))
.get("/:id/viewWishlist",TryCatchMiddleware(Usercontroller.viewwishlist))
.put("/:id/cart",TryCatchMiddleware(Usercontroller.updateCartItemQuantity))
.delete("/:id/removewishlist",TryCatchMiddleware(Usercontroller.deleteWishlist))
.post("/:id/payment",TryCatchMiddleware(Usercontroller.payment))
.get("/payment/success",TryCatchMiddleware(Usercontroller.success))
.post("/payment/cancel",TryCatchMiddleware(Usercontroller.cancel))   
.get("/:id/orders",TryCatchMiddleware(Usercontroller.orderDetails))             
        
          
module.exports = router;          
                           