import { useState } from "react"
const GlobalContextState = () => {

    const defaultGlobalContextState = {
        currentId: "",
        currentPath: "",
        selectedIndex: 1,
        currentNodeType: '',
        apiData: [],
        discussionData: [],
        queryData: [],
        activityProgress: " ",
        DependencyActivityProgress: " ",
        arcane: "meghsikshak",

        lang: "eng",
        server: {
            // /files/dowload/${fileId}/bypassed
            // uploads: `http://samnayakawadi.hyderabad.cdac.in:8093` 
            originServer: "http://meghs1.hyderabad.cdac.in",
            imageUpload: `http://meghs1.hyderabad.cdac.in/content/files/upload`,
            jsonUpload: `http://meghs1.hyderabad.cdac.in/content`,
            imageDownload: `http://meghs1.hyderabad.cdac.in/dynamic-ngel/uploads`,
            jsonDownload: `http://meghs1.hyderabad.cdac.in/dynamic-ngel/json`
            // imageDownload: `http://meghs1.hyderabad.cdac.in:8097/content`,
        },
        modal: {
            status: false,
            type: undefined, // text or file or link
        },
        textModalContent: {
            key: undefined,
            value: undefined
        },
        fileModalContent: {
            key: undefined,
            link: undefined,
            file: []
        },
        linkModalContent: {
            key: undefined,
            title: undefined,
            link: undefined
        },
        autoClose: 4000,
        editMode: false
    }

    const [globalContextState, setGlobalContextState] = useState(defaultGlobalContextState)

    return { globalContextState, setGlobalContextState, defaultGlobalContextState }
}

export default GlobalContextState