import { useState } from "react"

const NavbarState = () => {

    const defaultNavbarState = {

    }

    const [navbarState, setNavbarState] = useState(defaultNavbarState)

    return { defaultNavbarState, navbarState, setNavbarState }

}

export default NavbarState