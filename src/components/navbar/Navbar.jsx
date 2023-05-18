const Navbar = ({ dynamicContextState, navbarHandlers, globalContextState, lang }) => {

    return (
        <div className="py-2">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-flex is-flex-direction-row is-justify-content-center" >
                        <img src={`${globalContextState.server.uploads}/files/download/${dynamicContextState.eng.megh_Logo.link}`} alt="d" width={130} />
                    </div>
                    <button className="button">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {/* eslint-disable-next-line */}
                                <a className="button is-primary">
                                    <strong>{dynamicContextState[lang].call_us_phone.value}</strong>
                                </a>
                                <button className="button">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                {/* eslint-disable-next-line */}
                                <a className="button is-light">
                                    {dynamicContextState[lang].enquiry_us_id.value}
                                </a>
                                <button className="button">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar