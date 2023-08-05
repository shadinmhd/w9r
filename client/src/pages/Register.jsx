import { useState } from "react"
import Api from "../services/Api"
import { useNavigate } from "react-router-dom"
import Message from "../components/shared/Message"

const Register = () => {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [pass1, setPass1] = useState()
    const [pass2, setPass2] = useState()
    const [message, setMessage] = useState()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (pass1 == pass2) {
            const { data } = await Api.post("/user/register", {
                username,
                email,
                password: pass1
            })

            if (data.success) {
                navigate("/login")
            } else {
                setMessage(data.message)
            }
        }{
            setMessage("passwords dont match")
        }
    }
    return (<>
        {
            message &&
            <Message
                setMessage={setMessage}
                message={message}
            />
        }
        <form className="form" onSubmit={handleSubmit}>
            <label>Register</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" name="username" />
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" name="email" />
            <input onChange={(e) => setPass1(e.target.value)} type="password" placeholder="password" name="pass1" />
            <input onChange={(e) => setPass2(e.target.value)} type="password" placeholder="password" name="pass2" />
            <div><button type="submit">Register</button><button onClick={(e) => navigate("/login")}>Login</button></div>
        </form>
    </>)
}

export default Register