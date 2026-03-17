// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RealWorldApplications from "./components/RealWorldApplications";
import AboutUs from "./components/Aboutus";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><RealWorldApplications /><Footer /></>} />
        <Route path="/about" element={<><AboutUs /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  );
}