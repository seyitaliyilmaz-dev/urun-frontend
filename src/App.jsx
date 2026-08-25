import { useRef } from 'react';
import Merhaba from './Merhaba';
import Sayac from './Sayac';
import UrunListesi from './UrunListesi';
import UrunEkle from './UrunEkle';

function App() {
  // useRef: UrunListesi bileşenine "doğrudan erişim" için bir referans oluşturuyoruz.
  const listeRef = useRef(null);

  function handleUrunEklendi() {
    // UrunEkle'de bir ürün eklendiğinde, UrunListesi'nin yenile() fonksiyonunu çağırıyoruz.
    listeRef.current.yenile();
  }

  return (
    <div>
      <Merhaba isim="Seyit" />
      <Merhaba isim="Kütüphane Sistemi" />
      <Sayac />
      <UrunEkle onUrunEklendi={handleUrunEklendi} />
      <UrunListesi ref={listeRef} />
    </div>
  );
}

export default App;