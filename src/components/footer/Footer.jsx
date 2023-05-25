const Footer = ({ dynamicContextState, globalContextState, lang, linkTypeHandlers }) => {
    return (
        <div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <a href={`${dynamicContextState[lang].footerHelp.link}`}>{dynamicContextState[lang].footerHelp.title}</a>
                        {/* eslint-disable-next-line */}
                        {globalContextState.editMode && <button className="button ml-2" onClick={() => { linkTypeHandlers.linkTypeModalUpdateHandler("footerHelp") }}>
                            <i className="fa-solid fa-pen"></i>
                        </button>}
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer