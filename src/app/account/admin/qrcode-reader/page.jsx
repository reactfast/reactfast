'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('./qrcodeReader'), { ssr: false });

export default function HomePage() {
  const [scanned, setScanned] = useState(null);
  const router = useRouter();

  const handleScan = (value) => {
    setScanned(value);
    if (value.startsWith('https://')) {
      router.push(value);
    } else {
      console.log('Scanned:', value);
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {!scanned ? (
        <QrScanner onScan={handleScan} />
      ) : (
        <div>
          <p>Scanned value: {scanned}</p>
          <button onClick={() => setScanned(null)}>Scan another</button>
        </div>
      )}
    </div>
  );
}
