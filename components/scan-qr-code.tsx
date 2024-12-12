import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { ViewFinder } from "@/components/ViewFinder";

interface Props {
  onScan: (address: string) => void;
  onError?: (error: string) => void;
}

export const BarcodeScanner = ({ onScan, onError }: Props) => {
  const [delayScan , setDelayScan] = useState<any>(500);

  const handleScan = (result: any, error: any) => {
    
    if (result) {
      const scannedText = result.text;
      console.log(scannedText);
      
      // Kiểm tra xem có phải địa chỉ Ethereum không
      try {
        // Loại bỏ các prefix phổ biến
        const cleanAddress = scannedText.match(/:([^@]+)@/) ? scannedText.match(/:([^@]+)@/)[1] : scannedText

        onScan(cleanAddress); // Trả về địa chỉ đã chuẩn hóa
        setDelayScan(false)
      } catch (err) {
        console.log(err);
       //onError?.('Không thể đọc mã QR');
      }
    }
  };

  useEffect(() => {
    return () => {
      // Tìm và dừng tất cả các stream video đang chạy
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(err => console.log('Cleanup error:', err));
    };
  }, []);

  return (
    <div style={{ margin: 'auto', width: '400px', position: 'relative' }}>
      <QrReader
        ViewFinder={ViewFinder}
        constraints={{
          facingMode: 'environment'
        }}
        onResult={handleScan}
        videoId="video"
        scanDelay={delayScan}
      />
    </div>
  );
}; 