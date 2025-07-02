// frontend/src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import "./style.css";

function App() {
  const testUid = "test-user";
  const [dark, setDark] = useState(false);

  return (
    <Router>
      <div className={dark ? "dark" : ""}>
        <header>
          <nav>
            <Link to="/">一覧</Link>
            <Link to="/add">追加</Link>
            <button onClick={() => setDark((v) => !v)} style={{ marginLeft: "1rem" }}>
              {dark ? "ライト" : "ダーク"} モード
            </button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListPage uid={testUid} />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
