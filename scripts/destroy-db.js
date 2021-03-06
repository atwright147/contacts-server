#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node/register');

const path = require('path');
const rimraf = require('rimraf');
const knexConfig = require('../knexfile').default;

rimraf(path.resolve(knexConfig.development.connection.filename), (err) => err && console.info(err));
