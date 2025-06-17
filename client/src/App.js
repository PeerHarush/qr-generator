import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrSrc, setQrSrc] = useState("");
  const downloadLinkRef = useRef(null);

  const generateQR = async (e) => {
    e.preventDefault();
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setQrSrc(imageUrl);
  };

  const downloadQR = () => {
    if (downloadLinkRef.current && qrSrc) {
      downloadLinkRef.current.href = qrSrc;
      downloadLinkRef.current.download = "qr-code.png";
      downloadLinkRef.current.click();
    }
  };

  return (
    <div className="container">
      <img src="/icon.jpg" alt="logo" style={{ width: "70px" }} />

      <h1>QR Code Generator</h1>
      <form onSubmit={generateQR}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Generate</button>
      </form>

      {qrSrc && (
        <>
          <img src={qrSrc} alt="QR Code" />
          <br />
          <button onClick={downloadQR} style={{ marginTop: "10px" }}>
            Download QR Code
          </button>
          <a ref={downloadLinkRef} style={{ display: "none" }}>Hidden link</a>
        </>
      )}
    </div>
  );
}

export default App;
