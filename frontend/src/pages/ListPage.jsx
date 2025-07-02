// frontend/src/pages/ListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ListPage({ uid }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch(`${API_BASE_URL}/pages?uid=${uid}`);
        const data = await res.json();
        setPages(data.pages || []);
        setMessage(`${data.pages.length} 件取得`);
      } catch (error) {
        setMessage("データ取得に失敗しました");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPages();
  }, [uid]);

  return (
    <div>
      <h2>ページ一覧</h2>
      <p>
        <Link to="/pages/new">新規作成</Link>
      </p>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div>
          <p>{message}</p>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <Link to={`/pages/${page.id}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
