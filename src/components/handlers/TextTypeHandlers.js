import { useContext } from "react"
import { DynamicContext } from "../../context/DynamicContext"
import { GlobalContext } from "../../context/GlobalContext"
import ValidationHandlers from "../validations/ValidationHandlers"
import { toast } from "react-toastify"

const TextTypeHandlers = () => {

    const { dynamicContextState, setDynamicContextState } = useContext(DynamicContext)
    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)

    const { validationHandlers } = ValidationHandlers()

    const textTypeModalUpdateHandler = (key) => {
        const lang = globalContextState.lang
        const value = dynamicContextState[lang][key].value

        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: true, type: "text" }, textModalContent: { ...prevState.textModalContent, key: key, value: value } } })
    }

    const textTypeDataUpdateHandler = (e) => {
        setGlobalContextState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: e.target.value } } })
    }

    const textTypeDataSubmitHandler = () => {

        if (validationHandlers.textTypeValidateAll()) {
            const lang = globalContextState.lang
            const key = globalContextState.textModalContent.key
            const value = globalContextState.textModalContent.value
            setDynamicContextState(prevState => { return { ...prevState, [lang]: { ...prevState[lang], [key]: { ...prevState[lang][key], value: value } } } })
            textTypeModalResetHandler()
        }
        else {
            toast.error("Validation Error")
        }
    }

    const textTypeModalResetHandler = () => {
        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: false, type: null }, textModalContent: { ...prevState.textModalContent, key: null, value: undefined } } })
    }

    const textTypeHandlers = {
        textTypeDataUpdateHandler,
        textTypeDataSubmitHandler,
        textTypeModalResetHandler,
        textTypeModalUpdateHandler
    }

    return { textTypeHandlers }

}

export default TextTypeHandlers