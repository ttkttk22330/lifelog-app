// frontend/src/App.jsx
import React from "react";
import ListPage from "./pages/ListPage";

function App() {
  const testUid = "test-user";

  return (
    <div>
      <h1>LifeLog アプリ</h1>
      <ListPage uid={testUid} />
    </div>
  );
}

export default App;
