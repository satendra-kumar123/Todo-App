import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'
import TodoContextProvider from './context/TodoContextProvider.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <TodoContextProvider>
        <App/>
      </TodoContextProvider>
    </UserContextProvider>
  </BrowserRouter>
  
)
