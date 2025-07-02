// frontend/src/pages/ListPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ 修正済みのパス

export default function ListPage({ uid }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch(
          `https://asia-northeast1-lifelog-app-6b84f.cloudfunctions.net/api/listPages?uid=${uid}`
        );
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
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div>
          <p>{message}</p>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>{page.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
