import { useEffect, useState } from "react"
import  "./Profile.scss"
import { ServiceUrl } from "../Helpers/Help"

export default function Profile() {
  const [profileView, setProfileView] = useState([])
  const token = localStorage.getItem("token")
  const url = ServiceUrl()

  useEffect(()=>{
    const fetchingProfile = async()=>{
      const endpoint = url + "user/user/profile";
      await fetch(endpoint, {
        method : "GET",
        headers : { "Content-Type" : "application/json", "header_kn" : token}
      }).then(res =>res.json())
      .then(data =>{
        if (data.success) {
          setProfileView(data.profile)
        } else {
          alert(data.message)
        }
      })
    }
    return () => fetchingProfile()
  },[])

  return (
    <div className="profile">
      <div className="container-profile">
        <div className="box">
          <div className="img">
          <img src="/dev.jpg" className="img-dev" alt=""/>
          </div>
          <div className="personal-info">
          <h2>Personal details</h2><hr/>
          <ul>
            <li>Name : {profileView.name}</li><br/>
            <li>Mobile : {profileView.mobile}</li><br/>
            <li>Gmail : {profileView.email}</li>
          </ul><br/>
          <div style={{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
            <button style={{
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  background: "rgb(128 232 245)",
                }}>edit</button>
            <button style={{
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  background: "rgb(128 232 245)",
                }}>following</button>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
