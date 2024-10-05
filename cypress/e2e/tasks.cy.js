/// <reference types="cypress" />

describe('tarefas', ()=> {

    context('Cadastro', ()=>{

        it('deve cadastrar uma nova tarefa', ()=>{

            const taskName = 'Levar cachorro para passear'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                . should('be.visible')
                .should('have.text', taskName)                
    
        })
    
        it('não deve permitir tarefa duplicada', ()=> {
    
            const task = {
                name: 'Ir para academia',
                is_done: false
            }
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)
    
            cy.get('div[id="swal2-html-container"]')
                .should('have.text', 'Task already exists!')
                .should('be.visible')
    
        })
    
        it('campo obrigatório', ()=>{
    
            cy.createTask()
            cy.isRequired('This is a required field')
    
        })

    }) 
    
    context('Atualização', ()=>{

        it('deve concluir tarefa', ()=>{

            const task = {
                name: 'Estudar Cypress',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')



        })
    })

    context('Deleção', ()=>{

        it('deve deletar tarefa', ()=>{

            const task = {
                name: 'Estudar C++',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')



        })
    })

})  


