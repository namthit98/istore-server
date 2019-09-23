import { Request, Response } from 'express'
import TodoRepository from '../repositories/todo.repository'

class TodoController {
  public create = async (req: Request, res: Response) => {
    const newTodo = await TodoRepository.create(req.body)
    res.jsonp(newTodo)
  }

  public read = async (req: Request, res: Response) => {
    const { id } = req.params
    const todo = await TodoRepository.read(id)

    if (!todo)
      res.status(400).jsonp({
        message: 'Todo is not existed!',
      })

    res.status(200).jsonp(todo)
  }

  public update = async (req: Request, res: Response) => {
    const { id } = req.params
    const todo = await TodoRepository.update(req.body, id)

    if (!todo)
      res.status(400).jsonp({
        message: 'Todo is not existed!',
      })

    res.status(200).jsonp(todo)
  }

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const todo = await TodoRepository.delete(id)

    if (!todo)
      res.status(400).jsonp({
        message: 'Todo is not existed!',
      })

    res.status(200).jsonp(todo)
  }

  public list = async (req: Request, res: Response) => {
    const todos = await TodoRepository.list()
    res.jsonp(todos)
  }
}

export default TodoController
