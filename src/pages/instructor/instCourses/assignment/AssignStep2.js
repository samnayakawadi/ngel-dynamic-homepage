import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AssignmentService from '../../../../services/AssignmentService';

////Assignment Step 2 
function AssignStep2(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    const [errorType, setErrorType] = useState();
    const [uploadFileCheck, setUploadFileCheck] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([])
    const selectFiles = (event) => {
        // event.preventDefault();
        // let fi = document.getElementById('file');
        let files = event.target.files;
        ////console.log("Selected Files : ", files)
        for (let i = 0; i < files.length; i++) {
            if (files[i].type != "application/pdf" && files[i].type != "application/x-zip-compressed" && files[i].type != "application/msword") {
                setErrorType("Invalid File Pls Select .pdf .doc or .zip Files");
                return;
            }
            else {
                setUploadFileCheck(true)
                setErrorType();
                setSelectedFiles(files)
            }
        }
    }

    const onClickupload = (e) => {

        e.preventDefault()

        if (uploadFileCheck == true) {

            for (let index = 0; index < selectedFiles.length; index++) {
                const form = new FormData();
                form.append('file', selectedFiles[index]);

                AssignmentService.postFileUpload(props.assignID, form).then((res) => {
                    ////console.log("Files Res - ", res.data)
                    ////console.log("File upload SuccessFull")
                }).catch((error) => {
                    //console.log(error);
                })
            }

            // document.getElementById('form').addEventListener('submit', function (e) {
            //     // e.preventDefault();

            //     // let fi = document.getElementById('file');
            //     // let files = fi.files;

            // })
        }
        else {
            //console.log("Error")
        }
    }

    const onClickBack = () =>{
        
    }

    if (props.steps !== 2) {
        return null;
    }
    else {

        return (
            <>
                <div>
                    <h4 class="control-label" style={{ textAlign: 'center' }}> Upload Files</h4>
                    <p class="control-label" style={{ textAlign: 'center' }}>Files Should be .pdf .doc or .zip</p>
                    <br />
                    <form id='form'>
                        <div className='row'>
                            <div className='col-md-6 offset-md-3'>
                                <input type='file' id='file' onChange={selectFiles} multiple />
                                {/* <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="file"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={selectFiles} />
                                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div> */}
                            </div>
                            <button class="btn btn-light" onClick={onClickupload} > Upload File </button>
                        </div>
                        <div>
                            {errorType ? <div className="alert alert-danger mt-2">{errorType}</div> : <></>}
                        </div>
                    </form>
                </div>
                {
                    props.uploadFileClick == true
                        ?
                        <>
                            <Button onClick={onClickBack} style={{ marginRight: "5px" }}> Previous </Button>
                        </>
                        :
                        <>
                        </>
                }
            </>
        )
    }
}


export default AssignStep2;
