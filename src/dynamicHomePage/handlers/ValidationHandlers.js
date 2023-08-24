import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { ValidationContext } from "../../context/ValidationContext"
import {defaultDynamicContextState} from "../../context/states/DynamicContextState";


const ValidationHandlers = () => {

    const { setValidationState } = useContext(ValidationContext)
    const { globalContextState } = useContext(GlobalContext)
    // const { dynamicContextState} = useContext(DynamicContextState)
    //  const validationValue = dynamicContextState.["eng"].globalContextState.linkModalContent.key
    // const validationValue = {
    //     "regex": /^\+\d+$/,
    //     "errorMessage": "Only (character, numbers, symbols) are allowed",
    //     "minLength": "10",
    //     "maxLength": "25"
    // };
    
    const textTypeValidatorHandler = (field) => {
        const lang = globalContextState.lang
        const modelKey = globalContextState.textModalContent.key;
        const validationValue = defaultDynamicContextState[lang][modelKey];
    
        if (!(field !== null && field !== undefined && field.toString().trim() !== "")) {
            setValidationState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: "This Field Cannot Be Empty" } } })
            return false
        }
        else if (!field.match(validationValue["regex"])) {
            setValidationState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: validationValue.errorMessage } } })
            return false
        }
        else if (field.toString().trim().length < validationValue.minLength) {
            setValidationState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: `Value must be greater than ${validationValue.minLength} charecters` } } })
            return false
        }
        else if (field.toString().trim().length > validationValue.maxLength) {
            setValidationState(prevState => { return { ...prevState, textModalContent: { ...prevState.textModalContent, value: `Value must be less than ${validationValue.maxLength} charecters` } } })
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

    // Link type validation handler valiaton code

    const linkTypeValidatorHandler = (e) => {
        const lang = globalContextState.lang
        const modelKey = globalContextState.linkModalContent.key;
        const validationValue = defaultDynamicContextState[lang][modelKey];
        // console.log("validation value++++++++++++++++=",validationValue)
        // console.log("model key++++++++++++++++=",modelKey,"_+_+_+_+_")
        // console.log("e.target____",e.target)
        const field = e.target.value;
    //    console.log("value imp++",validationValue.title["regex"],"+_+_+_type of this is+",typeof validationValue.title["regex"])
        console.log("type+++++===++",typeof validationValue.title["regex"],"strstrtsrt",validationValue.title["regex"]);
        var DD = new RegExp(validationValue.title["regex"])
        console.log("type+++++===++DD",typeof DD,"strstrtsrtDD",DD);

        if (e.target.name === "title" && !(field !== null && field !== undefined && field.toString().trim() !== "")) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, title: "This Field Cannot Be Empty" } } })
            return false
        }
        else if (e.target.name === "link" && !(field !== null && field !== undefined && field.toString().trim() !== "")) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, link: "This Field Cannot Be Empty" } } })
            return false
        }
        else if (e.target.name === "title" && !field.match(validationValue.title["regex"])) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, title: validationValue.title.errorMessage } } })
            return false
        }
        else if (e.target.name === "link" && !field.match(validationValue.link["regex"])) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, link: validationValue.link.errorMessage } } })
            return false
        }
       
        else if ( e.target.name === "title" && field.toString().trim().length < validationValue.title.minLength) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, title: `Value must be ${validationValue.title.minLength} Charecter/Digit form starting.` } } })
            return false
        }
        else if ( e.target.name === "link" && field.toString().trim().length < validationValue.link.minLength) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, link: `Value must be ${validationValue.link.minLength} Charecter?Digit form starting.` } } })
            return false
        }
        else if ( e.target.name === "title" && field.toString().trim().length > validationValue.title.maxLength) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, title: `Value must be less than ${validationValue.title.maxLength} Charecter/Digit form starting.` } } })
            return false
        }
        else if ( e.target.name === "link" && field.toString().trim().length > validationValue.link.maxLength) {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, link: `Value must be less than ${validationValue.link.maxLength} Charecter/Digit form starting.` } } })
            return false
        }
        else {
            setValidationState(prevState => { return { ...prevState, linkModalContent: { ...prevState.linkModalContent, [e.target.name]:undefined} } })
            return true
        }
    }
    const linkTypeValidateAll = () => {
        return (linkTypeValidatorHandler({ target: { value: globalContextState.linkModalContent.link, name: "link" } }) && linkTypeValidatorHandler({ target: { value: globalContextState.linkModalContent.title, name: "title" } }));
        // converting name and size veriable in perticuler format
    }

    // for file validation code

    const fileTypeValidatorHandler = (e) => {
        const field = e.target.value
        const lang = globalContextState.lang
        const modelKey = globalContextState.fileModalContent.key;
        const validationValue = defaultDynamicContextState[lang][modelKey];
        // console.log("TypeofFieldchivalue", typeof field, "feieldchnav", field)
        // globalContextState.fileModalContent.key === "call_us_phone" &&
        // console.log("mo=f-------",validationValue.minLength)
        if (!field.match(validationValue["regex"])) {
            setValidationState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: validationValue.errorMessage } } })
            return false
        }
        // else if (e.target.files[0].size < validationValue.minLength) {
        //     setValidationState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: `File size must be greater than ${validationValue.minLength/1024}KB` } } })
        //     return false
        // }
        else if (e.target.files[0].size > validationValue.maxLength) {
            setValidationState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: `File size must be less than ${validationValue.maxLength/1024}MB` } } })
            return false
        }
        else {
            setValidationState(prevState => { return { ...prevState, fileModalContent: { ...prevState.fileModalContent, file: undefined } } })
            return true
        }
    }

    const fileTypeValidateAll = () => {
        return fileTypeValidatorHandler( {target:{value:globalContextState.fileModalContent.file[0].name, files:[{size:globalContextState.fileModalContent.file[0].size}]}})
        // converting name and size veriable in perticuler format
   
    }



    const validationHandlers = {
        textTypeValidatorHandler,
        textTypeValidateAll,
        linkTypeValidatorHandler,
        linkTypeValidateAll,
        fileTypeValidatorHandler,
        fileTypeValidateAll
    }

    return { validationHandlers }

}

export default ValidationHandlers