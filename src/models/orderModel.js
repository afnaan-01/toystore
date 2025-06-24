 
import mongoose  from "mongoose";
 
const addressSchema = new mongoose.Schema({
    address:{
     type: String,
     required: [true, "address is required"],
   },
   city:{
    type: String,
    required: [true, "city is required"],
   },
   state:{
    type: String,
    required: [true, "state is required"],
   },
    country:{
    type: String,
    default: "India"
   },

   pinCode:{
    type: Number,
    required: [true, "pinCode is required"],  
   },
    countryCode:{
    type: String,
    default: "+91"
   },
   phoneNo:{
    type: Number,
    required: [true, "phoneNo is required"],
   }, 
   landmark:{
    type: String,
    default: null
   },
   

  })
 
 
 

const OrderSchema = new mongoose.Schema({
   orderId: {
    type:  String,
    required: [true, "order id is required"],
    unique: true,
   },
   fullName: {
    type:  String,
    required: [true, "full name is required"],
   },
   email: {
    type:  String,
    required: [true, "email is required"],
   },
  address: {
    type: [addressSchema],
  },
  paymentMethod: {
    type:  String,
    required: [true, "Payment Method is required"],
    default: "Cash on Delivery"
  },
   promoCode: {
    type:  String,
    default: null
  },
  productId: {
    type:  String,
    required: [true, "productId Method is required"],
  },
  quantity: {
    type:  Number,
    required: [true, "quantity Method is required"],
  },
  totalAmount: {
     type:  Number,
    required: [true, "quantity Method is required"],
  }

})
const orderModel = (mongoose.models.orderModel) || mongoose.model('orderModel', OrderSchema);

export default orderModel;