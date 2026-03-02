import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuafiHome } from "./pages/QuafiHome";
import { appRoutes } from "./routes/appRoutes";
import { showcaseRoutes, standaloneQuafiRoutes } from "./routes/showcaseRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* QUAFI Home Page - Root */}
      <Route path="/" element={<QuafiHome />} />

      {/* QUAFI App - Investment Analysis Application */}
      {appRoutes()}

      {/* QUAFI Showcase - Standalone pages (outside ShowcaseLayout) */}
      {standaloneQuafiRoutes()}

      {/* Showcase Layout Routes */}
      {showcaseRoutes()}
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
