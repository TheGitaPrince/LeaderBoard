import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LeaderBoard from "./pages/LeaderBoard.jsx"

function App() {
  return (
     <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={ <LeaderBoard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App