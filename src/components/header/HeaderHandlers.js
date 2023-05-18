import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"

const HeaderHandlers = () => {

    const { setGlobalContextState } = useContext(GlobalContext)

    const updateGlobalLanguageHandler = (e) => {
        setGlobalContextState(prevState => { return { ...prevState, lang: e.target.value } })
    }

    const headerHandlers = {
        updateGlobalLanguageHandler
    }

    return { headerHandlers }

}

export default HeaderHandlers