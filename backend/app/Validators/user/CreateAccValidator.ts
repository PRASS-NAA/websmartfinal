import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAccValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
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
    regex: ' {{ field }} must contain at least one number and one special character.',
    unique: '{{ field }} is already taken.',
    minLength: '{{ field }} must be of length {{ argument }} atleast',
    string: ' {{ field }} must be a string',
    email: ' {{field}} must be a vlaid email'
  }
}
