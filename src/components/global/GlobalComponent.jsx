import { useContext } from "react"
import { Slide, ToastContainer } from "react-toastify"
import { GlobalContext } from "../../context/GlobalContext"

const GlobalComponent = () => {

    const { globalContextState } = useContext(GlobalContext)

    return (
        <div>
            <ToastContainer position="bottom-right"
                autoClose={globalContextState.autoClose} newestOnTop closeButton={false} transition={Slide} />
        </div>
    )
}

export default GlobalComponent