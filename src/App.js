import * as React from "react";
import Table from "./components/Table/Table.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
