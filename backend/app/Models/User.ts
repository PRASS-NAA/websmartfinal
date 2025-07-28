
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Appointment from './Appointment'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public role: string

  @hasMany(() => Vehicle, {foreignKey:'oId'})
  public ownedVehicles : HasMany<typeof Vehicle>

  @hasMany(() => Appointment, {foreignKey:'id'})
  public madeAppointments : HasMany<typeof Appointment>
}
