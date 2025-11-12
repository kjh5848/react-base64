import React, { useEffect, useState } from "react";
import { imageApi } from "../api/imageApi";
import { Link } from "react-router-dom";

export default function ListPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await imageApi.list();
        setImages(res.data);
      } catch (err) {
        console.error("이미지 목록을 불러오지 못했습니다:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>로딩 중...</p>;
  if (images.length === 0) return <p style={{ padding: 20 }}>업로드된 이미지가 없습니다.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>이미지 목록</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {images.map((img) => (
          <Link key={img.id} to={`/detail/${img.id}`}>
            <img
              src={`http://localhost:8080${img.url}`}
              alt={img.fileName}
              style={{
                width: 150,
                height: 150,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}