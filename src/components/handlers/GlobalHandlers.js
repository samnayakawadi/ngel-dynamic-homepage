import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"

const GlobalHandlers = () => {

    const { setGlobalContextState } = useContext(GlobalContext)

    const updateGlobalLanguageHandler = (e) => {
        setGlobalContextState(prevState => { return { ...prevState, lang: e.target.value } })
    }

    const globalHandlers = {
        updateGlobalLanguageHandler
    }

    return { globalHandlers }

}

export default GlobalHandlers