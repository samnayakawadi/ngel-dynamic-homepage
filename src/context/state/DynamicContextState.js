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
            "enquiry_us": {
                "type": "text",
                "value": "Enquiry Us"
            },
            "footerHelp": {
                "type": "link",
                "title": "MeghSikshak 3.0",
                "link": "https://www.meghsikshak.in"
            }
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
            "enquiry_us": {
                "type": "text",
                "value": "हमसे पूछताछ करें"
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
            "enquiry_us": {
                "type": "text",
                "value": "మమ్మల్ని సంప్రదించండి"
            },
        }
    }

    const [dynamicContextState, setDynamicContextState] = useState(defaultDynamicContextState)

    return { defaultDynamicContextState, dynamicContextState, setDynamicContextState }

}

export default DynamicContextState