import { HashRouter as Router } from "react-router-dom";
import { Content, Header, Footer } from "./components";
import { StrictMode } from "react";

import "./App.scss";

function App() {
  return (
    <div className="bj-app flex-box flex-column">
      <StrictMode>
        <Router>
          <Header />
          <Content />
          <Footer />
        </Router>
      </StrictMode>
    </div>
  );
}

export default App;
