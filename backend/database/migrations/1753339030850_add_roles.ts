import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddRoles extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role',['customer','staff','admin'])
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) =>
    {
      table.dropColumn('role')
    })
  }
}
