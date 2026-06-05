import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import ComparisonPage from "./pages/ComparisonPage";
import Mypick from "./pages/Mypick";
import CompareResult from "./pages/compareresult/CompareResult";
import HomePage from "./pages/HomePage";
import InvestmentPage from "./pages/InvestmentPage";
import CompanyPage from "./pages/companypage/CompanyPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypick" element={<Mypick />} />
          <Route path="/mypick/result" element={<CompareResult />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
