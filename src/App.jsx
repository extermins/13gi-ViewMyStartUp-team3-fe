import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import ComparisonPage from "./pages/ComparisonPage";
import Mypick from "./pages/Mypick";
import CompareResult from "./pages/compareresult/CompareResult";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypick" element={<Mypick />} />
          <Route path="/mypick/result" element={<CompareResult />} />
          <Route path="/compare" element={<ComparisonPage />} />
          {/* <Route path="/investment" element={} />
          <Route path="/company/:id" element={} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
