import { assignIn } from 'lodash'
import TodoModel, { ITodoModel } from '../models/Todo'
import { ITodo } from '../interfaces/todo.interface'

class TodoRepository {
  public static async create(todo: ITodo): Promise<ITodoModel> {
    const savedTodo = new TodoModel(todo)
    return savedTodo.save()
  }

  public static async read(_id: string): Promise<ITodoModel | null> {
    return TodoModel.findOne({ _id })
  }

  public static async update(todo: ITodo, _id: string): Promise<ITodoModel | null> {
    let updatedTodo = await this.read(_id)

    if (updatedTodo === null) return null

    updatedTodo = assignIn(updatedTodo, todo)

    return updatedTodo.save()
  }

  public static async delete(_id: string): Promise<ITodoModel | null> {
    const todo = await this.read(_id)

    if (todo === null) return null

    await todo.remove()

    return todo
  }

  public static async list(): Promise<ITodoModel[]> {
    return TodoModel.find()
  }
}

export default TodoRepository
