import React, { useState } from 'react';
import { useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import instructorService from '../../../../services/instructorService';

////Assignment Step 1
function AssignStep1(props) {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    const [getServerTime, setServerTime] = useState();
    useEffect(() => {
        instructorService.getServerTime()
            .then(res => {
                let serTime = res.data;
                setServerTime(serTime.replace(/\s/g, 'T'))
            })
    }, [])
    if (props.steps !== 1) {
        return null;
    }
    else {

        return (
            <>
                <fieldset>
                    <div className='row'>
                        <p class="control-label">Assignment Name</p>
                        <input type='text' className="form-control" placeholder="Enter Assignment Name" name='name' value={props.name} onChange={props.handleChange} />
                        {
                            props.assignmentFormError.nameError
                                ?
                                <>
                                    <div className="alert alert-danger mt-2">{props.assignmentFormError.nameError}</div>
                                </>
                                :
                                <>
                                </>
                        }

                    </div>
                    <br />
                    <div class="row justify-content-between">
                        <div class="row col-4 ">
                            <div>
                                <p class="control-label">Total Marks</p>
                                <input type='number' className="form-control" min={0} pattern="^[0-9]" placeholder="Enter Total Marks" name='totalMarks' value={props.totalMarks} onChange={props.handleChange} />
                                {
                                    props.assignmentFormError.totalMarksError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{props.assignmentFormError.totalMarksError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                        <div class="row col-4">
                            <div>
                                <p class="control-label">Passing Marks</p>
                                <input type='number' className="form-control" min={0} pattern="^[0-9]" placeholder="Enter Passing Marks" name='passMarks' value={props.passMarks} onChange={props.handleChange} />
                                {
                                    props.assignmentFormError.passMarksError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{props.assignmentFormError.passMarksError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <p class="control-label">Assignment Description</p>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            name='description' value={props.description} onChange={props.handleChange}></textarea>
                        {
                            props.assignmentFormError.descriptionError
                                ?
                                <>
                                    <div className="alert alert-danger mt-2">{props.assignmentFormError.descriptionError}</div>
                                </>
                                :
                                <>
                                </>
                        }
                    </div>
                    <br />
                    <div class="row justify-content-between">
                        <div class="col col-4 ">
                            <div>
                                <p class="control-label">Opening Date</p>
                                {/* <DateTimePicker name='openDate' value={props.openDate} onChange={props.handleChange}/> */}
                                <input type='date' className="form-control" name='openDate' value={props.openDate} onChange={props.handleChange} />
                                {
                                    props.assignmentFormError.openDateError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{props.assignmentFormError.openDateError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                        <div class="col col-4 ">
                            <div>
                                <p class="control-label">Closing Date</p>
                                <input type='date' className="form-control" name='closeDate' value={props.closeDate} onChange={props.handleChange} />
                                {
                                    props.assignmentFormError.closeDateError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{props.assignmentFormError.closeDateError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div class="row justify-content-between">
                        <div class="col col-4">
                            <div>
                                <p class="control-label">Opening Time</p>
                                <input type='time' className="form-control" name='openTime' value={props.openTime} onChange={props.handleChange} />
                                {
                                    props.assignmentFormError.openTimeError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{props.assignmentFormError.openTimeError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                        <div class="col col-4">
                            <div>
                                <p class="control-label">Closing Time</p>
                                <input type='time' className="form-control" name='closeTime' value={props.closeTime} onChange={props.handleChange} />
                                {
                                    props.assignmentFormError.closeTimeError
                                        ?
                                        <>
                                            <div className="alert alert-danger mt-2">{props.assignmentFormError.closeTimeError}</div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                    </div>

                    {/* <input type='calendar' className="form-control" name='closeDate' value={props.closeDate} onChange={props.handleChange} /> */}



                </fieldset>
            </>
        )
    }
}

export default AssignStep1;
