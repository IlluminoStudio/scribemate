const { defineConfig } = require('cypress')
const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on) {
      on('task', {
        'db:seed': async () => {
          const client = new Client({
            host: process.env.PGHOST || '127.0.0.1',
            port: 54322,
            user: 'postgres',
            password: 'postgres',
            database: 'postgres',
          })
          await client.connect()
          const sql = fs.readFileSync(
            path.join(process.cwd(), 'tests', 'seed.sql'),
            'utf8'
          )
          await client.query(sql)
          await client.end()
          return null
        },
      })
    },
  },
}) 