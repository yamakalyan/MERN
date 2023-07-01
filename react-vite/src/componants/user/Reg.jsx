import { useState } from "react"
import "./Reg.scss"
import { ServiceUrl } from "../Helpers/Help"
export default function Reg() {
  const [name, setName] = useState("")
  const [email, setEmail]= useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")

  const url = ServiceUrl()

  const regUser =(e)=>{
    e.preventDefault()
    const reg =async()=>{
      const options ={
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          name : name,
          email : email,
          mobile : mobile,
          password : password
        })
      }
      await fetch(url + "user/create", options)
      .then(res =>res.json())
      .then(data =>{
        if (data.success) {
          alert(data.message)
        } else {
          alert(data.message)
        }
      })
    }
    reg()

  }
  return (
    <div className="container-reg">
      <div className="container-box">
        <div className="input-list">
          <h3 className="input-title">Register</h3><hr/>
          <form onSubmit={regUser}>
            <div className="input-text">
              <input type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="input-text">
              <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="input-text">
              <input type="number" placeholder="Enter mobile" onChange={(e)=>setMobile(e.target.value)} required/>
            </div>
            <div className="input-password">
              <input type="password" placeholder="Create password" onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div className="input-btn">
              <input type="submit" value='Register'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
