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
      
      /*
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'jayj', password: 'salianen'
        }).then(response => {
          localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })
      */
    
      it('a new note can be created', function() {
        cy.contains('new Note').click()
        cy.get('input').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
      })

      describe('and a note exists', function () {
        beforeEach(function () {
          cy.contains('new Note').click()
          cy.get('input').type('another note cypress')
          cy.contains('save').click()
        })
  
        it('it can be made important', function () {
          cy.contains('another note cypress')
            .contains('make important')
            .click()
  
          cy.contains('another note cypress')
            .contains('make not important')
        })
      })
    })  

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('jayd')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.get('html').should('not.contain', 'Jordan logged in')
    })

  })