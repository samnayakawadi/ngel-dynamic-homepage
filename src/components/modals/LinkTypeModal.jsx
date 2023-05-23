const LinkTypeModal = ({ globalContextState, linkTypeHandlers }) => {

    return (
        <div>
            <div id="addNewQuiz" className={`modal ${(globalContextState.modal.status && globalContextState.modal.type === "link") && "is-active"}`}>
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="box">
                        <div>
                            <h2 className="title is-3 has-text-centered my-2 pb-3">Update Text</h2>
                        </div>
                        <hr />
                        <div>
                            <input className="input is-primary" name="title" value={globalContextState.linkModalContent.title} onChange={linkTypeHandlers.linkTypeDataUpdateHandler} type="text" placeholder="Enter The Text To Update" />
                        </div>
                        <div>
                            <input className="input is-primary" name="link" value={globalContextState.linkModalContent.link} onChange={linkTypeHandlers.linkTypeDataUpdateHandler} type="text" placeholder="Enter The Text To Update" />
                        </div>
                        <hr />
                        <div className="columns is-centered is-vcentered">
                            <div className="column is-6">
                                <button className="button is-danger is-fullwidth" onClick={linkTypeHandlers.linkTypeModalResetHandler}>Close</button>
                            </div>
                            <div className="column is-6">
                                <button className="button is-success is-fullwidth" onClick={linkTypeHandlers.linkTypeDataSubmitHandler}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkTypeModal