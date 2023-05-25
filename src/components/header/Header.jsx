const Header = ({ globalHandlers, globalContextState }) => {
    return (
        <div className="p-2">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">

                        <div className="select">
                            <select name="lang" value={globalContextState.lang} onChange={globalHandlers.updateGlobalLanguageHandler}>
                                <option value="eng">English</option>
                                <option value="hnd">Hindi</option>
                                <option value="tel">Telugu</option>
                            </select>
                        </div>

                        <div>
                            <button className="button ml-2 is-danger" onClick={globalHandlers.editModeChangeHandler}>Edit</button>
                        </div>

                        {globalContextState.editMode && <div>
                            <button className="button ml-2 is-success">Save</button>
                        </div>}

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header