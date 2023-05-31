/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEvent, TouchEvent, PointerEvent, useRef } from "react"
import { useState } from "react"
import { TodoInterface } from "../data"
import { motion } from "framer-motion"
import { makeEnterAccessible } from "../utils/helpers"

type TodoListProps = {
  todoItem: TodoInterface
  setTodos: React.Dispatch<React.SetStateAction<TodoInterface[]>>
  todos: TodoInterface[]
  index: number
  dragItem: React.MutableRefObject<number | null>
  dragOverItem: React.MutableRefObject<number | null>
}

// this component will: take care of the list item functionality
const TodoListItem = ({
  todoItem,
  setTodos,
  todos,
  index,
  dragItem,
  dragOverItem,
}: TodoListProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editItemId, setEditItemId] = useState("")
  const [content, setContent] = useState("")

  const editTodo = (id: string, content: string) => {
    if (!content) return setIsEditMode(false)

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content }
      }
      return todo
    })
    setTodos(newTodos)
    setIsEditMode(false)
    setContent("")
  }
  const removeTodo = (id: string) => {
    if (!id) return
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }
  const enterEditMode = (id: string) => {
    setEditItemId(id)
    setIsEditMode(true)
  }

  //D&D

  const onDragStart = (e: any, index: number) => {
    dragItem.current = index
    console.log("on drag start", index)
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragOverItem.current = index
    console.log("on drag enter", index)
  }

  const onDragEnd = () => {
    const _todos = [...todos]

    if (dragItem.current === null || dragOverItem.current === null)
      return console.log({
        dragItemIndex: dragItem.current,
        dragOverItemIndex: dragOverItem.current,
      })

    const [todoInDrag] = _todos.splice(dragItem.current ?? -1, 1)
    _todos.splice(dragOverItem.current ?? -1, 0, todoInDrag)
    dragItem.current = null
    dragOverItem.current = null
    console.log({ _todos })

    setTodos(_todos)
  }

  return (
    <motion.div
      key={todoItem.id}
      className={`list-todos w-3/5 bg-purple-700 p-2 mb-2 rounded-md text-white flex justify-between items-center glowing-border`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "just" }}
      draggable
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      dragTransition={{
        bounceStiffness: 200,
        bounceDamping: 10,
        min: 0,
        max: 100,
      }}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(ev) => ev.preventDefault()}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
    >
      {isEditMode && editItemId === todoItem.id ? (
        <input
          className="text-black w-3/4  rounded-sm py-1 px-2 "
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={makeEnterAccessible(editTodo, editItemId, content)}
          onBlur={() => editTodo(editItemId, content)}
          value={content || todoItem.content}
          type="text"
          autoFocus={true}
        />
      ) : (
        <span
          onDoubleClick={() => {
            enterEditMode(todoItem.id)
          }}
        >
          {todoItem.content}
        </span>
      )}

      <span className="action-tray w-24 flex justify-between bg-white p-1  text-black text-sm rounded-full">
        {isEditMode && editItemId === todoItem.id ? (
          <div
            className="rounded-full w-8 h-8 bg-blue-400  flex justify-center items-center"
            onClick={() => editTodo(editItemId, content)}
          >
            ✔
          </div>
        ) : (
          <button
            onClick={() => enterEditMode(todoItem.id)}
            className="btn btn-edit rounded-full w-9 h-9 bg-purple-600"
          >
            📝
          </button>
        )}

        <button
          onClick={() => removeTodo(todoItem.id)}
          className="btn btn-delete  rounded-full w-9 h-9 bg-purple-600"
        >
          🚮
        </button>
      </span>
    </motion.div>
  )
}

export default TodoListItem
