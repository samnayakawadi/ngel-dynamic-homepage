import { useState } from "react"

const GlobalContextState = () => {

    const defaultGlobalContextState = {
        lang: "eng",
        server: {
            uploads: "http://samnayakawadi.hyderabad.cdac.in:8093"
        }
    }

    const [globalContextState, setGlobalContextState] = useState(defaultGlobalContextState)

    return { defaultGlobalContextState, globalContextState, setGlobalContextState }

}

export default GlobalContextState