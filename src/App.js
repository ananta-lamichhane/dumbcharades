import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GameController } from "./components/GameController";
import { ViewerPage } from "./components/ViewerPage";

export default function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<GameController />} />
            <Route path="/viewer" element={<ViewerPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}
