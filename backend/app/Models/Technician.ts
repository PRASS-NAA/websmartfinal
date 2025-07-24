import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Appointment from './Appointment'

export default class Technician extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public speciality: string

  @hasMany(() => Appointment, { foreignKey: 'technician_id' })
  public appointments: HasMany<typeof Appointment>
}
