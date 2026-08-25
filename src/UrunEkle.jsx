import { useState } from 'react';
import axios from 'axios';

// onUrunEklendi: parent bileşenden (App.jsx) gelen bir fonksiyon.
// Yeni ürün eklendiğinde, listeyi yenilemesi için App'e "haber veriyoruz".
function UrunEkle({ onUrunEklendi }) {
  const [urunAdi, setUrunAdi] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function formGonder(e) {
    e.preventDefault(); // formun sayfayı yenilemesini engeller (React'ta standart)

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

      // Formu temizle
      setUrunAdi('');
      setFiyat('');

      // Parent'a "yeni ürün eklendi, listeyi yenile" sinyali gönder
      onUrunEklendi();
    } catch (err) {
      setHata('Ürün eklenirken bir hata oluştu.');
    } finally {
      setGonderiliyor(false);
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '10px' }}>
      <h2>Yeni Ürün Ekle</h2>
      <form onSubmit={formGonder}>
        <input
          type="text"
          placeholder="Ürün adı"
          value={urunAdi}
          onChange={(e) => setUrunAdi(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={fiyat}
          onChange={(e) => setFiyat(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <button type="submit" disabled={gonderiliyor}>
          {gonderiliyor ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </form>
      {hata && <p style={{ color: 'red' }}>{hata}</p>}
    </div>
  );
}

export default UrunEkle;