import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
import { NextResponse } from 'next/server';

export async function POST(request) {
    await dbConnect();

  try {
      const { productId, customerName, comment, rating } = await request.json();
      
    if (!productId || !customerName || !comment || typeof rating !== "number") {
      return NextResponse.json({
        success: false,
        message: "Missing required fields.",
      }, { status: 400 });
    }

    // Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product not found.",
      }, { status: 404 });
    }

    // Add review
    const newReview = { customerName, comment, rating };
    product.reviews.push(newReview);

    await product.save();

    return NextResponse.json({
      success: true,
      message: "Review added successfully.",
      product,
    },{ status: 200 });
  
  }catch (error) {
        console.log("Unexpected error occurred: " + error);
        return NextResponse.json({
            success: false,
            message: 'There is unexpected error occurs',
        }, { status: 500 });
    }

}