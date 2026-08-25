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
      // Silme başarılıysa, listeyi tekrar sunucudan çekmek yerine
      // state'i doğrudan (yerel olarak) güncelleyerek daha hızlı bir deneyim sağlıyoruz.
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

  if (yukleniyor) return <p>Yükleniyor...</p>;
  if (hata) return <p style={{ color: 'red' }}>Hata: {hata}</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '10px' }}>
      <h2>Ürünler (Backend'den Geldi)</h2>
      <ul>
        {urunler.map((urun) => (
          <li key={urun.urunID}>
            {urun.urunAdi} — {urun.fiyat} ₺
            <button onClick={() => urunSil(urun.urunID)} style={{ marginLeft: '10px' }}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default UrunListesi;