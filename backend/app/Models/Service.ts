import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Appointment from './Appointment'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description: string

  @hasMany(() => Appointment, { foreignKey: 'service_id' })
  public appointments: HasMany<typeof Appointment>
}
