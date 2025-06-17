import productModel from "@/models/productModel"
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function  POST(request) {
     
    await dbConnect();
    try {
        const {collectionId} = await request.json();
        const fatchItemsByCollectionId = await productModel.find({ collectionId: collectionId });
       
        if (fatchItemsByCollectionId.length > 0) {
            return NextResponse.json({
                success: true,
                products: fatchItemsByCollectionId,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: 'There are no products in this collection',
            }, { status: 400 });
        }

    } catch (error) {
          console.log("Unexpected error occurred: " + error);
        return NextResponse.json({
            success: false,
            message: 'Unexpected error occurred',
        }, { status: 500 });
    }

    
}