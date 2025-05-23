import './App.css';
import Home from "./pages/Home.jsx"
import NotFound from "./pages/NotFound.jsx"
import NewTrail from "./pages/NewTrail.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

export const LOCALSTORAGE_KEY = "trails";

export default function App() {
    //TODO: add route for /impressum
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="new-trail" element={<NewTrail />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}



