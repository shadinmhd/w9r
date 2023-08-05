import { useEffect, useState } from "react";
import Api from "../services/Api";
import DeletePopup from "../components/admin/DeletePopup";
import Message from "../components/shared/Message";
import EditPopup from "../components/admin/EditPopup";
import NewUserPopup from "../components/admin/NewUserPopup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newUser, sestnewUser] = useState(false)
    const [message, setMessage] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            if (!Cookies.get("token")) {
                navigate("/login")
            } else {

                let res = await Api.get("/admin/check")
                if (res.data.success) {
                    const {data} = await Api.get("/admin/getUsers");
                    if (data.success) {
                        setUsers(data.users)
                    }

                } else {
                    navigate("/")
                }
            }
        })()
    }, [deleteMode, editMode, newUser])

    function selectUser(i) {
        let temp = [...users];
        setUser(temp[i]);
    }

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-page">

            {message &&
                <Message
                    setMessage={setMessage}
                    message={message}
                />
            }
            {deleteMode &&
                <DeletePopup
                    setMessage={setMessage}
                    setDeleteMode={setDeleteMode}
                    name={user.name}
                />
            }
            {editMode &&
                <EditPopup
                    user={user}
                    setMessage={setMessage}
                    setEditMode={setEditMode}
                />
            }
            {
                newUser &&
                <NewUserPopup
                    setMessage={setMessage}
                    sestnewUser={sestnewUser}
                />
            }
            <div className="admin-page">
                <div>
                    <input
                        style={{ padding: "5px" }}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or email"
                    />
                    <button onClick={() => sestnewUser(true)} style={{ marginLeft: "10px", padding: "4px" }}>New User</button>
                </div>
                <table id="users">
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>name</th>
                            <th>email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((e, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>
                                    <div>
                                        <button
                                            onClick={() => {
                                                selectUser(i);
                                                setEditMode(true);
                                            }}
                                        >
                                            edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                selectUser(i);
                                                setDeleteMode(true);
                                            }}
                                        >
                                            delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
