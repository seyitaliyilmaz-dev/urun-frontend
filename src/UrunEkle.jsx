import { useState } from 'react';
import axios from 'axios';

function UrunEkle({ onUrunEklendi }) {
  const [urunAdi, setUrunAdi] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function formGonder(e) {
    e.preventDefault();

    if (!urunAdi || !fiyat) {
      setHata('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setGonderiliyor(true);
      setHata(null);

      await axios.post('http://localhost:5200/api/urunler', {
        urunAdi: urunAdi,
        fiyat: parseFloat(fiyat)
      });

      setUrunAdi('');
      setFiyat('');
      onUrunEklendi();
    } catch (err) {
      setHata('Ürün eklenirken bir hata oluştu.');
    } finally {
      setGonderiliyor(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Yeni Ürün Ekle</h2>
      <form onSubmit={formGonder} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Ürün adı"
          value={urunAdi}
          onChange={(e) => setUrunAdi(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={fiyat}
          onChange={(e) => setFiyat(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={gonderiliyor}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-md transition-colors"
        >
          {gonderiliyor ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </form>
      {hata && <p className="text-red-600 text-sm mt-2">{hata}</p>}
    </div>
  );
}

export default UrunEkle;