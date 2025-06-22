import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { RateLimiterMemory } from 'rate-limiter-flexible';


const rateLimiter = new RateLimiterMemory({
    points: 5, // max 5 attempts
    duration: 900, // per 15 minutes
});


export async function POST(request) {
    await dbConnect();

    try {
        const { email, verificationCode } = await request.json();
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const key = `${email}_${ip}`;

        //handel too many requests 
        try {
            await rateLimiter.consume(key);
        } catch (rateLimit) {
            const retryMin = Math.round(rateLimit.msBeforeNext / (1000 * 60));
            return Response.json(
                {
                    success: false,
                    message: `Too many attempts. Try again in ${retryMin} Minutes.`,
                },
                { status: 429 }
            );
        }

        //verification of otp
        const user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not Found with this email',
                },
                { status: 500 }
            );

        }
        const isCodeValid = user.verificationCode === verificationCode;
        const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: 'Account verified successfully',
                },
                { status: 200 }
            );

        }
        else if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message: 'Verification code is Expired, Please Sign Up again to get New Code',
                },
                { status: 400 }
            );

        }
        else {
            return Response.json(
                {
                    success: false,
                    message: 'verification code is incorrect please try again with correct code',
                },
                { status: 400 }
            );
        }



    } catch (error) {
        console.error('Error while Verification of OTP:', error);
        return Response.json(
            {
                success: false,
                message: 'Error while Verification of OTP',
            },
            { status: 500 }
        );

    }
}