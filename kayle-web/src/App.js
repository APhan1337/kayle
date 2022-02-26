//import "./App.css";

import { RedocStandalone } from "redoc";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RedocStandalone specUrl="https://kayle-blockchain.herokuapp.com/swagger.base.json" />
      </header>
    </div>
  );
}

export default App;
