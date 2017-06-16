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
  app.post('/api/todos/:todoId/items', todoItemsController.create)
}
