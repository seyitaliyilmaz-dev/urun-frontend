import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const UrunListesi = forwardRef((props, ref) => {
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  async function urunleriGetir() {
    try {
      setYukleniyor(true);
      const response = await axios.get('http://localhost:5200/api/urunler');
      setUrunler(response.data);
      setHata(null);
    } catch (err) {
      setHata('Sunucudan veri alınamadı');
    } finally {
      setYukleniyor(false);
    }
  }

  async function urunSil(id) {
    try {
      await axios.delete(`http://localhost:5200/api/urunler/${id}`);
      setUrunler((oncekiUrunler) => oncekiUrunler.filter((u) => u.urunID !== id));
    } catch (err) {
      alert('Ürün silinirken bir hata oluştu.');
    }
  }

  useImperativeHandle(ref, () => ({
    yenile: urunleriGetir
  }));

  useEffect(() => {
    urunleriGetir();
  }, []);

  if (yukleniyor) return <p className="text-gray-500">Yükleniyor...</p>;
  if (hata) return <p className="text-red-600">Hata: {hata}</p>;

  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Ürünler</h2>
      <ul className="divide-y divide-gray-100">
        {urunler.map((urun) => (
          <li key={urun.urunID} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">
              {urun.urunAdi} — <span className="font-medium">{urun.fiyat} ₺</span>
            </span>
            <button
              onClick={() => urunSil(urun.urunID)}
              className="text-red-600 hover:text-red-800 text-xs font-medium"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default UrunListesi;