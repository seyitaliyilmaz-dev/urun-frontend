import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import axios from 'axios';

// Cache süresi: 30 saniye. Bu süre içinde tekrar istenirse,
// sunucuya gitmeden hafızadaki veriyi kullanırız.
const CACHE_SURESI_MS = 30000;

const UrunListesi = forwardRef((props, ref) => {
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);
  const [aramaMetni, setAramaMetni] = useState('');
  const [sayfa, setSayfa] = useState(1);
  const sayfaBasinaKayit = 5;

  // useRef: bileşen yeniden render olduğunda SIFIRLANMAYAN bir "hafıza kutusu".
  // Son çekilen veriyi ve çekildiği zamanı burada tutuyoruz.
  const cacheRef = useRef({ veri: null, zaman: 0 });

  // zorla: true verilirse, cache'i yok sayıp mutlaka sunucudan taze veri çeker
  // (ekleme/silme sonrası olduğu gibi güncel veri şart olan durumlarda kullanılır).
  async function urunleriGetir(zorla = false) {
    const simdi = Date.now();
    const cacheGecerli = cacheRef.current.veri && (simdi - cacheRef.current.zaman < CACHE_SURESI_MS);

    if (!zorla && cacheGecerli) {
      // Cache hâlâ geçerli: sunucuya hiç gitmeden, hafızadaki veriyi kullan.
      setUrunler(cacheRef.current.veri);
      setYukleniyor(false);
      return;
    }

    try {
      setYukleniyor(true);
      const response = await axios.get('http://localhost:5200/api/urunler');
      setUrunler(response.data);
      setHata(null);

      // Yeni veriyi cache'e kaydet, zaman damgasını güncelle.
      cacheRef.current = { veri: response.data, zaman: Date.now() };
    } catch (err) {
      setHata('Sunucudan veri alınamadı');
    } finally {
      setYukleniyor(false);
    }
  }

  async function urunSil(id) {
    try {
      await axios.delete(`http://localhost:5200/api/urunler/${id}`);
      const guncelListe = urunler.filter((u) => u.urunID !== id);
      setUrunler(guncelListe);
      // Silme sonrası cache'i de güncelliyoruz, yoksa bir sonraki "cache'den oku"
      // isteğinde silinen ürün hayalet gibi geri gelirdi.
      cacheRef.current = { veri: guncelListe, zaman: Date.now() };
    } catch (err) {
      alert('Ürün silinirken bir hata oluştu.');
    }
  }

  useImperativeHandle(ref, () => ({
    // Dışarıdan (UrunEkle'den) çağrıldığında HER ZAMAN taze veri çeksin diye zorla=true.
    yenile: () => urunleriGetir(true)
  }));

  useEffect(() => {
    urunleriGetir();
  }, []);

  const filtrelenmisUrunler = urunler.filter((urun) =>
    urun.urunAdi.toLowerCase().includes(aramaMetni.toLowerCase())
  );

  const toplamSayfa = Math.max(1, Math.ceil(filtrelenmisUrunler.length / sayfaBasinaKayit));
  const gosterilecekUrunler = filtrelenmisUrunler.slice(
    (sayfa - 1) * sayfaBasinaKayit,
    sayfa * sayfaBasinaKayit
  );

  function aramaDegisti(e) {
    setAramaMetni(e.target.value);
    setSayfa(1);
  }

  if (yukleniyor) return <p className="text-gray-500">Yükleniyor...</p>;
  if (hata) return <p className="text-red-600">Hata: {hata}</p>;

  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Ürünler</h2>
        <button
          onClick={() => urunleriGetir(true)}
          className="text-xs text-blue-600 hover:text-blue-800"
          title="Sunucudan taze veri çek"
        >
          🔄 Yenile
        </button>
      </div>

      <input
        type="text"
        placeholder="Ürün ara..."
        value={aramaMetni}
        onChange={aramaDegisti}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="divide-y divide-gray-100">
        {gosterilecekUrunler.map((urun) => (
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

      {gosterilecekUrunler.length === 0 && (
        <p className="text-gray-400 text-sm mt-3">Aramanıza uygun ürün bulunamadı.</p>
      )}

      {toplamSayfa > 1 && (
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => setSayfa((s) => Math.max(1, s - 1))}
            disabled={sayfa === 1}
            className="text-sm text-blue-600 disabled:text-gray-300"
          >
            ← Önceki
          </button>
          <span className="text-xs text-gray-500">
            Sayfa {sayfa} / {toplamSayfa}
          </span>
          <button
            onClick={() => setSayfa((s) => Math.min(toplamSayfa, s + 1))}
            disabled={sayfa === toplamSayfa}
            className="text-sm text-blue-600 disabled:text-gray-300"
          >
            Sonraki →
          </button>
        </div>
      )}
    </div>
  );
});

export default UrunListesi;