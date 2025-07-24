import nodemailer from 'nodemailer'
import Env from '@ioc:Adonis/Core/Env'

export default class OtpService {
  async sendOtp(toEmail: string, otp: string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Env.get('SENDER_GMAIL'),
        pass: Env.get('MAIL_APP_PASSWORD'),
      },
    })

    const mailOptions = {
      from: Env.get('SENDER_GMAIL'),
      to: toEmail,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    }

    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (err) {
      console.error('Failed to send mail:', err)
      return false
    }
  }
}
