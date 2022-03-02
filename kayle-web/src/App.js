//import "./App.css";
import openAPIspec from "./swagger.base.json";
import Header from "./components/header/Header.js";

import { RedocStandalone } from "redoc";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        {/* <RedocStandalone specUrl="https://kayle-blockchain.herokuapp.com/swagger.base.json" /> */}
        {/* <RedocStandalone specUrl="http://localhost:3000/swagger.base.json" /> */}
        <RedocStandalone spec={openAPIspec} />
      </div>
    </div>
  );
}

export default App;
