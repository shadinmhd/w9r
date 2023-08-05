import cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const Navbar = ({image, name, role}) => {

    const navigate = useNavigate()
    return <header>
        <div className="brand">
            <img src={image} alt="" />
            <p>{name} </p>
        </div>
        <nav>
            <button onClick={() => { cookies.remove("token"); navigate("/login") }}>logout</button>
            {
                role == "admin" && <button onClick={() => navigate("/admin")}>admin panel</button>
            }
        </nav>
    </header>
}

export default Navbar