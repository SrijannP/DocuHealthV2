import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const isScannerRunningRef = useRef(false);

  useEffect(() => {
    const qrRegionId = "qr-reader";
    const html5QrCode = new Html5Qrcode(qrRegionId);
    html5QrCodeRef.current = html5QrCode;

    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
      { facingMode: "user" }, 
      config,
      (decodedText) => {
        if (!isScannerRunningRef.current) return;
        isScannerRunningRef.current = false;

        onScanSuccess(decodedText);

        html5QrCode.stop().then(() => {
          html5QrCode.clear();
        }).catch((err) => {
          console.warn("Error stopping after scan:", err);
        });
      },
      (errorMessage) => {

      }
    ).then(() => {
      isScannerRunningRef.current = true;
      const videoElement = document.querySelector('video');

      if (videoElement) {
        videoElement.style.display = 'none'; 
      }
    }).catch((err) => {
      console.error("Failed to start QR scanner:", err);
    });

    return () => {
      if (html5QrCodeRef.current && isScannerRunningRef.current) {
        html5QrCodeRef.current.stop()
          .then(() => {
            html5QrCodeRef.current.clear();
            isScannerRunningRef.current = false;
          })
          .catch((err) => {
            console.warn("Cleanup: failed to stop QR scanner:", err);
          });
}
    };
  }, [onScanSuccess]);

return (
  <div
    id="qr-reader"
    ref={scannerRef}
    style={{ width: "100%", height: "300px", position: "relative" }}
  />
);
};

export default QrScanner;
