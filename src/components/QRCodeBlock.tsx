'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeBlock({ url }: { url: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block shadow-sm">
      <QRCodeSVG value={url} size={150} level="H" includeMargin={true} />
    </div>
  );
}
