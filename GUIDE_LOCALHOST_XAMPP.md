# Panduan Localhost RentPhone via XAMPP

## 1. Install kebutuhan dasar

### Windows
1. Install XAMPP dari Apache Friends.
2. Install Node.js LTS dari nodejs.org.
3. Install Git dari git-scm.com.
4. Install Composer dari getcomposer.org.
5. Install VS Code jika butuh editor.

### Cek instalasi
Buka terminal baru, lalu jalankan:

```bash
node -v
npm -v
git --version
composer --version
php -v
```

Jika `php -v` tidak terbaca, tambahkan path PHP XAMPP ke Environment Variables:

```text
C:\xampp\php
```

Tutup terminal, buka ulang, cek lagi `php -v`.

## 2. Jalankan XAMPP

1. Buka XAMPP Control Panel.
2. Start `Apache`.
3. Start `MySQL`.
4. Klik `Admin` pada MySQL untuk membuka phpMyAdmin.
5. Buat database baru:

```text
sewa_iphone
```

## 3. Ambil project

```bash
git clone <URL_REPOSITORY_GITHUB>
cd <folder-project>
```

Struktur folder:

```text
backend/
frontend/
```

## 4. Setup backend Laravel

Masuk folder backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Edit file `backend/.env`:

```env
APP_NAME=RentPhone
APP_ENV=local
APP_KEY=<hasil php artisan key:generate>
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sewa_iphone
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DOMAIN=localhost
FRONTEND_URL=http://localhost:5173
```

Jalankan migrasi dan seed:

```bash
php artisan migrate:fresh --seed
```

Akun awal:

```text
Admin: admin@example.com / password
User: user@example.com / password
```

Jalankan backend:

```bash
php artisan serve
```

Backend aktif di:

```text
http://127.0.0.1:8000
```

## 5. Setup frontend

Buka terminal baru, masuk folder frontend:

```bash
cd frontend
npm install
```

Buat file `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Jalankan frontend:

```bash
npm run dev
```

Frontend aktif di:

```text
http://localhost:5173
```

## 6. Cara menjalankan website

1. XAMPP `Apache` aktif.
2. XAMPP `MySQL` aktif.
3. Backend aktif:

```bash
cd backend
php artisan serve
```

4. Frontend aktif:

```bash
cd frontend
npm run dev
```

5. Buka browser:

```text
http://localhost:5173
```

## 7. Fitur admin

Admin login:

```text
http://localhost:5173/admin/login
admin@example.com
password
```

Admin bisa:

- tambah produk
- edit produk
- hapus produk
- tambah kategori
- edit kategori
- hapus kategori
- lihat pesanan
- update status pesanan
- update status pembayaran
- lihat pengembalian di menu Pesanan
- update status pengembalian
- lihat customer
- lihat laporan

## 8. Fitur user

User login:

```text
http://localhost:5173/login
user@example.com
password
```

User bisa:

- lihat katalog dari database
- tambah favorit
- hapus favorit
- sewa produk
- checkout
- lihat riwayat pesanan
- lihat status pembayaran
- ajukan pengembalian
- lihat status pengembalian

## 9. Status yang muncul di user

Status pesanan:

```text
pending = Menunggu Konfirmasi
processing = Diproses
active = Sedang Disewa
returned = Dikembalikan
completed = Sewa Selesai
cancelled = Dibatalkan
```

Status pembayaran:

```text
unpaid = Belum Dibayar
pending = Pembayaran Pending
paid = Pembayaran Berhasil
failed = Pembayaran Gagal
refunded = Pembayaran Direfund
```

Status pengembalian:

```text
submitted = Pengembalian Dikirim
reviewed = Pengembalian Direview
accepted = Pengembalian Diterima
rejected = Pengembalian Ditolak
```

## 10. Jika hapus produk error foreign key

Jalankan migrasi terbaru:

```bash
cd backend
php artisan migrate
```

Jika masih error karena database lama rusak dan data boleh direset:

```bash
php artisan migrate:fresh --seed
```

## 11. Build production lokal

Frontend:

```bash
cd frontend
npm run build
```

Backend test:

```bash
cd backend
php artisan test
```

## 12. Troubleshooting

### `php` tidak dikenali
Tambahkan ini ke PATH:

```text
C:\xampp\php
```

### Database tidak konek
Cek:

- MySQL XAMPP aktif
- database `sewa_iphone` sudah dibuat
- `.env` DB benar
- `DB_PASSWORD=` kosong untuk XAMPP default

### CORS error
Pastikan backend jalan di:

```text
http://127.0.0.1:8000
```

Pastikan frontend `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### Perubahan `.env` tidak kebaca
Jalankan:

```bash
cd backend
php artisan config:clear
php artisan cache:clear
```

Restart `php artisan serve`.
