import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Appointments extends BaseSchema {
  protected tableName = 'appointments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('service_id').references('id').inTable('services')

      table.date('booking_date')

      table.integer('vehicle_id').references('id').inTable('vehicles')

      table.integer('technician_id').references('id').inTable('technicians')

      table.enum('status',['finished', 'pending'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
