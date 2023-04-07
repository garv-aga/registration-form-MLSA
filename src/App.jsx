import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Components/Form/Form";
import ThankYou from "./Components/ThankYou/ThankYou";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/" element={<Form />} />
            <Route path="/success" element={<ThankYou />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
