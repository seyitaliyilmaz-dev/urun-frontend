import { useState } from 'react';

function Sayac() {
  // useState(0) -> "sayi" adında bir state değişkeni oluşturur, başlangıç değeri 0.
  // "setSayi" ise bu değeri güncellemek için kullanılan fonksiyon.
  const [sayi, setSayi] = useState(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '10px' }}>
      <h2>Sayaç: {sayi}</h2>
      <button onClick={() => setSayi(sayi + 1)}>Artır</button>
      <button onClick={() => setSayi(sayi - 1)} style={{ marginLeft: '8px' }}>Azalt</button>
    </div>
  );
}

export default Sayac;