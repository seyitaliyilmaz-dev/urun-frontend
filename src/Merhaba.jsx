function Merhaba({ isim }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Merhaba, {isim}! 👋</h2>
      <p>Bu benim ilk React bileşenim.</p>
    </div>
  );
}

export default Merhaba;