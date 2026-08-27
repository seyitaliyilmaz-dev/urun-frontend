import { useState } from 'react';

function Sayac() {
  const [sayi, setSayi] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Sayaç: {sayi}</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setSayi(sayi + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Artır
        </button>
        <button
          onClick={() => setSayi(sayi - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Azalt
        </button>
      </div>
    </div>
  );
}

export default Sayac;