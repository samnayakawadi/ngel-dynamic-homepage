import { useState } from "react"

const GlobalState = ()=>{
    
    const [globalState, setGlobalState] = useState([])

    return {globalState, setGlobalState}
}

export default GlobalState;