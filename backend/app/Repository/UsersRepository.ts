import User from "App/Models/User";
import jwt from "jsonwebtoken";
import Env from "@ioc:Adonis/Core/Env";
import OtpService from "App/Services/otpService";

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export default class UserRepository {
  public static async login(payload) {
    const user = await User.findByOrFail("email", payload.email);

    if (user.password === payload.password) {
      const tokenPayload = { id: user.id, email: user.email, role:user.role };

      const token = jwt.sign(tokenPayload, Env.get("JWT_SECRET"), {
        expiresIn: "1h",
      });

      return token;
    } else {
      throw new Error("Invalid credentials!!");
    }
  }

  public static async sendOtp(payload) {
    const otp = generateOtp();
    const otpService = new OtpService();
    const sent = await otpService.sendOtp(payload.email, otp);

    if (!sent) {
      throw new Error("Failed to send OTP");
    }

    return { otp };
  }

  public static async verifyOtp(payload) {
    const { otp, generatedOtp, email, password } = payload;

    if (otp !== generatedOtp) {
      return { success: false, message: "OTP verification failed!!" };
    }

    const user = await User.create({ email, password,role:'customer' });

    return { success: true, user, message: "OTP verified and user created successfully!!" };
  }

  public static async showUsers(email) {
    const users = await User.query().if(email, (query) => {
      query.where("email", email);
    });

    return users;
  }
}
