import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx';

function Home() {
 
  return (
    <>
      <header className=' p-2 flex justify-between items-center gap-1 shadow shadow-amber-700'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINL6VJO67OF1H2h42vVlTZ6jBdVO6y0lSwN4787AQZ_OYuegKWu15ZBX3&s=10" alt="" className='h-8 w-8 rounded-full border-2 border-blue-600 p-0.5 md:h-12 md:w-12 md:rounded-full md:border-2 md:border-amber-600 md:p-1'/>
        <nav className='flex justify-around items-center gap-2 text-xs font-medium md:text-xl md:font-medium'>
          <Link to={"/profile"} className='hover:bg-olive-500'>Profile</Link>
          <Link to={"/login"}> Login</Link>
          <Link to={"/register"}>Register</Link>
        </nav>
      </header>

      <main className=' text-xs md:text-5xl md:font-bold'>
        <section className='flex justify-around items-center m-2 p-2'>
          <p className='w-1/2'><span className='text-blue-400 font-bold'>Add your Todos</span> In a Simple Way</p>
          <img src="https://img.magnific.com/free-vector/people-making-list-illustration_53876-43029.jpg?semt=ais_hybrid&w=740&q=80" alt="" className='w-1/2 rounded-xl md:w-1/3'/>
        </section>
        <section className='flex justify-between items-center m-2 p-2'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGihLk6HTy9dgJ0OYLP6EeOhKpmUH69WQXjgwjvZPOag&s=10" alt="" className='w-1/2 rounded-xl md:w-1/3'/>
          <p className='w-1/2'><span className='text-red-400 font-bold'>Update your Todos</span> In a Simple Way</p>
        </section>
      </main>

      <footer className='text-xs md:text-xl'>
        <Footer/>
      </footer>
    </>
  )
}

export default Home