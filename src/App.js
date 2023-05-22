import { DynamicContext } from "./context/DynamicContext";
import DynamicContextState from "./context/state/DynamicContextState";
import HomeLayouter from "./layouter/HomeLayouter";
import { GlobalContext } from "./context/GlobalContext";
import GlobalContextState from "./context/state/GlobalContextState";
import 'react-toastify/dist/ReactToastify.css';
import GlobalComponent from "./components/global/GlobalComponent";

function App() {

  const { defaultDynamicContextState, dynamicContextState, setDynamicContextState } = DynamicContextState()
  const { defaultGlobalContextState, globalContextState, setGlobalContextState } = GlobalContextState()

  return (
    <div>
      <GlobalContext.Provider value={{ defaultGlobalContextState, globalContextState, setGlobalContextState }}>
        <DynamicContext.Provider value={{
          defaultDynamicContextState, dynamicContextState, setDynamicContextState,
        }}>
          <HomeLayouter />
          <GlobalComponent />
        </DynamicContext.Provider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;