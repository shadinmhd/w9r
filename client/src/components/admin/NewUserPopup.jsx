import { useState } from "react"
import Api from "../../services/Api"

const NewUserPopup = ({ setMessage, sestnewUser }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [role, setRole] = useState("")


    async function handleSubmit(e) {
        e.preventDefault()

        if (pass1 == pass2) {
            const { data } = await Api.post("/admin/addUser", ({
                name: username,
                email,
                password: pass1,
                role
            }))

            if(data.success){
                sestnewUser(false)
                setMessage(data.message)
            }else{
                setMessage(data.message)
            }
        } else {
            setMessage("passwords doesnt match")
        }
    }

    return <div className="newuser-page">
        <form className="form" onSubmit={handleSubmit}>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" name="username" />
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" name="email" />
            <input onChange={(e) => setPass1(e.target.value)} type="password" placeholder="password" name="pass1" />
            <input onChange={(e) => setPass2(e.target.value)} type="password" placeholder="password" name="pass2" />
            <div>
                admin <input onChange={(e) => setRole(e.target.value)} type="radio" name="role" value="admin" />
                user <input onChange={(e) => setRole(e.target.value)} type="radio" name="role" value="user" />
            </div>
            <div>
                <button type="submit">create</button><button onClick={() => sestnewUser(false)}>cancel</button>
            </div>
        </form>
    </div>
}

export default NewUserPopup