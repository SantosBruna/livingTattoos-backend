// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'livingtattos',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
