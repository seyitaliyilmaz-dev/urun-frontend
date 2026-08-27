import { useRef } from 'react';
import Merhaba from './Merhaba';
import Sayac from './Sayac';
import UrunListesi from './UrunListesi';
import UrunEkle from './UrunEkle';

function App() {
  const listeRef = useRef(null);

  function handleUrunEklendi() {
    listeRef.current.yenile();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Ürün Yönetim Paneli
        </h1>

        {/* Flexbox: küçük ekranda alt alta (flex-col), orta ekrandan itibaren yan yana (md:flex-row) */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Merhaba isim="Seyit" />
          <Merhaba isim="Kütüphane Sistemi" />
        </div>

        <Sayac />

        {/* Grid: küçük ekranda tek sütun, orta ekrandan itibaren 2 sütun */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <UrunEkle onUrunEklendi={handleUrunEklendi} />
          <UrunListesi ref={listeRef} />
        </div>
      </div>
    </div>
  );
}

export default App;