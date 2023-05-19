import { useContext } from "react"
import Carousel from "../components/content/carousel/Carousel"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import { DynamicContext } from "../context/DynamicContext"
import { GlobalContext } from "../context/GlobalContext"
import Header from "../components/header/Header"
import TextTypeModal from "../components/modals/TextTypeModal"
import TextTypeHandlers from "../components/handlers/TextTypeHandlers"
import GlobalHandlers from "../components/handlers/GlobalHandlers"

const HomeLayouter = () => {

    const { globalHandlers } = GlobalHandlers()
    const { textTypeHandlers } = TextTypeHandlers()

    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState } = useContext(GlobalContext)

    return (
        <div>
            <TextTypeModal globalContextState={globalContextState} textTypeHandlers={textTypeHandlers} />
            <Header globalHandlers={globalHandlers} globalContextState={globalContextState} />
            <Navbar dynamicContextState={dynamicContextState} textTypeHandlers={textTypeHandlers} globalContextState={globalContextState} lang={globalContextState.lang} />
            <Carousel />
            <Footer />
        </div>
    )
}

export default HomeLayouter