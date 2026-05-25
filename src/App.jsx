import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/layout/Header";
import ComparisonPage from "./pages/ComparisonPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ComparisonPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </>
  );
}

export default App;
