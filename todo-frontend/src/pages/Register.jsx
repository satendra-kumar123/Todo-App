import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Btn from "../components/Btn.jsx";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [mob, setMob] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  // const {setUser} = useContext(UserContext)

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", username);
    formData.append("mob", mob);
    formData.append("password", password);
    formData.append("profilePic", profilePic);

    try {
      const response = await fetch("https://todo-app-ty8k.onrender.com/user/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        return toast.error("user not registered");
      }

      const data = await response.json();
      // setUser(data.user)
      navigate("/profile", {
        replace: true,
      });
      toast.success(data.message);

    } catch (error) {
      return error
    }
  };

  return (
    <div className="p-4 md:w-1/2 md:m-auto md:border-2 md:border-amber-600 md:mt-5 md:rounded-xl ">

      {/* {btn back to home} */}
      <div className="flex justify-between items-center">
        <Btn/>
        <h1 className="text-xl font-bold text-blue-600">First Register Yourself</h1>
        
      </div>

      {/* {form start here} */}
        <form action="" onSubmit={submit} className="flex flex-col mt-4 gap-5">

          {/* {username input field} */}
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          type="text"
          placeholder="Enter your username"
          className="h-10 w-full rounded-xl pl-4 border-2 border-amber-300 outline-0"
        />

        {/* {mob input field} */}
        <input
          onChange={(e) => {
            setMob(e.target.value);
          }}
          value={mob}
          type="number"
          placeholder="Enter your mobile no."
          className="h-10 w-full rounded-xl pl-4 border-2 border-amber-300 outline-0"
        />

        {/* {password input field} */}
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="Enter your password"
          className="h-10 w-full rounded-xl pl-4 border-2 border-amber-300 outline-0"
        />

        {/* {profilePic input field} */}

        {/* { note=> A file input's value attribute contains a string that represents the path to the selected file(s). If no file is selected yet, the value is an empty string (""). When the user selected multiple files, the value represents the first file in the list of files they selected. The other files can be identified using the input's HTMLInputElement.files property. } */}
        <input
          onChange={(e) => {
            setProfilePic(e.target.files[0]);
          }}
          type="file"
          placeholder="choose profile pic"
          className="h-10 w-full rounded-xl pl-4 border-2 border-amber-300 outline-0"
        />

        <button className="bg-blue-600 w-1/2 m-auto p-2 rounded-xl font-medium text-white active:bg-red-600 ">submit</button>
      </form>

      {/* { refer to login} */}

      <p className="m-4">If already registered ? <Link to={"/login"} className="text-xl font-bold text-amber-700 hover:rounded active:bg-black">Login</Link></p>
    </div>
  );
};

export default Register;
