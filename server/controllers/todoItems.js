const TodoItem = require('../models').TodoItem

module.exports = {
  create (req, res) {
    return TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId
    }).then(todoItem => {
      return res.status(201).send(todoItem)
    })
      .catch(error => res.send(error))
  }
}
