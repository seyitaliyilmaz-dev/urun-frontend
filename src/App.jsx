import Merhaba from './Merhaba';
import Sayac from './Sayac';
import UrunListesi from './UrunListesi';

function App() {
  return (
    <div>
      <Merhaba isim="Seyit" />
      <Merhaba isim="Kütüphane Sistemi" />
      <Sayac />
      <UrunListesi />
    </div>
  );
}

export default App;