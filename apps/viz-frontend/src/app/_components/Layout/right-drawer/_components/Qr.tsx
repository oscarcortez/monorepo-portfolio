import { JSX } from 'react';
import Image from 'next/image';
import { Download, Share2 } from 'lucide-react';

export function Qr(): JSX.Element {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`;

  const handleDownload = () => {
    // Lógica para descargar el QR
    console.log('Descargando QR...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compartir QR',
          url: currentUrl,
        });
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">QR Code</h3>
        <p className="text-sm text-gray-600">Scan this code to share</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Image src={qrUrl} alt="QR Code" width={250} height={250} className="w-64 h-64" unoptimized />
      </div>

      <div className="text-center px-4">
        <p className="text-xs text-gray-500 break-all">{currentUrl}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors"
        >
          <Download size={18} />
          Download
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
    </div>
  );
}
