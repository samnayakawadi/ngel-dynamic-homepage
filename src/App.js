import { DynamicContext } from "./context/DynamicContext";
import DynamicContextState from "./context/state/DynamicContextState";
import HomeLayouter from "./layouter/HomeLayouter";
import { GlobalContext } from "./context/GlobalContext";
import GlobalContextState from "./context/state/GlobalContextState";
import 'react-toastify/dist/ReactToastify.css';
import GlobalComponent from "./components/global/GlobalComponent";
import { ValidationContext } from "./context/ValidationContext";
import ValidationState from "./components/validations/ValidationState";

function App() {

  const { defaultDynamicContextState, dynamicContextState, setDynamicContextState } = DynamicContextState()
  const { defaultGlobalContextState, globalContextState, setGlobalContextState } = GlobalContextState()
  const { defaultValidationState, validationState, setValidationState } = ValidationState()

  return (
    <div>
      <GlobalContext.Provider value={{ defaultGlobalContextState, globalContextState, setGlobalContextState }}>
        <DynamicContext.Provider value={{
          defaultDynamicContextState, dynamicContextState, setDynamicContextState,
        }}>
          <ValidationContext.Provider value={{ defaultValidationState, validationState, setValidationState }}>
            <HomeLayouter />
            <GlobalComponent />
          </ValidationContext.Provider>
        </DynamicContext.Provider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;