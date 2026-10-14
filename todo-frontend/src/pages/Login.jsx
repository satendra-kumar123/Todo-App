import { useContext, useState } from "react";
import Btn from "../components/Btn.jsx";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext)

  const loginYourSelf = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        return toast.error("credentials not correct");
      }
      const data = await response.json();
      setUser(data.user)
      navigate("/profile", {
        replace: true,
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-max w-1/2 m-auto shadow shadow-amber-500 rounded-2xl p-5">

      {/* { back to home btn } */}
      <div className="flex justify-between items-center">
        <Btn />
        <h1 className="text-xl font-bold text-blue-600">Login Yourself</h1>
      </div>

      {/* { login form } */}
      <form
        onSubmit={loginYourSelf}
        className="h-max flex flex-col mt-4 gap-5"
      >

        {/* { username input field} */}
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="enter your name"
          className="h-10 w-full rounded-xl pl-4 border-2 border-amber-300 outline-0"
        />

        {/* { password input field} */}
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="enter your password"
          className="h-10 w-full rounded-xl pl-4 border-2 border-amber-300 outline-0"
        />

        <button className="h-10 w-1/2 rounded-xl pl-4 border-2 border-blue-300 m-auto bg-blue-50 text-xl font-bold text-blue-600 hover:cursor-pointer">login</button>
      </form>

      {/* { go to register link } */}
      <p className="m-4">If not Registered ? <Link to={"/register"} className="text-xl font-bold text-amber-700 hover:rounded">
        Register
        </Link>
      </p>
      
    </div>
  );
}

export default Login;
