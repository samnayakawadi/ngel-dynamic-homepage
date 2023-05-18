const Header = ({ headerHandlers, globalContextState }) => {
    return (
        <div className="p-2">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">

                        <div className="select">
                            <select name="lang" value={globalContextState.lang} onChange={headerHandlers.updateGlobalLanguageHandler}>
                                <option value="eng">English</option>
                                <option value="hnd">Hindi</option>
                                <option value="tel">Telugu</option>
                            </select>
                        </div>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header