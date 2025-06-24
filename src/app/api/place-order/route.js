import dbConnect from "@/lib/dbConnect";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";

// Order ID Generator Function
function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 7; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ORD-${randomStr}`;
}

// Function to generate a truly unique orderId
async function generateUniqueOrderId() {
   
  let unique = false;
  let orderId;

  while (!unique) {
    orderId = generateOrderId();
    const existing = await orderModel.findOne({ orderId });
    if (!existing) {
      unique = true;
    }
  }

  return orderId;
}

export async function POST(request) {
  await dbConnect();

  try {
    const { fullName, email, paymentMethod, promoCode, productId, quantity, totalAmount, address, city, state, landmark, phoneNo, pinCode} = await request.json();

    const phoneNoInt = parseInt(phoneNo);
    const pinCodeInt = parseInt(pinCode);

    // Generate unique orderId
    const orderId = await generateUniqueOrderId();

    const newOrder = new orderModel({
      orderId,
      fullName,
      email,
      paymentMethod,
      promoCode,
      productId,
      quantity,
      totalAmount,
      address: [
        {
          address,
          city,
          state,
          pinCode: pinCodeInt,
          phoneNo: phoneNoInt,
          landmark,
        },
      ],
    });

    await newOrder.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully.",
        orderId, // Optionally return the orderId in response
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while placing order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while placing order.",
      },
      { status: 500 }
    );
  }
}
