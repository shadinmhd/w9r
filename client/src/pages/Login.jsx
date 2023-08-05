import { useState } from "react"
import Api from "../services/Api"
import { useNavigate } from "react-router-dom"
import Message from "../components/shared/Message"
import cookies from "js-cookie"

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()

    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        const { data } = await Api.post("/user/login", {
            username,
            password
        })

        if (data.success) {
            cookies.set("token", data.token, {expires : 7})
            navigate("/")
        } else {
            setMessage(data.message)
        }
    }

    return (<>
        <div className="login-page">
            <form className="form" onSubmit={handleSubmit}>
                <label>Login</label>
                <input placeholder="username" onChange={(e) => setUsername(e.target.value)} type="text" />
                <input placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password" />
                <div><button type="submit">Login</button><button onClick={() => navigate("/register")}>Register</button></div>
            </form>
            {
                message && <Message setMessage={setMessage} message={message} /> 
            }
        </div>

    </>)
}

export default Login