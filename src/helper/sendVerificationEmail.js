import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";


export async function  sendVerificationEmail(email, name, verificationCode ) {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'toyweb | Verification code',
            react: VerificationEmail({name, otp:verificationCode })
        })
        return {success: true, message: "Verification Email Send Successfully"}
    } catch (error) {
        console.log("Error sending verfication email", error)
        return {success: false, message: "failed to send Verfication Email ! Please try again leater."}
    }
}