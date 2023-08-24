import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';

const FileTypeModal = ({ globalContextState, fileTypeHandlers, validationState, validationHandlers }) => {
   
    const handleCloseButton = () => {
        validationState.fileModalContent.file = undefined;
        fileTypeHandlers.fileTypeModalResetHandler();
    }
    return (
        <Modal show={globalContextState.modal.status && globalContextState.modal.type === "file"} onHide={handleCloseButton} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>
                <i className="fas fa-cloud-upload-alt mr-2"></i> Update File
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="file is-info has-name">
                    <label className="file-label">
                        <input className="file-input" type="file" name="resume" onChange={(e) => { fileTypeHandlers.fileTypeDataUpdateHandler(e); validationHandlers.fileTypeValidatorHandler(e) }} />
                        {/* <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload" />
                            </span>
                            <span className="file-label">
                                Upload File
                            </span>
                        </span> */}
                    </label>
                </div>
                <p className="help is-danger has-text-left">{validationState.fileModalContent.file}</p>
            </Modal.Body>
            <Modal.Footer>
            <div className="row w-100">
                    <div className="col-6">
                        <button className="btn btn-danger btn-block" onClick={handleCloseButton}>Close</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success btn-block" onClick={fileTypeHandlers.fileTypeDataSubmitHandler}>Update</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )

}

export default FileTypeModal