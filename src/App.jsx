import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import ComparisonPage from "./pages/ComparisonPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={} />
          <Route path="/mypick" element={} />
          <Route path="/mypick/result" element={} /> */}
          <Route path="/compare" element={<ComparisonPage />} />
          {/* <Route path="/investment" element={} />
          <Route path="/company/:id" element={} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
