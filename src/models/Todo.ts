import * as mongoose from 'mongoose'
import { ITodo } from '../interfaces/todo.interface'

export interface ITodoModel extends ITodo, mongoose.Document {}

const todoSchema: mongoose.Schema<ITodoModel> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
    },
    status: {
      type: String,
      enum: ['pending', 'done', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ITodoModel>('Todo', todoSchema)
