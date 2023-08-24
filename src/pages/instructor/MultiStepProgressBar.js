import React from "react";
import "./MultiStepProgressBar.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = props => {
  var stepPercentage = 0;

  if (props.currentStep === 1) {
    stepPercentage = 0;
  } else if (props.currentStep === 2) {
    stepPercentage = 20;
  } else if (props.currentStep === 3) {
    stepPercentage = 40;
  } else if (props.currentStep === 4) {
    stepPercentage = 60;
  } else if (props.currentStep === 5) {
    stepPercentage = 80;
  } else if (props.currentStep === 6) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar height="2px" filledBackground="linear-gradient(to right, #55b776, #55b776)" step percent={stepPercentage}>
      <Step >
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <img src={process.env.PUBLIC_URL + "/assets/images/details.png"} />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <img src={process.env.PUBLIC_URL + "/assets/images/discription.png"} />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <img src={process.env.PUBLIC_URL + "/assets/images/upload.png"} />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <img src={process.env.PUBLIC_URL + "/assets/images/duration.png"} />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <img src={process.env.PUBLIC_URL + "/assets/images/instructor.png"} />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            <img src={process.env.PUBLIC_URL + "/assets/images/confirm.png"} />
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
