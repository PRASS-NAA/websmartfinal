import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Vehicle from './Vehicle'
import Technician from './Technician'
import Service from './Service'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  public Id: number

  @column()
  public serviceId: number

  @column()
  public vehicleId: number

  @column()
  public technicianId: number

  @column()
  public bookingDate: Date

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
