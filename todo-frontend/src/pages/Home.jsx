import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { AiFillHeart } from "react-icons/ai";
import Footer from '../components/Footer.jsx';

function Home() {
 
  return (
    <div className='h-full w-full'>

      {/* {navbar} */}
      <nav className='h-16 w-full p-3 gap-2 flex flex-row items-center border-b-2 border-amber-500 sticky top-0 bg-white'>

        {/* {navbar logo} */}
        <div className=' w-1/2'>
          <img className='h-10 w-10 rounded-full border-2 border-amber-500'  src="https://cdn.dribbble.com/userupload/23480349/file/original-ef389175dcd55caad45f56ac1e595c7d.png" alt="logo" />
        </div>

        {/* {navbar links} */}
        <div className=' w-1/2  flex flex-row justify-around rounded'>

          <Link to={"/profile"} className='p-2 font-bold text-zinc-800-900 hover:bg-amber-200/70 hover:p-2 hover:rounded hover:text-amber-800'>Profile</Link>

          <Link to={"/register"} className='p-2 font-bold text-zinc-800-900 hover:bg-amber-200/70 hover:p-2 hover:rounded hover:text-amber-800 flex justify-center items-center'><AiFillHeart/>Register</Link>

          <Link to={"/login"} className='p-2 font-bold text-zinc-800-900 hover:bg-amber-200/70 hover:p-2 hover:rounded hover:text-amber-800 flex justify-center items-center'><LuLogIn/> Login</Link>

          <Link to={"/profile"} className='p-2 font-bold text-zinc-800-900 hover:bg-amber-200/70 hover:p-2 hover:rounded hover:text-amber-800 flex justify-center items-center'><IoMdAdd/>Add Todo</Link>

        </div>
      </nav>

      {/* {main section starts} */}
      <main>

        {/* {first section of main} */}
        <div className='h-max p-5'>
          <div className='flex items-center justify-between'>
            <p className='text-7xl font-bold text-amber-600'>Welcome to our Todo Application</p>
            <img className='h-1/3 w-1/3 rounded-2xl border-2 border-amber-400' src="https://img.magnific.com/premium-psd/3d-spiral-notebook-with-checkmark-icon-task-completion-approved-notes-todo-list-management-r_585462-1292.jpg?w=360" alt="todo img" />
          </div>
          <div className=' flex justify-between items-center'>
            <img className='h-1/3 w-1/3 rounded-2xl border-2 border-amber-400' src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-illustration-svg-download-png-4609476.png" alt="" />
            <p className='text-7xl font-bold text-amber-600 ml-8'>Adding Todos in the Simple way</p>
          </div>
        </div>

        {/* {second section of main} */}
        <div className='h-max p-5 rounded '>
          <div className=' flex items-center justify-between'>
            <p className='text-7xl font-bold text-amber-600'>Update Your Todos Easily</p>
            <img className='h-1/3 w-1/3 rounded-2xl border-2 border-amber-400' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijYwQTfgSaW1r2gcteKsTHjW9iYbOl9f6hcH5fDrVbg&s=10" alt="" />
          </div>
          <div className=' flex items-center justify-between'>
            <img className='h-1/3 w-1/3 rounded-2xl border-2 border-amber-400' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijYwQTfgSaW1r2gcteKsTHjW9iYbOl9f6hcH5fDrVbg&s=10" alt="" />
            <p className='text-7xl font-bold text-amber-600 ml-8'>Delete Your Todos Easily</p>
          </div>
        </div>
      </main>

      {/* {footer section} */}
      <div className='h-max mt-16'>
        <Footer/>
      </div>
    </div>
  )
}

export default Home