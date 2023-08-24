import { useState } from "react"

const ValidationState = () => {

    const defaultValidationState = {
        textModalContent: {
            value: undefined
        },
        fileModalContent: {
            file: undefined
        },
        linkModalContent: {
            title: undefined,
            link: undefined
        }
    }

    const [validationState, setValidationState] = useState(defaultValidationState)

    return { defaultValidationState, validationState, setValidationState }

}

export default ValidationState