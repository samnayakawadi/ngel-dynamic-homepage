import { useContext } from "react"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import { DynamicContext } from "../context/DynamicContext"
import { GlobalContext } from "../context/GlobalContext"
import Header from "../components/header/Header"
import TextTypeModal from "../components/modals/TextTypeModal"
import TextTypeHandlers from "../components/handlers/TextTypeHandlers"
import GlobalHandlers from "../components/handlers/GlobalHandlers"
import FileTypeModal from "../components/modals/FileTypeModal"
import FileTypeHandlers from "../components/handlers/FileTypeHandlers"
import LinkTypeModal from "../components/modals/LinkTypeModal"
import LinkTypeHandlers from "../components/handlers/LinkTypeHandlers"
import { ValidationContext } from "../context/ValidationContext"
import ValidationHandlers from "../components/validations/ValidationHandlers"

const HomeLayouter = () => {

    const { globalHandlers } = GlobalHandlers()
    const { textTypeHandlers } = TextTypeHandlers()
    const { fileTypeHandlers } = FileTypeHandlers()
    const { linkTypeHandlers } = LinkTypeHandlers()

    const { validationHandlers } = ValidationHandlers()

    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState } = useContext(GlobalContext)
    const { validationState } = useContext(ValidationContext)

    return (
        <div>
            <TextTypeModal globalContextState={globalContextState} textTypeHandlers={textTypeHandlers} validationState={validationState} validationHandlers={validationHandlers}/>
            <FileTypeModal globalContextState={globalContextState} fileTypeHandlers={fileTypeHandlers} />
            <LinkTypeModal globalContextState={globalContextState} linkTypeHandlers={linkTypeHandlers} />

            <Header globalHandlers={globalHandlers} globalContextState={globalContextState} />
            <Navbar dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers} globalContextState={globalContextState} lang={globalContextState.lang} fileTypeHandlers={fileTypeHandlers} />
            <Footer dynamicContextState={dynamicContextState} globalContextState={globalContextState} lang={globalContextState.lang} linkTypeHandlers={linkTypeHandlers} />
        </div>
    )
}

export default HomeLayouter