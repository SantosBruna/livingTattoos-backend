
exports.up = function(knex) {
    return knex.schema.createTable('tattoos', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('caracteristicas')
        table.binary('foto').notNull()
        table.integer('userId').references('id').inTable('users').notNull()
        table.boolean('fotoLoguin').defaultTo('false')
        table.boolean('viveiro').defaultTo('false')
    })


};

exports.down = function(knex) {
    return knex.schema.dropTable('tattoos')

};
