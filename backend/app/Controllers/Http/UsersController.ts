// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserRepository from "App/Repository/UsersRepository";
import CreateAccValidator from "App/Validators/user/CreateAccValidator";
import GetUserValidator from "App/Validators/user/GetUserValidator";
import LoginValidator from "App/Validators/user/LoginValidator";
import VerifyOtpValidator from "App/Validators/user/VerifyOtpValidator";

export default class UsersController {
  public async login({ request, response }) {
    try {
      const payload = await request.validate(LoginValidator);
      const token = await UserRepository.login(payload);
      return response.status(200).json({ token, success: true, message: "LOG IN SUCCESSFUL!!" });
    } catch (err) {
      throw Object.assign(err, { location: 'UsersController - login', success: false });
    }
  }

  public async sendOtp({ request,response }) {
    try {
      const payload = await request.validate(CreateAccValidator);
      const result = await UserRepository.sendOtp(payload);
      console.log('otp sending to client ', result.otp)
      return response.status(200).json({ otp: result.otp, success: true, message: "OTP SENT SUCCESSFULLY!!" });
    } catch (err) {
      throw Object.assign(err, { location: 'UsersController - sendOtp', success: false });
    }
  }

  public async verifyOtp({ request, response }) {
  try {
    const payload = await request.validate(VerifyOtpValidator);
    const result = await UserRepository.verifyOtp(payload);

    if (!result.success) {
      return response.status(400).json(result);
    }

    return response.status(200).json(result);
  } catch (err) {
    throw Object.assign(err, { location: 'UsersController - verifyOtp', success: false });
  }
}

  public async index({ request, response }) {
    try {
      const { email } = await request.validate(GetUserValidator);
      const users = await UserRepository.showUsers(email);
      return response.status(200).json({ users, success: true, message: "Users fetched successfully!!" });
    } catch (err) {
      throw Object.assign(err, { location: 'UsersController - index', success: false });
    }
  }
}
