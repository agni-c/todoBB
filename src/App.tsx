import "./index.css"
import data, { TodoInterface } from "./data"
import { useState, useRef, memo, useCallback } from "react"
import TodoListItem from "./components/TodoListItem"
import CreateTodo from "./components/CreateTodo"
import { AnimatePresence } from "framer-motion"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

function App() {
  const [todos, setTodos] = useState(data || [])

  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const [isEditMode, setIsEditMode] = useState(false)
  const [editItemId, setEditItemId] = useState("")
  const [content, setContent] = useState("")

  // dnd kit
  // not able to click on draggable elements
  // https://github.com/clauderic/dnd-kit/issues/591#issuecomment-1017050816
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    console.log({ active, over })
    if (!active.id || !over?.id) return

    if (active.id !== over.id) {
      const _todos = [...todos]

      const oldIndex = todos.findIndex((todo) => todo.id === active.id)
      const newIndex = todos.findIndex((todo) => todo.id === over.id)

      const [todoInDrag] = _todos.splice(oldIndex, 1)
      _todos.splice(newIndex, 0, todoInDrag)
      setTodos(_todos)
    }
  }

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

  // DND drop

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
    <>
      <div className="background w-screen min-h-screen flex justify-center items-center">
        {/* container  */}
        <div
          // transition={{ delay: 0 }}
          className="container flex flex-col justify-center items-center w-full"
        >
          {/* todo creation */}
          <CreateTodo setTodos={setTodos} />

          <div className="list-box w-full mt-5 h-[60vh] overflow-x-auto py-1  flex justify-start flex-col items-center">
            <AnimatePresence>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={todos}
                  strategy={verticalListSortingStrategy}
                >
                  {todos.map((todoItem, index) => (
                    <TodoListItem
                      key={todoItem.id}
                      todoItem={todoItem}
                      editTodo={editTodo}
                      removeTodo={removeTodo}
                      enterEditMode={enterEditMode}
                      isEditMode={isEditMode}
                      editItemId={editItemId}
                      content={content}
                      setContent={setContent}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
