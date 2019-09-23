import { Application } from 'express'
import asyncMiddleware from '../middleware/async-middleware'
import TodoController from '../controllers/todo.controller'
import validationMiddleware from '../middleware/validation-middleware'
import todoValidation from '../validations/todo.validation'

class TodoRoute {
  private readonly _PRE_URL = '/api/todos'
  private _todoController: TodoController = new TodoController()

  public init(app: Application) {
    app
      .route(this._PRE_URL)
      .get(asyncMiddleware(this._todoController.list))
      .post(
        validationMiddleware(todoValidation.create),
        asyncMiddleware(this._todoController.create)
      )

    app
      .route(`${this._PRE_URL}/:id`)
      .get(validationMiddleware(todoValidation.read), asyncMiddleware(this._todoController.read))
      .patch(
        validationMiddleware(todoValidation.update),
        asyncMiddleware(this._todoController.update)
      )
      .delete(
        validationMiddleware(todoValidation.delete),
        asyncMiddleware(this._todoController.delete)
      )
  }
}

export default TodoRoute
