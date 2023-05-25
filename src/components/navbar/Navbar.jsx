const Navbar = ({ dynamicContextState, textTypeHandlers, globalContextState, lang, fileTypeHandlers }) => {

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-flex is-flex-direction-row is-justify-content-center" >
                        <img src={`${globalContextState.server.uploads}/files/download/${dynamicContextState.eng.megh_Logo.link}`} alt="d" width={130} />
                    </div>
                    {globalContextState.editMode && <button className="button" onClick={() => { fileTypeHandlers.fileTypeModalUpdateHandler("megh_Logo") }}>
                        <i className="fa-solid fa-pen"></i>
                    </button>}
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {/* eslint-disable-next-line */}
                                <a className="button is-primary">
                                    <strong>{dynamicContextState[lang].call_us_now.value}</strong>
                                </a>
                                {globalContextState.editMode && <button className="button" onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("call_us_now") }}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>}
                                {/* eslint-disable-next-line */}
                                <a className="button is-light">
                                    {dynamicContextState[lang].enquiry_us.value}
                                </a>
                                {globalContextState.editMode && <button className="button" onClick={() => { textTypeHandlers.textTypeModalUpdateHandler("enquiry_us") }}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar