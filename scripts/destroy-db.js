#!/usr/bin/env node

require('ts-node/register');

const path = require('path');
const { rimrafSync } = require('rimraf');
const knexConfig = require('../knexfile').default;

const filename = knexConfig.development.connection?.filename ?? '';

try {
  rimrafSync(path.resolve(filename));
} catch (error) {
  console.error(error);
  process.exit(1);
}
