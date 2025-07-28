import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAppointmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehicle_id: schema.number([
      rules.unsigned(),
      rules.exists({table:'vehicles', column:'id'})
    ]),
    service_id: schema.number([
      rules.unsigned(),
      rules.exists({table:'services', column:'id'})
    ])
  })

  public messages: CustomMessages = {
    number: '{{field}} must be a number',
    unsigned: '{{ field }} must be positive number',
    exists: '{{field}} must be present in {{options.table}} table'
  }
}
