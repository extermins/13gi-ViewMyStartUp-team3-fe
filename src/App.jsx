import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/layout/Header";
import ComparisonPage from "./pages/ComparisonPage";
import InvestmentStatusPage from "./pages/InvestmentStatusPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ComparisonPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/investments" element={<InvestmentStatusPage />} />
      </Routes>
    </>
  );
}

export default App;
