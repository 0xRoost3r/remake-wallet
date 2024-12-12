import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

interface Props {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function ScanQRCode({ onScan, onClose }: Props) {
  const [stopStream, setStopStream] = useState(false);

  const extractAddress = (qrString: string) => {
    const match = qrString.match(/:([^@]+)@/);
    return match ? match[1] : qrString;
  };

  const handleScan = (result: any) => {
    if (result) {
      const address = extractAddress(result.text);
      onScan(address);
      setStopStream(true);
      onClose();
    }
  };

  if (stopStream) {
    return null;
  }

  return (
    <div className="w-full max-w-sm">
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={handleScan}
        className="w-full"
      />
      <p className="text-sm text-center mt-2">
        Đặt mã QR vào khung hình để quét
      </p>
    </div>
  );
} 