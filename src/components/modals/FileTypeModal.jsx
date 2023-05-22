const FileTypeModal = ({ globalContextState, fileTypeHandlers }) => {

    return (
        <div>
            <div id="addNewQuiz" className={`modal ${(globalContextState.modal.status && globalContextState.modal.type === "file") && "is-active"}`}>
                <div className="modal-background" />
                <div className="modal-content">
                    <div className="box has-text-centered">
                        <div className="file is-info has-name">
                            <label className="file-label">
                                <input className="file-input" type="file" name="resume" onChange={fileTypeHandlers.fileTypeDataUpdateHandler}/>
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload" />
                                    </span>
                                    <span className="file-label">
                                        Upload File
                                    </span>
                                </span>
                                <span className="file-name">
                                    {globalContextState.fileModalContent.file.length !== 0 ? globalContextState.fileModalContent.file[0].name : "No File Selected"}
                                </span>
                            </label>
                        </div>
                        <hr />
                        <div className="columns is-centered is-vcentered">
                            <div className="column is-6">
                                <button className="button is-danger is-fullwidth" onClick={fileTypeHandlers.fileTypeModalResetHandler}>Close</button>
                            </div>
                            <div className="column is-6">
                                <button className="button is-success is-fullwidth" onClick={fileTypeHandlers.fileTypeDataSubmitHandler}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileTypeModal