# Ürün Yönetimi - React Arayüzü

React (Vite) ile geliştirilmiş, `urun-api` (.NET backend) ile entegre çalışan bir ürün listeleme arayüzü.

## Özellikler

- **Bileşen (Component) mimarisi:** Yeniden kullanılabilir, prop alan React bileşenleri
- **State yönetimi:** `useState` hook'u ile bileşen içi durum yönetimi
- **API entegrasyonu:** `useEffect` ve `fetch` ile gerçek bir .NET Web API'sinden veri çekme
- **CORS ile çalışan tam bir frontend-backend senaryosu**

## Kullanılan Teknolojiler

- React
- Vite
- JavaScript (JSX)

## Bileşenler

| Bileşen | Açıklama |
|---|---|
| `Merhaba.jsx` | Prop alan basit bir karşılama bileşeni |
| `Sayac.jsx` | `useState` ile artan/azalan sayaç |
| `UrunListesi.jsx` | `urun-api`'den gerçek ürün verisi çeken, listeleyen bileşen |

## Çalıştırma

Bu proje, [`urun-api`](https://github.com/seyitaliyilmaz-dev/urun-api) projesinin **aynı anda çalışıyor olmasını** gerektirir (varsayılan olarak `http://localhost:5200` adresinde).

```bash
npm install
npm run dev
```

Ardından tarayıcıda `http://localhost:5173` adresine gidin.

## Not

`urun-api` tarafında, bu arayüzün istek atabilmesi için CORS ayarı (`http://localhost:5173` için izin) ve `GetAll()` endpoint'i için `[AllowAnonymous]` tanımlanmıştır.

