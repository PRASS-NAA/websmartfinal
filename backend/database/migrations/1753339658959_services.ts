import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Services extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')

      table.integer('price')

      table.string('description')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
