function Merhaba({ isim }) {
  return (
    <div className="flex-1 bg-white rounded-lg shadow p-5 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">Merhaba, {isim}! 👋</h2>
      <p className="text-sm text-gray-500 mt-1">Bu benim ilk React bileşenim.</p>
    </div>
  );
}

export default Merhaba;