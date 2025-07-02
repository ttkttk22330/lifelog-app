// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import PageDetail from "./pages/PageDetail";
import EditPage from "./pages/EditPage";

function App() {
  const testUid = "test-user";

  return (
    <BrowserRouter>
      <h1>LifeLog アプリ</h1>
      <Routes>
        <Route path="/" element={<ListPage uid={testUid} />} />
        <Route path="/pages/new" element={<AddPage />} />
        <Route path="/pages/:id" element={<PageDetail />} />
        <Route path="/pages/:id/edit" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
