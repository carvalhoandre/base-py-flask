#!/usr/bin/env node

const setupFlaskApi = require('../utils/setupFlaskApi')

const args = process.argv.slice(2)
const projectName = args[0] || 'flask-api'

setupFlaskApi(projectName)
