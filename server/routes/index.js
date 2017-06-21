const todosController = require('../controllers').todos
const todoItemsController = require('../controllers').todoItems

module.exports = app => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Todos API'
    })
  })

  app.post('/api/todos', todosController.create)
  app.get('/api/todos', todosController.index)
  app.get('/api/todos/:id', todosController.show)
  app.put('/api/todos/:id', todosController.update)
  app.delete('/api/todos/:id', todosController.destroy)
  app.post('/api/todos/:todoId/items', todoItemsController.create)
  app.put('/api/todos/:todoId/items/:itemId', todoItemsController.update)
  app.delete('/api/todos/:todoId/items/:itemId', todoItemsController.destroy)
}
