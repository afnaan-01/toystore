import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request) {
     await dbConnect();
     const session = await getServerSession(authOptions);
     
      if (!session || !session.user) {
        return NextResponse.json({ 
            success: false, 
            message: "Unauthorized" 
        }, { status: 401 });
      }
    
       
      const userId = session._id;  
   try {
      const {
        addressId, 
        address, 
        city, 
        state, 
        landmark, 
        phoneNo, 
        pinCode } = await request.json();

        const user = await UserModel.findById(userId)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'There are no User present',
            }, { status: 400 });
        }


        const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId },
      {
        $set: {
          "addresses.$.address": address,
          "addresses.$.city": city,
          "addresses.$.state": state,
          "addresses.$.landmark": landmark,
          "addresses.$.phoneNo": phoneNo,
          "addresses.$.pinCode": pinCode,
        },
      },
      { new: true }
    );
   if(updatedUser){
    return NextResponse.json({
      success: true,
      message: "Address updated successfully",
      user: updatedUser,
    });
}
   } catch (error) {
     console.error("Error updating address:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error.message,
    }, { status: 500 });
  
   }    

}