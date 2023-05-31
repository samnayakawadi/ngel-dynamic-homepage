import { useContext } from "react"
import { ValidationContext } from "../../context/ValidationContext"
import ValidationRules from "./ValidationRules"
import { GlobalContext } from "../../context/GlobalContext"

const ValidationHandlers = () => {

    const { setValidationState } = useContext(ValidationContext)
    const { globalContextState } = useContext(GlobalContext)

    const textTypeValidatorHandler = (field) => {
        if (!ValidationRules.isRequiredString(field)) {
            setValidationState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: "This Field Cannot Be Empty" } } })
            return false
        }
        else {
            setValidationState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: undefined } } })
            return true
        }
    }

    const textTypeValidateAll = () => {
        return textTypeValidatorHandler(globalContextState.textModalContent.value)
    }

    const validationHandlers = {
        textTypeValidatorHandler,
        textTypeValidateAll
    }

    return { validationHandlers }

}

export default ValidationHandlers