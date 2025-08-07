describe('Login flow', () => {
  before(() => {
    cy.resetDB()
  })

  it('coordinator logs in and session stored', () => {
    cy.loginUI('coordinator1', 'password123')
    cy.url().should('include', '/coordinator')
    cy.window().then(win => {
      const cur = win.localStorage.getItem('currentUser')
      expect(cur).to.not.be.null
      const parsed = JSON.parse(cur)
      expect(parsed.username).to.eq('coordinator1')
      expect(parsed.role).to.eq('coordinator')
      expect(parsed.expiry).to.be.greaterThan(Date.now())
    })
  })
}) 