import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext.js"
import { TodoContext } from "../context/TodoContext.js"

function ProtectedRoute({children}) {
  const navigate = useNavigate()
  const {user,setUser} = useContext(UserContext)
  const {setTodoList} = useContext(TodoContext)
  let response

  useEffect(() => {
    async function checkUser() {
      response = await fetch('http://localhost:3000/user/me', {
        credentials: "include"
      })
      if(!response.ok) {
        return navigate("/login" ,{replace: true})
      }

      const data = await response.json()
      setUser(data.user)
      setTodoList(data.todos)
    }

    checkUser()

  }, [])

  return <>
  {user? children: <h1>loading data</h1>}
  </>
}

export default ProtectedRoute