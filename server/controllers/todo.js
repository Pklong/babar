const Todo = require('../models').Todo
const TodoItem = require('../models').TodoItem

module.exports = {
  create (req, res) {
    return Todo.create({
      title: req.body.title
    }).then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error))
  },
  index (req, res) {
    return Todo.findAll({
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(404).send(error))
  },
  show (req, res) {
    return Todo.findById(req.params.id, {
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    }).then(todo => {
      if (todo) {
        res.status(200).send(todo)
      } else {
        res.status(404).send({message: 'the todo is not here, it just isnt'})
      }
    })
      .catch(error => res.status(404).send(error))
  },
  update (req, res) {
    return Todo.findById(req.params.id, {
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    }).then(todo => {
      if (todo) {
        return todo.update({
          title: req.body.title || todo.title
        }).then(() => res.status(200).send(todo))
      } else {
        res.status(404).send({message: 'todo not found'})
      }
    }).catch(err => res.status(400).send(err))
  },
  destroy (req, res) {
    return Todo.findById(req.params.id)
      .then(todo => {
        if (todo) {
          return todo.destroy().then(() => res.status(204).send())
        } else {
          return res.status(404).send({message: 'no todo here'})
        }
      }).catch(err => res.status(400).send(err))
  }
}
