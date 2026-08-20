import { useState, useEffect } from 'react';

function UrunListesi() {
  // urunler: API'den gelen ürünlerin tutulduğu state, başlangıçta boş dizi
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  // useEffect: bileşen ekrana ilk geldiğinde ÇALIŞACAK kodu belirtir.
  // Boş dizi [] ikinci parametre olarak verildiği için, bu kod SADECE
  // bileşen ilk oluştuğunda bir kez çalışır (her render'da değil).
  useEffect(() => {
    fetch('http://localhost:5200/api/urunler')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Sunucudan veri alınamadı');
        }
        return response.json();
      })
      .then((veri) => {
        setUrunler(veri);
        setYukleniyor(false);
      })
      .catch((err) => {
        setHata(err.message);
        setYukleniyor(false);
      });
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrunListesi;