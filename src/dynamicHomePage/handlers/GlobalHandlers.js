import { useContext,useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"

const GlobalHandlers = () => {

    const { setGlobalContextState } = useContext(GlobalContext)
      const [loading, setLoading] = useState(false);

    const updateGlobalLanguageHandler = (e) => {
        
        setLoading(true);
        setGlobalContextState(prevState => { return { ...prevState, lang: e.target.value } })

        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }
     
    const editModeChangeHandler = () => {
        setGlobalContextState(prevState => { return { ...prevState, editMode: !prevState.editMode } })
    }
    
    const globalHandlers = {
        updateGlobalLanguageHandler,
        editModeChangeHandler
    }
    return { globalHandlers,loading,setLoading }
 
}

export default GlobalHandlers