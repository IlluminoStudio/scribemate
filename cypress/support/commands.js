Cypress.Commands.add('resetDB', () => {
  cy.task('db:seed')
})

Cypress.Commands.add('loginUI', (username, password) => {
  cy.visit('/')
  cy.get('[data-testid="username-input"]').type(username)
  cy.get('[data-testid="password-input"]').type(password, { log: false })
  cy.get('[data-testid="login-submit"]').click()
}) 