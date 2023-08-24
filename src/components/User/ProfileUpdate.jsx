import React, { Component, useState } from 'react';
import service from '../../services/service';
import UserService from '../../services/UserService';
import RenderOnAuthenticated from '../../pages/account/RenderOnAuthenticated';
import swal from 'sweetalert';
import md5 from "md5";

class ProfileUpdate extends Component {

    componentDidMount() {
        UserService.generateToken();
    }

    constructor(props) {
        super(props)
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            file: '',
            user_id: UserService.getUserid()
        }

    }


    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let fi = document.getElementById('file');
        if (fi.files.length > 0) {
            for (let i = 0; i <= fi.files.length - 1; i++) {
                var fsize = fi.files.item(i).size;
                var file = Math.round((fsize / 1024));
                // The size of the file.
                if (file >= 100) {
                    return swal("File size exceeded!", "Max Size 100 KB", "warning");
                }
            }
        }

        let currentFile = this.state.selectedFiles[0];
        let sig = md5(currentFile.size.toString());
        
        this.setState({
            progress: 0,
            currentFile: currentFile,
        });
        let user_id = this.state.user_id;
        this.setState({
            user_id: user_id,
        })
        service.upload(currentFile, sig, user_id, (event) => {

            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
                message: "Your Profile pic upload succesfully !"
            });
        }).then(async res => {
            if (res.data === "double-extension-file") {
                await swal('Error', " Your File contain Double Extention", "error");
            }
            else {
                await swal("Success", "Profile Image Uploaded Succesfully !", "success");
                window.location.reload();
            }
        })
            .catch(() => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the file!",
                    currentFile: undefined,
                });
            });

        this.setState({
            selectedFiles: undefined,
        });
    }

    render() {
        const {
            selectedFiles,
            currentFile,
            progress,
            message,

        } = this.state;

        return (
            <RenderOnAuthenticated>
                <div>
                    <br></br>
                    {currentFile && (
                        <div className="progress">
                            <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: progress + "%" }}>
                                {progress}%
                            </div>
                        </div>
                    )}
                    <div style={{ marginLeft: 10, color: 'red' }}>
                        <span>  Upload an image (JPG/JPEG/PNG) with maximum 100 KB size</span>
                    </div>
                    <label className="btn btn-default">
                        <input type="file" onChange={this.selectFile} id='file' accept="image/jpg, image/jpeg, image/png" />
                    </label>
                    <button className="btn btn-success" disabled={!selectedFiles} onClick={this.upload}>Upload</button>
                    <div className="alert alert-light" role="alert">
                        {message}
                    </div>
                </div>
            </ RenderOnAuthenticated>
        );
    }
}

export default ProfileUpdate;