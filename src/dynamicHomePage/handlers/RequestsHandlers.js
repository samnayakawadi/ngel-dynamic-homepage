import { useContext } from "react"
import axios from "axios"
import { GlobalContext } from "../../context/GlobalContext"
import md5 from "md5";

const RequestsHandlers = () => {

    const { globalContextState } = useContext(GlobalContext)

    const uploadFileHandler = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileHash", md5((file.size).toString()));
        return axios.post(globalContextState.server.imageUpload, formData)
    }
    // const formData = new FormData();
    // formData.append("file",file);
    // formData.append("fileHash", md5((file.size).toString()));


    const requestHadlers = {
        uploadFileHandler
    }

    return { requestHadlers }

}

export default RequestsHandlers