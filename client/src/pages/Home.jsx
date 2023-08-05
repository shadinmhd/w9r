import Api from "../services/Api"
import { useEffect, useState } from "react"
import Navbar from "../components/shared/Navbar"
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"

const Home = () => {
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        if(!Cookies.get("token")){
            navigate("/login")
            return
        }
        (async () => {
            const { data } = await Api.get("/product/products")
            if (data.success) {
                setProducts(data.products)
            }
        })();
        (async () => {
            const { data } = await Api.get("/user/getUser")
            setUser(data.user)
        })()
    }, [])

    return (<>

        <Navbar role={user.role} name={user.name} image={"https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-web-donut-19090.jpg&fm=jpg"}/>
        <div className="products">
            {
                products.map((e, i) => {
                    return <div className="product-card" key={i}>
                        <img src={"https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=pexels-web-donut-19090.jpg&fm=jpg"} alt="" />
                        <p>{e.name}</p>
                        <p>₹ {e.price}</p>
                    </div>
                })
            }
        </div>

    </>)
}

export default Home