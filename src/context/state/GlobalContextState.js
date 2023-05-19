import { useState } from "react"

const GlobalContextState = () => {

    const defaultGlobalContextState = {
        lang: "eng",
        server: {
            uploads: "http://samnayakawadi.hyderabad.cdac.in:8093"
        },
        modal: {
            status: false,
            type: undefined, // text or file or link
        },
        textModalContent: {
            key: undefined,
            value: undefined
        }
    }

    const [globalContextState, setGlobalContextState] = useState(defaultGlobalContextState)

    return { defaultGlobalContextState, globalContextState, setGlobalContextState }

}

export default GlobalContextState