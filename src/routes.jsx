import React from "react";
import { Route, Routes } from "react-router-dom";
import AddList from "./components/AddList";
import Lists from "./components/Lists";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/add" element={<AddList />} />
        <Route path="/:id/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
