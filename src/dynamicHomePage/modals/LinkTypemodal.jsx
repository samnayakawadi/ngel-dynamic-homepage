import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LinkTypeModal = ({ globalContextState, linkTypeHandlers, validationState, validationHandlers }) => {
    const handleCloseButton = () => {
        validationState.linkModalContent.title = undefined;
        validationState.linkModalContent.link = undefined;
        linkTypeHandlers.linkTypeModalResetHandler();
    }
    return (
        <Modal show={globalContextState.modal.status && globalContextState.modal.type === "link"} onHide={handleCloseButton} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>
                    <i className="fas fa-link mr-2"></i> Update Link
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <div>
                    <h2 className="title is-3 has-text-centered my-2 pb-3">Update Link</h2>
                </div> */}
                <div className="form-group">
                    <label htmlFor="titleInput">Title :</label>
                    <input
                        id="titleInput"
                        className={`form-control ${validationState.linkModalContent.title !== undefined && "is-invalid"}`}
                        name="title"
                        value={globalContextState.linkModalContent.title}
                        onChange={(e) => { linkTypeHandlers.linkTypeDataUpdateHandler(e); validationHandlers.linkTypeValidatorHandler(e) }}
                        type="text"
                        placeholder="Enter The Text To Update"
                    />
                    <div className="invalid-feedback">{validationState.linkModalContent.title}</div>
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="linkInput">Link :</label>
                    <input
                        id="linkInput"
                        className={`form-control ${validationState.linkModalContent.link !== undefined && "is-invalid"}`}
                        name="link"
                        value={globalContextState.linkModalContent.link}
                        onChange={(e) => { linkTypeHandlers.linkTypeDataUpdateHandler(e); validationHandlers.linkTypeValidatorHandler(e) }}
                        type="text"
                        placeholder="Enter The Link To Update"
                    />
                    <div className="invalid-feedback">{validationState.linkModalContent.link}</div>
                </div>
                <hr />
                <div className="row w-100">
                    <div className="col-6">
                        <button className="btn btn-danger btn-block" onClick={handleCloseButton}>Close</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success btn-block" onClick={linkTypeHandlers.linkTypeDataSubmitHandler}>Update</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )

}

export default LinkTypeModal







