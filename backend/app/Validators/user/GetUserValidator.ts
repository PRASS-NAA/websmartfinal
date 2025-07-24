import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetUserValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    email: schema.string.optional({}, [
      rules.email()
    ])
  })


  public messages: CustomMessages = {
    'email.string' : 'email must be a string',
    'email.email' : 'email must be a valid email'
  }
}
