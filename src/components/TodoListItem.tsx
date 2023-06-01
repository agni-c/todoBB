/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { TodoInterface } from "../data"
import { motion } from "framer-motion"
import { makeEnterAccessible } from "../utils/helpers"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type TodoListProps = {
  todoItem: TodoInterface
  // setTodos: React.Dispatch<React.SetStateAction<TodoInterface[]>>
  editTodo: (id: string, content: string) => void
  removeTodo: (id: string) => void
  enterEditMode: (id: string) => void
  isEditMode: boolean
  editItemId: string
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  // index: number
  // dragItem: React.MutableRefObject<number | null>
  // dragOverItem: React.MutableRefObject<number | null>
  // onDragStart: (e: any, index: number) => void
  // onDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  // onDragEnd: () => void
}

// this component will: take care of the list item functionality
const TodoListItem = ({
  todoItem,
  editTodo,
  enterEditMode,
  removeTodo,
  content,
  editItemId,
  isEditMode,
  setContent,
}: TodoListProps) => {
  const [isCompleted, setIsCompleted] = useState(todoItem.completed)

  //D&D
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todoItem.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <motion.div
      className={`list-todos w-3/5 bg-purple-700 p-2 mb-2 rounded-md text-white flex justify-between items-center glowing-border`}
      // initial={{ scale: 0.8, opacity: 0 }}
      // animate={{ scale: 1, opacity: 1 }}
      // exit={{ scale: 0.8, opacity: 0 }}
      // transition={{ type: "just" }}
      // whileHover={{ scale: 1.04 }}
      // onDragStart={(e) => onDragStart(e, index)}
      // onDragOver={(ev) => ev.preventDefault()}
      // onDragEnter={(e) => onDragEnter(e, index)}
      // onDragEnd={onDragEnd}
      draggable
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 mr-2 "
            name={todoItem.content}
            id={todoItem.id}
            checked={isCompleted}
            onChange={() => setIsCompleted((isCompleted) => !isCompleted)}
          />
          <span
            className={`${isCompleted ? "line-through" : ""} `}
            onDoubleClick={() => {
              enterEditMode(todoItem.id)
            }}
          >
            {todoItem.content}
          </span>
        </div>
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
