import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/content/carousel/Carousel"
import Footer from "./components/footer/Footer";
import { DynamicContext } from "./context/DynamicContext";
import DynamicContextState from "./context/state/DynamicContextState";

function App() {

  const { defaultDynamicContextState, dynamicContextState, setDynamicContextState } = DynamicContextState()

  return (
    <div>
      <DynamicContext.Provider value={{ defaultDynamicContextState, dynamicContextState, setDynamicContextState }}>
        <Navbar />
        <Carousel />
        <Footer />
      </DynamicContext.Provider>
    </div>
  );
}

export default App;