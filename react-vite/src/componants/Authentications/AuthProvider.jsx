import { createContext, useContext, useEffect, useState } from "react"

const authContext = createContext()

export  const AuthProvider = ({children})=> {
    const [user, setUser] = useState(false)
    const token = localStorage.getItem("token")

    useEffect(()=>{
        const authentication = async()=>{

            await fetch("http://localhost:3500/user/auth", {
                method : "POST",
                headers : { "Content-Type" : "application/json", "header_kd" : token}
            })
            .then(res =>res.json())
            .then(data =>{
                if (data.success) {
                    setUser(data.success)
                } else {
                    setUser(data.success)
                }
            })
        }
       return ()=> authentication()
    }, [])
    
  return  <authContext.Provider value={{user}}>{children}</authContext.Provider>
}
export const Auth =()=>{
  return  useContext(authContext)
}
