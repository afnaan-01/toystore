import mongoose  from "mongoose";
 


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
    
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCodeExpiry:{
    type: Date,
  },
   credential: {
    type: String,
    required: [true, "Credential is required"],
  },
   
})
const UserModel = (mongoose.models.User) || mongoose.model('User', UserSchema);

export default UserModel;