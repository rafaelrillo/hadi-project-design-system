import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FingHome } from "./pages/FingHome";
import { appRoutes } from "./routes/appRoutes";
import { showcaseRoutes, standaloneFingRoutes } from "./routes/showcaseRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* FING Home Page - Root */}
      <Route path="/" element={<FingHome />} />

      {/* FING App - Investment Analysis Application */}
      {appRoutes()}

      {/* FING Showcase - Standalone pages (outside ShowcaseLayout) */}
      {standaloneFingRoutes()}

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
