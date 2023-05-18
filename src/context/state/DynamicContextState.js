import { useState } from "react"

const DynamicContextState = () => {

    const defaultDynamicContextState = {

    }

    const [dynamicContextState, setDynamicContextState] = useState(defaultDynamicContextState)

    return { defaultDynamicContextState, dynamicContextState, setDynamicContextState }

}

export default DynamicContextState