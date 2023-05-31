import React, { useState } from "react"
import { makeEnterAccessible } from "../utils/helpers"
import { v4 as uuid } from "uuid"
import { TodoInterface } from "../data"

type CreateTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoInterface[]>>
}

const CreateTodo = ({ setTodos }: CreateTodoProps) => {
  const [newTodoContent, setNewTodoContent] = useState("")

  const addTodo = (content: string) => {
    if (!content) return
    const newTodo = {
      id: uuid(),
      content,
      completed: false,
      archived: false,
      selected: false,
    }
    setTodos((todos) => [...todos, newTodo])
    setNewTodoContent("")
  }
  return (
    <div className="w-3/5 min-h-[30vh] flex items-end">
      <input
        value={newTodoContent}
        onKeyUp={makeEnterAccessible(addTodo, newTodoContent)}
        onChange={(e) => setNewTodoContent(e.target.value)}
        className="todo-input outline-purple-800 border-purple-500 border-solid border-4 w-full rounded-lg h-12 px-2"
        type="text"
        placeholder="Add Todo!"
      />
      <button
        onClick={() => addTodo(newTodoContent)}
        className="btn btn-add  bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-3 ml-2"
      >
        ➕
      </button>
    </div>
  )
}

export default CreateTodo
