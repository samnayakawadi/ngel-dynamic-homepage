const Navbar = ({ dynamicContextState, navbarHandlers }) => {

    return (
        <div className="py-2">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-flex is-flex-direction-row is-justify-content-center" >
                        <img src={`http://samnayakawadi.hyderabad.cdac.in:8093/files/download/${dynamicContextState.eng.megh_Logo.link}`} alt="d" width={130} />
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
                                    <strong>{dynamicContextState.eng.call_us_phone.value}</strong>
                                </a>
                                <button className="button">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                {/* eslint-disable-next-line */}
                                <a className="button is-light">
                                    {dynamicContextState.eng.enquiry_us_id.value}
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