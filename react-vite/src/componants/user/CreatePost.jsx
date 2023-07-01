import { useState } from "react"
import "./CreatePost.scss"
import { ServiceUrl } from "../Helpers/Help"
import { useNavigate } from "react-router-dom"
export default function CreatePost() {
    const token = localStorage.getItem("token")
    const [text, setText] = useState("")
    const [headingText, setHeadingText] = useState("")
    const mainuRl = ServiceUrl()
    const navigator= useNavigate()

        const HandleCreatePost = async(e)=>{
            e.preventDefault()
            const options ={
                method : "POST",
                headers : {"Content-Type" : "application/json", 'header_kn' : token},
                body : JSON.stringify({
                    post_heading : headingText,
                    post_text: text
                })

            }
            const endpoint = mainuRl + "post/create"
            await fetch(endpoint, options).then(res =>res.json()).then(data =>{
                if (data.success) {
                    alert(data.message)
                    navigator("/posts")
                } else {
                    alert(data.message)
                    navigator("/createpost")
                }
            })
        }

  return (
    <div className="create-post">
      <div className="create">
        <div className="box">
            <p>Create post </p><hr/>
            <form onSubmit={HandleCreatePost}>
            <div className="input-heading">
            <input type="text" onChange={(e)=>setHeadingText(e.target.value)} placeholder="Enter post heading"/>
            </div>
            <div className="text-area">
            <textarea className="textarea" onChange={(e)=>setText(e.target.value)} placeholder="Enter your quote here" cols="24" rows="8" ></textarea>
            </div>
            <div className="btn-createpost">
                <button type="submit">Create</button>
            </div>
            </form>

        </div>
      </div>
    </div>
  )
}
