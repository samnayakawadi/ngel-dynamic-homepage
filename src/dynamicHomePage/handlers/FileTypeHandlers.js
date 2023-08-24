import { useContext } from "react"
import { DynamicContext } from "../../context/DynamicContext"
import { GlobalContext } from "../../context/GlobalContext"
import ValidationHandlers from "./ValidationHandlers"
import { ValidationContext } from "../../context/ValidationContext"
import RequestsHandlers from "./RequestsHandlers"
import { toast } from "react-toastify"
// import { Toast } from "react-bootstrap"

const FileTypeHandlers = () => {

    const { dynamicContextState, setDynamicContextState } = useContext(DynamicContext)
    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)

    const { validationHandlers } = ValidationHandlers()
    const { setValidationState } = useContext(ValidationContext)

    const { requestHadlers } = RequestsHandlers()

    const fileTypeModalUpdateHandler = (key) => {
        const lang = globalContextState.lang
        const link = dynamicContextState[lang][key].link

        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: true, type: "file" }, fileModalContent: { ...prevState.fileModalContent, key: key, link: link } } })
    }

    const fileTypeDataUpdateHandler = (e) => {

        // console.log("Inside fileTypeDataUpdateHandler")
        // setValidationState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: undefined } } })

        const file = e.target.files
        setGlobalContextState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: file } } })
    }

    const fileTypeDataSubmitHandler = () => {
        const lang = globalContextState.lang
        const key = globalContextState.fileModalContent.key
        const file = globalContextState.fileModalContent.file

        if (file.length === 0) {
            toast.warn("Please Select The File")
        }
        else if (validationHandlers.fileTypeValidateAll()) {
            requestHadlers.uploadFileHandler(file[0]).then(res => {
                const fileId = res.data.fileData.fileId
                const parts = res.data.fileData.fileName.split(".");
                const fileExtension = parts[parts.length - 1];
                const fileLink = fileId + "." + fileExtension;

                console.log("fileLink : ", fileLink)
                // setGlobalContextState((prevState) => { return { ...prevState,server: {...prevState.server,uploads: `http://samnayakawadi.hyderabad.cdac.in:8093/file/download/${fileId}/bypassed`,}}})
                setDynamicContextState(prevState => { return { ...prevState, [lang]: { ...prevState[lang], [key]: { ...prevState[lang][key], link: fileLink } } } })

                toast.success("File Uploaded Successfully")
            }).catch(err => {
                toast.error("File Upload Failed")
                console.log("File Upload Failed error : ", err);
            })
            fileTypeModalResetHandler()
        }
        else {
            toast.error(" File Validation Error")
        }
    }

    const fileTypeModalResetHandler = () => {
        //they give the value to the veriable undefined when next time any one upload images like file = undefined
        setValidationState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: undefined } } })

        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: false, type: null }, fileModalContent: { ...prevState.fileModalContent, key: null, link: undefined, file: [] } } })
    }

    const fileTypeHandlers = {
        fileTypeModalUpdateHandler,
        fileTypeDataUpdateHandler,
        fileTypeDataSubmitHandler,
        fileTypeModalResetHandler
    }

    return { fileTypeHandlers }

}

export default FileTypeHandlers