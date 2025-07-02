import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PageDetail() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`${API_BASE_URL}/pages/${id}`);
        const data = await res.json();
        if (res.ok) {
          setPage(data);
        } else {
          setMessage(`❌ ${data.error || "エラー"}`);
        }
      } catch (err) {
        setMessage("取得失敗");
      }
    }
    fetchPage();
  }, [id]);

  if (!page) {
    return <div>{message || "読み込み中..."}</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{page.title}</h2>
      <pre>{JSON.stringify(page.meta, null, 2)}</pre>
      <p>カテゴリ: {page.category}</p>
      <p>タグ: {Array.isArray(page.tags) ? page.tags.join(", ") : ""}</p>
      <Link to={`/pages/${id}/edit`}>編集</Link>
      <button
        onClick={async () => {
          const res = await fetch(`${API_BASE_URL}/pages/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setMessage("削除しました");
            setPage(null);
          } else {
            const data = await res.json().catch(() => ({}));
            setMessage(`❌ ${data.error || "削除失敗"}`);
          }
        }}
      >
        削除
      </button>
    </div>
  );
}
