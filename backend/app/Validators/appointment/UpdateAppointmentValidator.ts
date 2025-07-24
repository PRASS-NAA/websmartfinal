import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAppointmentValidator {
  constructor(protected ctx: HttpContextContract) {
    let payload = { id: ctx.params.id, status: ctx.request.body().status}

    ctx.request.updateBody(payload)
  }

  public schema = schema.create({
    id: schema.number([
      rules.exists({ table: 'appointments', column: 'id' })
    ]),

    status: schema.enum(['finished', 'pending'] as const)
  })

  public messages: CustomMessages = {
    exists: '{{field}} must exist in {{options.table}} table!!',
    enum : '{{field}} must be either finshed or pending'
  }
}
