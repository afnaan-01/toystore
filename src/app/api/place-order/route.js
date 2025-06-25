import dbConnect from "@/lib/dbConnect";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


// Order ID Generator Function
function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ORD-${randomStr}`;
}

// Generate truly unique order ID
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
 const session = await getServerSession(authOptions);
 
  await dbConnect();

  try {
    const {
      fullName,
      email,
      paymentMethod,
      productId,
      quantity,
      totalAmount,
      address,
      city,
      state,
      landmark,
      phoneNo,
      pinCode,
      paymentId,
      paymentstatus,
      productAmount,
      shippingCharges,
      tax,
    } = await request.json();

    const phoneNoInt = parseInt(phoneNo);
    const pinCodeInt = parseInt(pinCode);
    const orderId = await generateUniqueOrderId();

    const newOrder = new orderModel({
      orderId,
      user: {
        id: session?._id || null,
        name: session?.user?.name || null,
        email: session?.user?.email || null,
      },
      shippingAddress: {
        fullName,
        email,
        countryCode: "+91",
        phoneNo: phoneNoInt,
        address,
        city,
        state,
        country: "India",
        pinCode: pinCodeInt,
        landmark,
      },
      product: {
        productId,
        quantity,
      },
      paymentMethod,
      paymentInfo: {
        paymentId,
        paymentstatus,
      },
      pricing: {
        productAmount,
        shippingCharges,
        tax,
        totalAmount,
      },
      orderAt: Date.now()
    });

    await newOrder.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully.",
        orderId,
        order: newOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while placing order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while placing order.",
      },
      { status: 500 }
    );
  }
}
