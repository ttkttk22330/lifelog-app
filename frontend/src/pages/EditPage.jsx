import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [meta, setMeta] = useState("{}");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPage() {
      const res = await fetch(`${API_BASE_URL}/pages/${id}`);
      const data = await res.json();
      if (res.ok) {
        setTitle(data.title || "");
        setCategory(data.category || "");
        setMeta(JSON.stringify(data.meta || {}, null, 2));
        setTags(Array.isArray(data.tags) ? data.tags.join(",") : "");
      } else {
        setMessage("取得失敗");
      }
    }
    fetchPage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let metaObj;
    try {
      metaObj = JSON.parse(meta);
    } catch {
      setMessage("❌ メタ情報はJSON形式で");
      return;
    }
    const res = await fetch(
      `${API_BASE_URL}/pages/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          meta: metaObj,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      }
    );
    if (res.ok) {
      navigate(`/pages/${id}`);
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(`❌ ${data.error || "更新失敗"}`);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px" }}>
      <h2>ページ編集</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル：</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>カテゴリー：</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>メタ情報：</label>
          <textarea
            rows={5}
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            required
          />
        </div>
        <div>
          <label>タグ：</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type="submit">更新</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
