import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import ComparisonPage from "./pages/ComparisonPage";
import InvestmentStatusPage from "./pages/InvestmentStatusPage";
import CompareStatusPage from "./pages/CompareStatusPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* <Route path="/" element={} /> */}
        {/* <Route path="/mypick" element={} /> */}
        {/* <Route path="/mypick/result" element={} /> */}
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/compare/status" element={<CompareStatusPage />} />
        <Route path="/investment" element={<InvestmentStatusPage />} />
        {/* <Route path="/company/:id" element={} /> */}
      </Route>
    </Routes>
  );
}

export default App;
