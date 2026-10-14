import { useState, useContext } from "react";
import Footer from "../components/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
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
      const response = await fetch("http://localhost:3000/todo/add-todo", {
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
    const response = await fetch("http://localhost:3000/user/logout", {
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
      const response = await fetch(`http://localhost:3000/todo/delete-todo/${Id}`, {
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
    const response = await fetch("http://localhost:3000/todo/update", {
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
      const response = await fetch(`http://localhost:3000/todo/isComplete/${id}`, {
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
    <div className="w-full h-full">
      {/* {nav bar}  */}
      <nav className="h-15 w-full border-b-2 border-amber-500 rounded px-5 py-3 gap-2 flex flex-row justify-between items-center">
        {/* {// logo} */}
        <div className="h-11 w-11 rounded-full bg-green-700 flex justify-center items-center">
          <img
            className="h-10 w-10 rounded-full"
            src="https://cdn.dribbble.com/userupload/23480349/file/original-ef389175dcd55caad45f56ac1e595c7d.png"
            alt=""
          />
        </div>

        {/* { // links} */}
        <div className="h-3/4 w-1/3 flex justify-center items-center gap-5 text-xl font-bold text-blue-800">
          {/* { home page link } */}
          <Link
            className="hover:border-b-2 hover:border-red-300 hover:cursor-pointer  hover:rounded"
            to={"/"}
          >
            Home
          </Link>

          {/* { update profile page btn } */}
          <Link
            to={"/update-profile"}
            className=" hover:border-b-2 hover:border-red-300 hover:cursor-pointer  hover:rounded"
          >
            My Profile
          </Link>

          {/* { logout btn } */}
          <button
            className="hover:border-b-2 hover:border-red-300 hover:cursor-pointer  hover:rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* {//main tag start} */}
      <main className=" w-full p-5 flex justify-between items-center">
        {/* { // first half} */}
        <div className="w-1/2 h-96 rounded m-2 border-2 border-amber-500">
          {/* {// profile card} */}
          <div className=" w-full h-[20%] bg-amber-200 pl-5 rounded flex items-center gap-10">
            {user.profilePic.url ? (
              <img
                src={user.profilePic.url}
                alt="photo"
                className="h-16 w-16 rounded-full object-cover border-3 border-amber-800"
              />
            ) : (
              <FaUser size={"2rem"} />
            )}
            <div>
              <h2 className="text-2xl font-bold text-blue-900">
                {user.username}
              </h2>
              <h4 className="text-xl  text-blue-900">{user.mob}</h4>
            </div>
          </div>

          {/* {// add todo card} */}
          <div className="w-[95%] mx-auto flex flex-col gap-10 mt-20 p-5 bg-amber-50 border-2 border-amber-100 rounded">
            {/* { todo input field } */}
            <input
              className="mx-auto bg-white h-10 w-full p-5 rounded border-2 border-amber-200 outline-0"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              type="text"
              placeholder="write your todo"
            />

            {/* { btns div } */}
            <div className="flex justify-between items-center">
              {/* { clear input btn } */}
              <button
                className="w-[30%] p-2 bg-red-300 rounded text-xl font-bold text-red-950"
                onClick={() => setTodo("")}
              >
                Clear
              </button>

              {/* { add todo btn } */}
              <button
                className="w-[30%] p-2 bg-blue-200 rounded text-xl font-bold text-blue-900"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        {/* {// second half} */}
        <div className="w-1/2 h-96 m-2 border-2 rounded border-amber-500">
          <div className="h-[20%] rounded bg-amber-200 flex justify-around items-center p-5">
            <h1 className="text-3xl font-bold text-blue-900 ">Todo List</h1>
            <h2 className="text-2xl font-bold text-blue-900">
              {todoList.length}
            </h2>
          </div>
          {/* { // todos container} */}
          <div className=" w-full h-[80%] overflow-auto scrollbar-none gap-2">
            {/* { todo item list } */}

            {todoList.length > 0 &&
  todoList.toReversed().map((item) => {
    return (
      <div
        key={item._id}
        className="flex justify-between items-center p-5 rounded border border-amber-300 m-1"
      >
        {/* completion checkbox */}
        <input className="h-8 w-8" type="checkbox" checked={item.complete} onChange={(e) => { isCompleteTodo(item._id, e.target.checked) } }/>

        {/* todo item data */}
        <div className="flex-1 mx-4">
          {editingId === item._id ? (
            <input
              autoFocus
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="text-blue-700 font-bold text-2xl w-full outline-none border-b-2 border-blue-500"
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
              <p className="text-blue-700 font-bold text-2xl">
                {item.content}
              </p>

              <p>{formatTime(item.updatedAt)}</p>
            </>
          )}
        </div>

        {/* buttons */}
        <div className="flex justify-between items-center gap-3">
          {/* delete button */}
          <button
            onClick={() => deleteTodo(item?._id)}
            className="bg-amber-300 p-2 rounded-full active:bg-blue-500"
          >
            <MdDelete size={"2rem"} color="red" />
          </button>

          {/* edit button */}
          <button
            onClick={() => handleEdit(item)}
            className="bg-amber-300 p-2 rounded-full active:bg-blue-500"
          >
            <FaPencilAlt size={"2rem"} color="blue" />
          </button>
        </div>
      </div>
    );
  })}
          </div>{" "}
          {/*{ todos container closing tag } */}
        </div>{" "}
        {/*{ second half closing tag } */}
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
