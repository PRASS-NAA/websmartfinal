import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddserviceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    price: schema.number([rules.unsigned()]),
    description: schema.string({}),
    technician_id: schema.number([rules.unsigned(), rules.exists({table:'technicians', column:'id'})])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is a required field !!',
    string: '{{ field }} must be a string',
    number: ' {{ field }} must be a number',
    unsigned: '{{field}} must be postive',
    exists: '{{ field }} must be present in {{ options.table }} table'
  }
}
