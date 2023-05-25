import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:factoryId/:monthNumber" element={<Details />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
