import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Technicians extends BaseSchema {
  protected tableName = 'technicians'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()

      table.string('speciality').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
