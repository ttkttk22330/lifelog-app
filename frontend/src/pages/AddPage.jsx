// /frontend/src/pages/AddPage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AddPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [meta, setMeta] = useState("{}");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let metaObj;
    try {
      metaObj = JSON.parse(meta);
    } catch {
      setMessage("❌ メタ情報は正しいJSON形式で入力してください");
      return;
    }

    const res = await fetch(

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: "test-user",
          title,
          category,
          meta: metaObj,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      }
    );

    if (res.ok) {
      setMessage("✅ ページを追加しました！");
      setTitle("");
      setCategory("");
      setMeta("{}");
      setTags("");
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(`❌ エラー: ${data.error || "サーバーエラー"}`);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>ページ追加</h1>
      <form onSubmit={handleSubmit}>
        <div><label>タイトル：</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
        <div><label>カテゴリー：</label><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required /></div>
        <div><label>メタ情報（JSON）：</label><textarea value={meta} onChange={(e) => setMeta(e.target.value)} rows={5} required /></div>
        <div><label>タグ（カンマ区切り）：</label><input type="text" value={tags} onChange={(e) => setTags(e.target.value)} /></div>
        <button type="submit">追加</button>
      </form>
      {message && <p>{message}</p>}
      <p><Link to="/">一覧へ戻る</Link></p>
    </div>
  );
}
