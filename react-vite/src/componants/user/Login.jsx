import "./Login.scss"
import { useState } from "react"

export default function Login() {
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState("")
  const loginUser =()=>{
    const login =async()=>{
      const options ={
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          email : email,
          password : password
        })
      }
      await fetch("http://localhost:3500/user/login", options)
      .then(res =>res.json())
      .then(data =>{
        if (data.success) {
          alert(data.message)
        } else {
          alert(data.message)
        }
      })
    }
    login()
  }
  return (
    <div className="container-login">
      <div className="container-box">
        <div className="input-list">
          <h3 className="input-title">Login</h3><hr/>
          <form onSubmit={loginUser}>
            <div className="input-text">
              <input type="text" placeholder="Enter user name" onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="input-password">
              <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div className="input-btn">
              <input type="submit" value='Login'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
