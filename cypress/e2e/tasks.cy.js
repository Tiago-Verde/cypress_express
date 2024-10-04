/// <reference types="cypress" />

describe('tarefas', ()=> {

    context('Cadastro', ()=>{

        it('deve cadastrar uma nova tarefa', ()=> {

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

})  


