import React from 'react';
import { Modal, Button } from 'react-bootstrap';
const TextTypeModal = ({ globalContextState, textTypeHandlers, validationState, validationHandlers }) => {
     
    // if we click to close button then they make value of field is undefined
    
    const handleCloseButton  = () => {
        validationState.textModalContent.value = undefined;
        textTypeHandlers.textTypeModalResetHandler();
    }

       return (
         <Modal show={globalContextState.modal.status && globalContextState.modal.type === "text"} onHide={handleCloseButton} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>
                    <i className="fas fa-pencil-alt mr-2"></i> Update Text
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <div className="text-center mb-4">
                    <h2 className="h3 my-2 pb-3">Update Text</h2>
                </div> */}
                <div className="form-group">
                    <label htmlFor="textInput">Text :</label>
                    <input
                        id="textInput"
                        className={`form-control ${validationState.textModalContent.value !== undefined && "is-invalid"}`}
                        value={globalContextState.textModalContent.value}
                        onChange={(e) => { textTypeHandlers.textTypeDataUpdateHandler(e); validationHandlers.textTypeValidatorHandler(e.target.value) }}
                        type="text"
                        placeholder="Enter The Text To Update"
                    />
                    <div className="invalid-feedback">{validationState.textModalContent.value}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="row w-100">
                    <div className="col-6">
                        <button className="btn btn-danger btn-block" onClick={handleCloseButton}>Close</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success btn-block" onClick={textTypeHandlers.textTypeDataSubmitHandler}>Update</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )

}

export default TextTypeModal