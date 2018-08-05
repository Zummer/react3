exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('auth_key', 32).notNullable();
        table.string('password_hash').notNullable();
        table.string('password_reset_token').unique();
        table.smallint('status').notNullable().defaultTo(10);
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
