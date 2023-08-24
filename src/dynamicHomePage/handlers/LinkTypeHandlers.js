import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { DynamicContext } from "../../context/DynamicContext"
import { toast } from "react-toastify"
// import { Toast } from "react-bootstrap"
import ValidationHandlers from "./ValidationHandlers"

const LinkTypeHandlers = () => {

    const { dynamicContextState, setDynamicContextState } = useContext(DynamicContext)
    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)
    const { validationHandlers } = ValidationHandlers()

    const linkTypeModalUpdateHandler = (key) => {
        const lang = globalContextState.lang
        const title = dynamicContextState[lang][key].title.value
        const link = dynamicContextState[lang][key].link.value

        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: true, type: "link" }, linkModalContent: { ...prevState.linkModalContent, key: key, title: title, link: link } } })
    }

    const linkTypeDataUpdateHandler = (e) => {
        setGlobalContextState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, [e.target.name]: e.target.value } } })
    }
    const linkTypeDataSubmitHandler = () => {
        if (validationHandlers.linkTypeValidateAll()) {
            const lang = globalContextState.lang
            const key = globalContextState.linkModalContent.key
            const title = globalContextState.linkModalContent.title
            const link = globalContextState.linkModalContent.link
            // setDynamicContextState(prevState => { return { ...prevState, [lang]: { ...prevState[lang], [key]: { ...prevState[lang][key], title: title, link: link } } } });
            setDynamicContextState(prevState => { return { ...prevState, [lang]: { ...prevState[lang], [key]: { ...prevState[lang][key], title:{...prevState[lang][key].title, value:title} ,link:{...prevState[lang][key].link, value:link} } } } });

        //    console.log("dyanamiccontextstatechivlaue+",dynamicContextState.eng[key]);
            linkTypeModalResetHandler()
        }
        else {
            toast.error(" link Validation Error")
        }
    }

    const linkTypeModalResetHandler = () => {
        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: false, type: null }, linkModalContent: { ...prevState.linkModalContent, key: null, link: undefined, title: undefined } } })
        // console.log("==================------------------",dynamicContextState.eng.call_us_phone.title.value)

    }

    const linkTypeHandlers = {
        linkTypeDataUpdateHandler,
        linkTypeDataSubmitHandler,
        linkTypeModalResetHandler,
        linkTypeModalUpdateHandler
    }

    return { linkTypeHandlers }

}

export default LinkTypeHandlers