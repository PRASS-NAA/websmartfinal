import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetAppointmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.optional({}, [
      rules.email(),
      rules.exists({table:'users', column:'email'})
    ])
  })


  public messages: CustomMessages = {
    'email.email': 'email must be valid email',
    exists: '{{field}} must exist in {{options.table}}'
  }

  public data = this.ctx.params;
}
