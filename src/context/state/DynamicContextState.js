import { useState } from "react"

const DynamicContextState = () => {

    const defaultDynamicContextState = {
        "eng": {
            "megh_Logo": {
                "type": "file",
                "link": "646634639b823c791e0807ec"
            },
            "call_us_now": {
                "type": "text",
                "value": "Call Us Now"
            },
            "call_us_phone": {
                "type": "text",
                "value": "01826-222061, 222062"
            },
            "enquiry_us": {
                "type": "text",
                "value": "Enquiry Us"
            },
            "enquiry_us_id": {
                "type": "text",
                "value": "itcell.ppa@punjabpolice.gov.in"
            },
        },
        "hnd": {
            "megh_Logo": {
                "type": "file",
                "link": "646634639b823c791e0807ec"
            },
            "call_us_now": {
                "type": "text",
                "value": "Call Us Now"
            },
            "call_us_phone": {
                "type": "text",
                "value": "fghfghfghfdgh"
            },
            "enquiry_us": {
                "type": "text",
                "value": "Enquiry Us"
            },
            "enquiry_us_id": {
                "type": "text",
                "value": "itcell.ppa@punjabpolice.gov.in"
            },
        },
        "tel": {
            "megh_Logo": {
                "type": "file",
                "link": "646634639b823c791e0807ec"
            },
            "call_us_now": {
                "type": "text",
                "value": "Call Us Now"
            },
            "call_us_phone": {
                "type": "text",
                "value": "43534656456456"
            },
            "enquiry_us": {
                "type": "text",
                "value": "Enquiry Us"
            },
            "enquiry_us_id": {
                "type": "text",
                "value": "itcell.ppa@punjabpolice.gov.in"
            },
        }
    }

    const [dynamicContextState, setDynamicContextState] = useState(defaultDynamicContextState)

    return { defaultDynamicContextState, dynamicContextState, setDynamicContextState }

}

export default DynamicContextState