import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={} />
          <Route path="/mypick" element={} />
          <Route path="/mypick/result" element={} />
          <Route path="/compare" element={} />
          <Route path="/investment" element={} />
          <Route path="/company/:id" element={} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
