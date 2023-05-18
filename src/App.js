import { DynamicContext } from "./context/DynamicContext";
import DynamicContextState from "./context/state/DynamicContextState";
import NavbarState from "./components/navbar/NavbarState";
import HomeLayouter from "./layouter/HomeLayouter";
import { GlobalContext } from "./context/GlobalContext";
import GlobalContextState from "./context/state/GlobalContextState";

function App() {

  const { defaultDynamicContextState, dynamicContextState, setDynamicContextState } = DynamicContextState()
  const { defaultNavbarState, navbarState, setNavbarState } = NavbarState()
  const { defaultGlobalContextState, globalContextState, setGlobalContextState } = GlobalContextState()

  return (
    <div>
      <GlobalContext.Provider value={{ defaultGlobalContextState, globalContextState, setGlobalContextState }}>
        <DynamicContext.Provider value={{
          defaultDynamicContextState, dynamicContextState, setDynamicContextState,
          defaultNavbarState, navbarState, setNavbarState
        }}>
          <HomeLayouter />
        </DynamicContext.Provider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;