// Update with your config settings.

// https://gist.github.com/tukkajukka/9893e5f111862d06044b73fa944a8741
require('ts-node/register');

import path from 'path';
import { Knex } from 'knex';

const dbFolder = path.join(__dirname, 'db');

const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(dbFolder, 'dev.sqlite3'),
    },
    migrations: {
      directory: path.join(dbFolder, 'migrations'),
    },
    seeds: {
      directory: path.join(dbFolder, 'seeds'),
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    useNullAsDefault: true,
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default knexConfig;
