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
                "value": "हमें अभी फ़ोन करें"
            },
            "call_us_phone": {
                "type": "text",
                "value": "01826-222061, 222062"
            },
            "enquiry_us": {
                "type": "text",
                "value": "हमसे पूछताछ करें"
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
                "value": "ఇప్పుడే మాకు కాల్ చేయండి"
            },
            "call_us_phone": {
                "type": "text",
                "value": "01826-222061, 222062"
            },
            "enquiry_us": {
                "type": "text",
                "value": "మమ్మల్ని సంప్రదించండి"
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