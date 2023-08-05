import Api from "../../services/Api"

const DeletePopup = (props) => {

    async function handleDelete() {
        try{
            const {data} = await Api.delete(`/admin/deleteUser/${props.name}`)
            if(data.success){
                props.setDeleteMode(false)
            }else{
                props.setMessage(data.message)
            }
        }catch(err){
            console.log(err)
            props.setMessage("something went wrong")
        }
    }
    return (

        <div className="delete-page">
            <p>Do you want to delete {props.name}</p>
            <div>
                <button onClick={handleDelete}>yes</button> <button onClick={() => props.setDeleteMode(false)}>no</button>
            </div>
        </div>
    )
}

export default DeletePopup