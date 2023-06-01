## TODO

- [x] setup project
- [x] create a input field
- [x] prep sample data
- [x] create list box
- [x] load data in list box
- [x] Build UI  
  - [x] Add todo
  - [x] delete todo
  - [x] update todo
  - [x] remove todo
- [x] define functions
- [x] Apply the functions in the app
- [x] Add accessibility of enter
- [x] Added focus out edit todos


- [x] Add some animations
- [x] change the scrollbar style
- [x] build add drag and drop
- [x] Add a  background
- [x] Animate todo reorder
- [x] create checkbox and strike through 

### Later
- [x] useRef to make editTodo focus automatically
      ---
      how does hooks work? do I need to turn it into a component to make this work?
      Never Mind, just need to do `autofocus={true}` inside of the input :)

- [x] change edit button in done button , in editmode


---

Motion reorder issue
--
description:

all the todos becoming jumpy. reorder of the todos not working as expected.

tried:
1. mapped values `todos.map(todo=>todo.id)`
   1. it did not work , todos started to disappear
2. `[...todos]`
   1. no changes
3. Removed animate presense. did not work