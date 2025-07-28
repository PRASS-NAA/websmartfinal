import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    email: schema.string.optional({}, [
      rules.email(),
      rules.exists({table:'users', column: 'email'})
    ])
  })


  public messages: CustomMessages = {
    string: '{{field}} must be a string',
    email: ' {{field}} must be a valid email',
    exists: '{{ field }} must exist in {{options.table}} table'
  }

  public data = this.ctx.request.qs();
}
