import { useContext } from "react"
import Carousel from "../components/content/carousel/Carousel"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import NavbarHandlers from "../components/navbar/NavbarHandlers"
import { DynamicContext } from "../context/DynamicContext"
import { GlobalContext } from "../context/GlobalContext"
import Header from "../components/header/Header"
import HeaderHandlers from "../components/header/HeaderHandlers"

const HomeLayouter = () => {

    const { navbarHandlers } = NavbarHandlers()
    const { headerHandlers } = HeaderHandlers()

    const { dynamicContextState } = useContext(DynamicContext)
    const { globalContextState } = useContext(GlobalContext)

    return (
        <div>
            <Header headerHandlers={headerHandlers} globalContextState={globalContextState} />
            <Navbar dynamicContextState={dynamicContextState} navbarHandlers={navbarHandlers} globalContextState={globalContextState} lang={globalContextState.lang} />
            <Carousel />
            <Footer />
        </div>
    )
}

export default HomeLayouter