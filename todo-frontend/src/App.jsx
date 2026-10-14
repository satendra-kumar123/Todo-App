import {ToastContainer} from 'react-toastify'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import {Routes, Route} from 'react-router-dom'
import UpdateProfile from './components/UpdateProfile.jsx'
import Test from './components/Test.jsx'

function App() {
 
  return <>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/test' element={<Test/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/update-profile' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
    <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>  
  </Routes>
  <ToastContainer autoClose={2000} position="top-right" theme="light"/>
  </>
}

export default App
