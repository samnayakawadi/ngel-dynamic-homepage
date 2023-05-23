import { useContext } from "react"
import { DynamicContext } from "../../context/DynamicContext"
import { GlobalContext } from "../../context/GlobalContext"

const LinkTypeHandlers = () => {

    const { dynamicContextState, setDynamicContextState } = useContext(DynamicContext)
    const { globalContextState, setGlobalContextState } = useContext(GlobalContext)

    const linkTypeModalUpdateHandler = (key) => {
        const lang = globalContextState.lang
        const title = dynamicContextState[lang][key].title
        const link = dynamicContextState[lang][key].link

        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: true, type: "link" }, linkModalContent: { ...prevState.linkModalContent, key: key, title: title, link: link } } })
    }

    const linkTypeDataUpdateHandler = (e) => {
        setGlobalContextState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, [e.target.name]: e.target.value } } })
    }

    const linkTypeDataSubmitHandler = () => {
        const lang = globalContextState.lang
        const key = globalContextState.linkModalContent.key
        const title = globalContextState.linkModalContent.title
        const link = globalContextState.linkModalContent.link
        setDynamicContextState(prevState => { return { ...prevState, [lang]: { ...prevState[lang], [key]: { ...prevState[lang][key], title: title, link: link } } } })
        linkTypeModalResetHandler()
    }

    const linkTypeModalResetHandler = () => {
        setGlobalContextState(prevState => { return { ...prevState, modal: { ...prevState.modal, status: false, type: null }, linkModalContent: { ...prevState.linkModalContent, key: null, link: undefined, title: undefined } } })
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