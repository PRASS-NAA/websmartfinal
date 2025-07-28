import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Appointment from './Appointment'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public Id: number

  @column()
  public type: string

  @column()
  public company: string

  @column()
  public modelName: string

  @column({columnName: 'o_id'})
  public oId: number // user ID

  @belongsTo(() => User, { foreignKey: 'oId' })
  public user: BelongsTo<typeof User>

  @hasMany(() => Appointment, { foreignKey: 'vehicle_id' })
  public appointments: HasMany<typeof Appointment>
}
