import { DynamicContext } from "./context/DynamicContext";
import DynamicContextState from "./context/state/DynamicContextState";
import NavbarState from "./components/navbar/NavbarState";
import HomeLayouter from "./layouter/HomeLayouter";

function App() {

  const { defaultDynamicContextState, dynamicContextState, setDynamicContextState } = DynamicContextState()
  const { defaultNavbarState, navbarState, setNavbarState } = NavbarState()


  return (
    <div>
      <DynamicContext.Provider value={{
        defaultDynamicContextState, dynamicContextState, setDynamicContextState,
        defaultNavbarState, navbarState, setNavbarState
      }}>
        <HomeLayouter />
      </DynamicContext.Provider>
    </div>
  );
}

export default App;