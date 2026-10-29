import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaAnchor, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useContext } from "react";
import Footer from "../components/Footer.jsx";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.js";
import { TodoContext } from "../context/TodoContext.js";

function Profile() {

  const [todo, setTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const { todoList, setTodoList } = useContext(TodoContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    // Aap apne hisab se options set kar sakte hain
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // AM/PM format ke liye
    });
  };

  const addTodo = async () => {
    try {
      const response = await fetch("https://todo-app-ty8k.onrender.com/todo/add-todo", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });


      if (!response.ok) {
        return toast.error("todo not added");
      }

      const data = await response.json();

      toast.success(data.message);
      setTodoList(data.todos);
      setTodo("");
    } catch (error) {
      toast.error(error);
    }
  };

  const logout = async () => {
    const response = await fetch("https://todo-app-ty8k.onrender.com/user/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = response.json();
    if (response.ok) {
      navigate("/", { replace: true });
    }
    toast(data.message);
  };

  const deleteTodo = async (Id) => {
    try {
      const response = await fetch(`https://todo-app-ty8k.onrender.com/todo/delete-todo/${Id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        return toast.error("todo not deleted");
      }

      const data = await response.json();
      if (!data) {
        return toast.error("no data");
      }
      toast.success(data.message);
      setTodoList(data.todos)
    } catch (error) {
      toast.error(error);
    }
  };

  const updateTodo = async function () {
    const response = await fetch("https://todo-app-ty8k.onrender.com/todo/update", {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({editContent, editingId})
    })
    const data = await response.json()
    if(!response.ok) {
      return toast.error(data.message)
    }

    if(!data) {
      return toast.error("not found")
    }
    toast.success(data.message)
    setTodoList(data.todos)
  }

const handleEdit = (item) => {
  setEditingId(item._id);
  setEditContent(item.content);
};


const isCompleteTodo = async (id, isComplete) => {
try {
      const response = await fetch(`https://todo-app-ty8k.onrender.com/todo/isComplete/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({isComplete})
      });

      if (!response.ok) {
        return toast.error("todo not completed");
      }

      const data = await response.json();
      if (!data) {
        return toast.error("no data");
      }
      toast.success(data.message);
      setTodoList(data.todos)
    } catch (error) {
      toast.error(error);
    }
}

  return (
    <>
      <header className=" p-2 flex justify-between items-center gap-1 shadow shadow-amber-700">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINL6VJO67OF1H2h42vVlTZ6jBdVO6y0lSwN4787AQZ_OYuegKWu15ZBX3&s=10"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-blue-600 p-0.5 md:h-12 md:w-12 md:rounded-full md:border-2 md:border-amber-600 md:p-1"
        />
        <nav className="flex justify-around items-center gap-4 text-xs font-medium md:text-xl md:font-medium">
          <Link to={"/"}>
            <FaHome color="blue" size={25} />
          </Link>
          <Link to={"/update-profile"}>
            <FaUser color="blue" size={20}/>
          </Link>
          <button onClick={logout}><MdDelete color="purple" size={25}/></button>
        </nav>
      </header>

      <main className="m-4 md:w-full md:flex md:justify-between md:items-center md:gap-4 md:m-0 md:p-4">
        <section className="bg-purple-300 rounded-xl flex flex-col p-4 gap-2 shadow md:w-1/2 md:h-96 md:justify-between40 md:bg-blue-100">
        <div className="hidden w-full h-[20%] md:flex md:justify-between md:items-center">
          {user?.profilePic?.url ? (<img src={user?.profilePic?.url} alt="" className="h-16 w-16 rounded-full object-cover"/>) : <FaUser size={25}/>}
          <div>
            <h2>{user?.username || "sk"}</h2>
            <p>{user?.mob || "9089"}</p>
          </div>
        </div>
          <div className="md:mt-16 flex flex-col gap-2">
            <input
            className="h-8 w-full border-0 outline-0 bg-white shadow rounded pl-4 font-medium"
            type="text"
            placeholder="Add todo..."
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value)
            }}
          />
          <div className="flex justify-between items-center">
            <button className="bg-fuchsia-500 text-white rounded p-1" onClick={() => setTodo("")}>
              Clear
            </button>
            <button className="bg-cyan-600 text-white rounded p-1" onClick={addTodo}>Add</button>
          </div>
          </div>
        </section>

        <section className="h-max mt-4 rounded-xl md:w-1/2 md:h-96 md:m-0 md:bg-blue-100">
          <div className="flex justify-between items-center text-pink-700 font-medium md:p-4">
            <h3>Todos List</h3>
            <h3>{todoList?.length}</h3>
          </div>

          <div className="flex flex-col gap-0.5 h-[80%] overflow-auto scrollbar-none" >
            {
              todoList.length > 0 && todoList.toReversed().map((item) => {
                return (
                  <div key={item._id} className="w-full flex items-start gap-3 rounded-xl p-3 sm:p-4 shadow-sm shadow-fuchsia-400 transition hover:border-fuchsia-500 hover:shadow-md">
              {/* Checkbox */}
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-fuchsia-600"
                checked={item.complete} onChange={(e) => { isCompleteTodo(item._id, e.target.checked) } }
              />

              {/* Todo content */}
              <div className="min-w-0 flex-1">
                {
                  editingId === item?._id ? (
                    <input
                    autoFocus
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)} 
                    className=""
                    onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // yaha apna update API/function call karo
                  updateTodo()

                  setEditingId(null);
                }

                if (e.key === "Escape") {
                  setEditingId(null);
                }
              }}
              />
                  ) : (
                    <>
                    <p
                  className="wrap-break whitespace-normal text-sm sm:text-base
                  font-medium leading-relaxed text-gray-800"
                >
                  {item?.content || "DSA complete Lorem ipsum dolor sit amet. Lorem ipsum dolor sita met. Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  {formatTime(item?.updatedAt)}
                </p>
                    </>
                  )
                }
              </div>

              {/* Action buttons */}
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  aria-label="Edit todo"
                  className="rounded-md p-1.5 text-blue-600 transition
                 hover:bg-blue-50 hover:text-blue-700"
                 onClick={() => handleEdit(item)}
                >
                  <FaPencilAlt size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Delete todo"
                  className="rounded-md p-1.5 text-red-500 transition
                 hover:bg-red-50 hover:text-red-600"
                 onClick={() => deleteTodo(item?._id)}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
                )
              })
            }
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
