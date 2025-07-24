import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Vehicle from './Vehicle'
import Technician from './Technician'
import Service from './Service'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  public aId: number

  @column()
  public userId: number

  @column()
  public sId: number

  @column()
  public vId: number

  @column()
  public tId: number

  @column()
  public dateBooked: Date

  @column()
  public status: string

  @belongsTo(() => User, { foreignKey: 'id' })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Vehicle, { foreignKey: 'id' })
  public vehicle: BelongsTo<typeof Vehicle>

  @belongsTo(() => Technician, { foreignKey: 'id' })
  public technician: BelongsTo<typeof Technician>

  @belongsTo(() => Service, { foreignKey: 'id' })
  public service: BelongsTo<typeof Service>
}
