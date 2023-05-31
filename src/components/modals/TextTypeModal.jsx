const TextTypeModal = ({ globalContextState, textTypeHandlers, validationState, validationHandlers }) => {

    return (
        <div>
            <div id="addNewQuiz" className={`modal ${(globalContextState.modal.status && globalContextState.modal.type === "text") && "is-active"}`}>
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="box">
                        <div>
                            <h2 className="title is-3 has-text-centered my-2 pb-3">Update Text</h2>
                        </div>
                        <hr />
                        <div>
                            <input className={`input ${validationState.textModalContent.value !== undefined && "is-danger"}`} value={globalContextState.textModalContent.value} onChange={(e) => { textTypeHandlers.textTypeDataUpdateHandler(e); validationHandlers.textTypeValidatorHandler(e.target.value) }} type="text" placeholder="Enter The Text To Update" />
                            <p className="help is-danger has-text-left">{validationState.textModalContent.value}</p>
                        </div>
                        <hr />
                        <div className="columns is-centered is-vcentered">
                            <div className="column is-6">
                                <button className="button is-danger is-fullwidth" onClick={textTypeHandlers.textTypeModalResetHandler}>Close</button>
                            </div>
                            <div className="column is-6">
                                <button className="button is-success is-fullwidth" onClick={textTypeHandlers.textTypeDataSubmitHandler}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextTypeModal