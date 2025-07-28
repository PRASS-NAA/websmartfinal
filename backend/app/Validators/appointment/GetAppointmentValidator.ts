import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetAppointmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum.optional(['pending', 'finished'] as const),
    email : schema.string.optional({}, [
      rules.email(),
      rules.exists({table:'users', column: 'email'})
    ])
  })

  public messages: CustomMessages = {
    string: '{{ field }} must be string only ',
    enum: 'status must be either pending or finished only',
    email: 'email must be valid email format',
    exists: '{{ field }} must exist in {{options.table}} table'
  }

  public data = this.ctx.request.qs()
}
