import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(request) {
    await dbConnect();

    try {
        const { userId, address, city, state, landmark, phoneNo, pinCode } = await request.json();

        const user = await UserModel.findById(userId)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'There are no User present',
            }, { status: 400 });
        }
        if (user.addresses.length >= 3) {
             return NextResponse.json({
                success: false,
                message: 'You can only save up to 3 addresses.',
            }, { status: 400 });
        }
          const phoneNoInt = parseInt(phoneNo);
          const pinCodeInt = parseInt(pinCode);
        user.addresses.push({ address, city, state, pinCode: pinCodeInt, phoneNo: phoneNoInt, landmark });
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Address added successfully"
        }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Unexpected error occurred',
        }, { status: 500 });
    }
}