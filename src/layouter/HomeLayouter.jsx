import { useContext } from "react"
import Carousel from "../components/content/carousel/Carousel"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import NavbarHandlers from "../components/navbar/NavbarHandlers"
import { DynamicContext } from "../context/DynamicContext"

const HomeLayouter = () => {

    const { navbarHandlers } = NavbarHandlers()

    const { dynamicContextState } = useContext(DynamicContext)

    return (
        <div>
            <Navbar dynamicContextState={dynamicContextState} navbarHandlers={navbarHandlers} />
            <Carousel />
            <Footer />
        </div>
    )
}

export default HomeLayouter