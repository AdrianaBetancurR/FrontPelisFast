import React from "react";
import Navbar from "../components/ig/Navbar";
import Generos from "../components/generos/Generos";
import Directores from "../components/directores/Directores";
import Footer from "../components/ig/Footer";
import { Route, Routes } from "react-router-dom";
import Productoras from "../components/productoras/Productoras";
import Tipos from "../components/tipos/Tipos";
import Medias from "../components/medias/Medias";
import NotFound from "../components/ig/NotFound";

export default function AppRouter() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Generos />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/productoras" element={<Productoras />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/medias" element={<Medias />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}