import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyOtpValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    otp: schema.string({}),
    generatedOtp: schema.string({}),
    email: schema.string({}, [
      rules.unique({ table: 'users', column: 'email' }),
      rules.email()
    ]),
    password: schema.string({}, [
      rules.regex(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/),
      rules.minLength(6)
    ])
  })


  public messages: CustomMessages = {
    required: '{{ field }} is a required field !! ',
    string: ' {{ field }} must be a string !!',
    email: '{{ field }} must be a valid email !! ',
    regex: ' {{ field }} must contain at least one number and one special character.',
    unique: '{{ field }} is already taken.',
  }
}
