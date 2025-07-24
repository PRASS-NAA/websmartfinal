import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    email: schema.string({}, [
      rules.exists({table: 'users', column: 'email'})
    ]),
    password: schema.string({})
    })

  public messages: CustomMessages = {
    required: '{{ field }} is a required field !! ',
    string: '{{ filed }} must be a string !! ',
    exists: '{{ field }} must exist in {{ options.table }} table !! '
  }
}
