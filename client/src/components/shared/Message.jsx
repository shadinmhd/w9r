import { useEffect } from "react"

const Message = ({setMessage, message}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(false)
        }, 2000)
        return () => clearTimeout(timer)
    },[])

    return <div className="message">
        <span className="warning">&#9888;</span>{message}
    </div>
}

export default Message