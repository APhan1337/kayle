import "./App.css";

import { RedocStandalone } from "redoc";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <RedocStandalone specUrl="https://kayle-test-blockchain.herokuapp.com/swagger.base.json" />
      </div>
    </div>
  );
}

export default App;
