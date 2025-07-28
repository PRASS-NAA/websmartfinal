import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Servicecols extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('technician_id').references('id').inTable('technicians').onDelete('CASCADE').defaultTo(1)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('technician_id');
    })
  }
}
