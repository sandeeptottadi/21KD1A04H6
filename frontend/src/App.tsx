import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import { useState } from "react";
import ProductData from "./Components/ProductData/ProductData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductData />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
