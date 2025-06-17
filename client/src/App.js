import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrSrc, setQrSrc] = useState("");
  const downloadLinkRef = useRef(null);

const generateQR = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://qr-generator-7d0h.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("QR code generation failed");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setQrSrc(imageUrl);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to generate QR code. Please try again.");
  }
};




  const downloadQR = () => {
    if (downloadLinkRef.current && qrSrc) {
      downloadLinkRef.current.href = qrSrc;
      downloadLinkRef.current.download = "qr-code.png";
      downloadLinkRef.current.click();
    }
  };
  const copyUrlToClipboard = () => {
  if (url) {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  }
};

  return (
    <div className="container">
       <img src="/icon.jpg" alt="logo" style={{ width: "70px" }} />
      <h1>QR Code Generator</h1>
      <h3> Simply paste your URL, hit the "Generate" button, and save the QR code image.</h3>
     
     
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
          <div
              onClick={downloadQR}
              className="download-button"
              style={{ display: 'inline-block', position: 'relative', cursor: 'pointer', marginTop: '10px', marginLeft: '10px' }}
            >
              <img src="/download.png" alt="Download" style={{ width: '24px', height: '24px' }} />
              <span className="tooltip">DOWNLOAD</span>
            </div>

          <div
            onClick={copyUrlToClipboard}
            className="copy-button"
            style={{ display: 'inline-block', position: 'relative', cursor: 'pointer', marginLeft: '10px' }}
          >
            <img src="/copy.png" alt="Copy" style={{ width: '24px', height: '24px' }} />
            <span className="tooltip">COPY</span>
          </div>


          <a ref={downloadLinkRef} style={{ display: "none" }}>Hidden link</a>
        </>
        
      )}
    </div>
  );
}

export default App;
