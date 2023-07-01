import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ServiceUrl } from "../Helpers/Help"

const authContext = createContext()

export  const AuthProvider = ({children})=> {
    const [user, setUser] = useState(false)
    const token = localStorage.getItem("token")
    const navigator = useNavigate()
    const url = ServiceUrl()

    useEffect(()=>{
        if (token !== null || undefined) {
        const authentication = async()=>{

            await fetch( url + "user/auth", {
                method : "POST",
                headers : { "Content-Type" : "application/json", "header_kn" : token}
            })
            .then(res =>res.json())
            .then(data =>{
                if (data.success) {
                    setUser(data.success)
                } else {
                    setUser(data.success)
                    localStorage.removeItem("token")
                    navigator("/login")
                }
            })
        }
       return ()=> authentication()
    }else{
        navigator("/")
        localStorage.removeItem("token")
    }
    }, [])
    
  return  <authContext.Provider value={{user}}>{children}</authContext.Provider>
}
export const Auth =()=>{
  return  useContext(authContext)
}
