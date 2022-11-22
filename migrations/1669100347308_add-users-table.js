/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(
        `
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(40),
            username VARCHAR(50) NOT NULL,
            email VARCHAR(40) NOT NULL,
            bio VARCHAR(200),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `
    )
};

exports.down = pgm => {
    `
    DROP TABLE users
    `
};
