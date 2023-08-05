import { useState } from "react"
import Api from "../../services/Api"

const EditPopup = ({ user, setEditMode, setMessage }) => {

    const [username, setUsername] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState(user.role)

    async function handleSave(e) {
        e.preventDefault()
        const {data} = await Api.put("/admin/editUser", {
            _id : user._id,
            name : username,
            email,
            role
        })

        if(data.success){
            setMessage(data.message)
            setEditMode(false)
        }else{
            setMessage(data.message)
        }

    }

    return <>
        <div className="edit-page">
            <form className="form" onSubmit={handleSave}>
                <input onChange={(e) => setUsername(e.target.value)} type="text" value={username} placeholder="username" />
                <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder="email" />
                <div>
                    admin <input onChange={(e) => setRole(e.target.value)} type="radio" name="role" value="admin" />
                    user <input onChange={(e) => setRole(e.target.value)} type="radio" name="role" value="user" />
                </div>
                <div>
                    <button type="submit">Save</button>
                    <button onClick={() => setEditMode(false)}>cancel</button>
                </div>
            </form>
        </div>
    </>
}

export default EditPopup