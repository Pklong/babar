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
  },
  update (req, res) {
    return TodoItem.findById(req.params.itemId)
      .then(todoItem => {
        if (todoItem) {
          return todoItem.update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete || todoItem.complete
          }).then(updatedTodoItem => res.status(200).send(updatedTodoItem))
            .catch(err => res.status(400).send(err))
        } else {
          res.status(404).send({message: 'todoItem not found'})
        }
      }).catch(err => res.status(500).send(err))
  },
  destroy (req, res) {
    return TodoItem.find({
      where: {
        id: req.params.itemId,
        todoId: req.params.todoId
      }
    }).then(todoItem => {
      if (todoItem) {
        return todoItem.destroy()
          .then(() => res.status(200).send({message: 'yay destroyed'}))
          .catch(err => res.status(400).send(err))
      } else {
        res.status(404).send({message: 'not todo here'})
      }
    }).catch(err => res.status(400).send(err))
  }
}
