import { useNavigate } from "react-router-dom"
import { Auth } from "./AuthProvider"

export default function Authentication({children}) {
    const authuser = Auth()
    const navigator = useNavigate()
  return authuser.user ? children : navigator("/login")
}
