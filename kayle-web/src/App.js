//import "./App.css";

import { RedocStandalone } from "redoc";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <RedocStandalone specUrl="https://kayle-blockchain.herokuapp.com/swagger.base.json" />
      </div>
    </div>
  );
}

export default App;
