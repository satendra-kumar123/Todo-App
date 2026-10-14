import React, { useState } from 'react'
import { TodoContext } from './TodoContext.js'

function TodoContextProvider({children}) {
    const [todoList, setTodoList] = useState([])
    
  return (
    <TodoContext.Provider value={{todoList, setTodoList}}>
        {children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider