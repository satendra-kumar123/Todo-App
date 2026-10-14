import { useNavigate } from "react-router-dom"
function Btn() {
    const navigate = useNavigate()
    const backToHome = () => {
        navigate("/",{
           replace: true 
        })
    }
  return (
    <button onClick={backToHome} className="text-xl text-amber-700 font-bold p-2 hover:bg-amber-100 hover:rounded hover:cursor-pointer">X</button>
  )
}

export default Btn