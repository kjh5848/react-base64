import { useState } from "react";
import { imageApi } from "../api/imageApi";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return alert("파일을 선택하세요.");

    const reader = new FileReader();
    reader.onloadend = async () => {
      // data:image/png;base64,~~~~ 중 실제 Base64 부분만 추출
      const base64 = reader.result.split(",")[1];
      setLoading(true);
      try {
        await imageApi.upload(file.name, base64);
        alert("업로드 완료!");
      } catch (err) {
        console.error(err);
        alert("업로드 실패!");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2> 업로드 페이지</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img style={{ width: 500, height: 500 }} src={preview} alt="preview" />
      )}
      <br />
      <button
        style={{ marginTop: 10, width: 200 }}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "업로드 중..." : "업로드"}
      </button>
    </div>
  );
}
