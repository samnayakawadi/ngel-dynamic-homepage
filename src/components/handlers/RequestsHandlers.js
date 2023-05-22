import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import axios from "axios"

const RequestsHandlers = () => {

    const { globalContextState } = useContext(GlobalContext)

    const uploadFileHandler = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post(globalContextState.server.uploads + "/files/upload/bypassed", formData)
    }

    const requestHadlers = {
        uploadFileHandler
    }

    return { requestHadlers }

}

export default RequestsHandlers