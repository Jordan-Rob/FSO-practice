describe('Note app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Jordan',
        username: 'jayj',
        password: 'salianen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
      cy.contains('Notes') 
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
        cy.get('#username').type('jayj')
        cy.get('#password').type('salianen')
        cy.get('#login-button').click()
        cy.contains('Jordan is logged in')
      })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('jayj')
        cy.get('#password').type('salianen')
        cy.get('#login-button').click()
      })
    
      it('a new note can be created', function() {
        cy.contains('new Note').click()
        cy.get('input').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
      })
    })  
  })