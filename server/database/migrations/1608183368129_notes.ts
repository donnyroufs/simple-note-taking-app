import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Notes extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('category').notNullable().unique()
      table.string('content').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
