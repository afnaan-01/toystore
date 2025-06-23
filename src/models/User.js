import { Landmark } from "lucide-react";
import mongoose  from "mongoose";
 
const addressSchema = new mongoose.Schema({
   address:{
     type: String,
   },
   city:{
    type: String,
   },
   state:{
    type: String,
   },
    country:{
    type: String,
    default: "India"
   },

   pinCode:{
    type: Number,
     
   },
    countryCode:{
    type: String,
    default: "+91"
   },
   phoneNo:{
    type: Number,
    
   },

   landmark:{
    type: String,
   },
   

  })

const UserSchema = new mongoose.Schema({
   name: {
    type:  String,
    required: [true, "name is required"],
   },
   email: {
    unique: true,
    type:  String,
    required: [true, "email is required"],
   },
   password: {
    type: String,
    default: null
  },
  verificationCode: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCodeExpiry:{
    type: Date,
    default: null,
  },
   credential: {
    type: String,
    required: [true, "Credential is required"],
  },
   addresses: {
    type: [addressSchema],
    default: [],
    validate: {
      validator: function (v) {
        return v.length <= 3;
      },
      message: props => `You can only have up to 3 addresses. You have ${props.value.length}.`
    }
  }
   
})
const UserModel = (mongoose.models.User) || mongoose.model('User', UserSchema);

export default UserModel;