describe('Blog app', function() {

    beforeEach(function() {
          cy.login({ username: 'avigdorMans', password: 'avigdorM' })
      })
    //   it.only('login fails with wrong password', function() {
    //     cy.contains('login').click()
    //     cy.get('#username').type('mluukkai')
    //     cy.get('#password').type('wrong')
    //     cy.get('#login-button').click()
    
    //     cy.contains('invalid username or password')
    //   })

      it('user can log in', function() {
        cy.get('#username').type('avigdorMans')
        cy.get('#password').type('avigdorM')
        cy.get('#login-button').click()
        cy.contains('avi man logged-in')
      })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('avigdorMans')
            cy.get('#password').type('avigdorM')
            cy.get('#login-button').click()
        })

        it('a new blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('adding a new blog using cypress')
            cy.get('#author').type('Avigdor M.')
            cy.get('#url').type('mypage.com/api/add')
            cy.get('#creat').click()

            cy.contains('adding a new blog using cypress')
        })

        describe('and a note exists', function () {
             
            it('it can be liked', function () {
                cy.contains('adding a new blog using cypress')
                    .contains('view')
                    .click()
                cy.contains('likes 0')
      
                cy.contains('adding a new blog using cypress')
                    .get('#like')
                    .click()
                cy.contains('likes 1')
            })
            
            it('a blog can be deleted', function() {
                cy.contains('adding a new blog using cypress')
                .contains('view')
                .click()

                cy.contains('adding a new blog using cypress')
                .get('#delete')
                .click()
                cy.contains('another blog cypress').should('not.exist')
            })

                describe('order of blogs', function() {
                   
                    it(' the blogs are ordered according to likes', function() {
                        cy.createBlog({title:'third', author: 'avi', url:'avi/got_in_first'})
                        cy.createBlog({title:'second', author: 'avi', url:'avi/got_in_second'})
                        cy.createBlog({title:'first', author: 'avi', url:'avi/got_in_third'})
                        
                        cy.contains('first avi').contains('view').click()

                        cy.contains('likes 0').contains('like').click()

                        cy.contains('first avi').contains('view').click()

                        cy.contains('likes 1').contains('like').click()
                        
                        cy.contains('second avi').contains('view').click()

                        cy.contains('likes 0').contains('like').click()

                        cy.contains('first').then(first=>{
                            cy.contains('second').then(second=>{
                                cy.contains('third')
                            })
                        })

                        cy.contains('first avi')
                            .contains('view')
                            .click()

                        cy.contains('avi/got_in_third')
                            .get('#delete')
                            .click()
                        
                        cy.contains('second avi')
                            .contains('view')
                            .click()

                        cy.contains('avi/got_in_second')
                            .get('#delete')
                            .click()

                        cy.contains('third avi')
                            .contains('view')
                            .click()

                        cy.contains('avi/got_in_first')
                            .get('#delete')
                            .click()
                    })
                })
        })      
    })

})