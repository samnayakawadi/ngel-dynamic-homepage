import React from 'react';
import { useState, useEffect } from 'react';
import service from '../../services/service';
import swal from 'sweetalert';
import UserService from '../../services/UserService';

function AssignmentFileUpload(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    // //console.log("In assignment Upload" + props.userId + props.courseId + props.assignId);
    const [getabc, setabc] = useState(
        {
            selectedFiles: undefined,
            currentFile: undefined,
            file: '',
        }
    )
    const selectFile = (event) => {
        setabc({
            selectedFiles: event.target.files,
        });
    }

    const upload = () => {
        let fi = document.getElementById('file');
        if (fi.files.length > 0) {
            for (let i = 0; i <= fi.files.length - 1; i++) {

                const fsize = fi.files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (file >= 1024) {
                    swal("File size exceeded !!", "Max Size 1 MB", "warning");
                }
            }
        }
        let currentFile = getabc.selectedFiles[0];
        setabc({
            currentFile: currentFile,
        });

        service.assignmentupload(currentFile, props.userId, props.courseId, props.assignId, props.tenantId, (event) => {
        }).then(async res => {

            await swal("Assignment Uploaded Succesfully ! ", "Your assignment uploaded succesfully!", "success");
        })
            .catch(err => {
                // if(err.message == 'Request failed with status code 500')
                // {
                //     swal("File size exceeded !!","","warning");
                // }
                setabc({
                    currentFile: undefined,
                });
            });

        setabc({
            selectedFiles: undefined,
        });
    }

    return (
        <div>
            <div style={{ marginLeft: 10, color: 'red' }}>
                <span>  Upload Only PDF file (Max Size 1 MB)</span>
            </div>
            <label className="btn btn-default">
                <input type="file" onChange={selectFile} accept=".pdf" id="file" />
            </label>
            <button className="btn btn-success" disabled={!getabc.selectedFiles} onClick={() => upload()}>Upload</button>
        </div>
    );
}

export default AssignmentFileUpload;