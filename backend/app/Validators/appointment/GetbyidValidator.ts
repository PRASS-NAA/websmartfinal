import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetbyidValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number([rules.unsigned()
      ,
      rules.exists({table:'appointments', column:'id'})
    ])
  })


  public messages: CustomMessages = {
    number: '{{ field }} must be a number',
    unsigned: '{{ field }} must be positive',
    exists: '{{ field }} must exists in appointments table'
  }

  public data = this.ctx.params;
}
