import "./index.css"
import data from "./data"
import { useState, useRef } from "react"
import TodoListItem from "./components/TodoListItem"
import CreateTodo from "./components/CreateTodo"
import { AnimatePresence } from "framer-motion"

function App() {
  const [todos, setTodos] = useState(data || [])
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  return (
    <>
      <div className="background w-screen min-h-screen flex justify-center items-center">
        {/* container  */}
        <div
          // transition={{ delay: 0 }}
          className="container flex flex-col justify-center items-center w-full"
        >
          {/* todo creation */}
          <CreateTodo setTodos={setTodos} />
          <div className="list-box w-full mt-5  h-[60vh] overflow-x-auto py-1  flex justify-start flex-col items-center">
            <AnimatePresence>
              {todos.map((todoItem, index) => (
                <TodoListItem
                  key={todoItem.id}
                  todoItem={todoItem}
                  todos={todos}
                  setTodos={setTodos}
                  index={index}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
