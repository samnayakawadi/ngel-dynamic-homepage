const isRequiredString = (field) => {
    return field !== null && field !== undefined && field.toString().trim() !== ""
}

const ValidationRules = {
    isRequiredString
}

export default ValidationRules