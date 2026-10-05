# Mini POS - Kasir & Keranjang Belanja Sederhana

Aplikasi web kasir sederhana untuk kantin atau toko kampus, dibuat sebagai tugas praktikum Pemrograman Web Pertemuan 1 (Institut Teknologi Sumatera).

---

## 1. Identitas

| Keterangan | Isi |
|---|---|
| Nama Lengkap | [Nama Lengkap] |
| NIM | 124140123 |
| Kelas Praktikum | [Kelas Praktikum] |

---

## 2. Deskripsi Aplikasi

### Gambaran Umum
Mini POS adalah aplikasi kasir berbasis web yang membantu kasir mencatat belanja pelanggan di kantin atau toko kampus. Kasir memasukkan nama barang, harga satuan, dan jumlah. Aplikasi lalu menghitung subtotal, total belanja, diskon, total akhir, dan kembalian secara otomatis. Daftar belanja disimpan di `localStorage` browser sehingga tidak hilang ketika halaman di-refresh.

### Tujuan Pembuatan
Aplikasi ini dibuat untuk menerapkan tiga kompetensi dasar JavaScript di browser:

1. **Validasi input form**, lengkap dengan pesan error yang jelas bagi pengguna.
2. **Perhitungan otomatis**, meliputi subtotal, total belanja, diskon, dan kembalian.
3. **Manajemen keranjang belanja** dengan penyimpanan persisten memakai `localStorage`.

### Studi Kasus yang Dipilih
Studi kasus yang dipilih adalah **kasir kantin kampus**. Alur kerjanya: kasir menginput barang yang dibeli, aplikasi menampilkannya di tabel keranjang, menghitung total dan diskon, lalu kasir memasukkan uang bayar untuk mengetahui kembalian. Setelah transaksi selesai, kasir menekan tombol Transaksi Baru untuk mengosongkan keranjang.

### Tampilan
Antarmuka memakai gaya *glassmorphism*: kartu semi-transparan dengan efek blur di atas latar gradien lembut berwarna biru, teal, dan ungu muda. Rancangan awal tampilan dibuat dengan Google Stitch, kemudian disesuaikan dengan kebutuhan tugas.

### Teknologi
- HTML5 (struktur halaman)
- CSS3 (tampilan, CSS Grid, CSS Variables, `backdrop-filter`)
- JavaScript (logika aplikasi, DOM, `localStorage`)
- Google Fonts: Inter dan JetBrains Mono

---

## 3. Struktur Folder

```
pemrograman_web_itera_124140123/
└── [nama]_124140123_pertemuan1/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── README.md
    ├── screenshots/
    │   ├── form.png
    │   ├── error.png
    │   └── hasil.png
    └── modul/
        └── (file latihan praktikum)
```

---

## 4. Panduan Menjalankan

1. Clone repository:
```
   git clone https://github.com/[username]/pemrograman_web_itera_124140123.git
```
2. Buka folder `[nama]_124140123_pertemuan1` di Visual Studio Code.
3. Pasang ekstensi **Live Server** (oleh Ritwick Dey) melalui menu Extensions, jika belum terpasang.
4. Klik kanan pada file `index.html`, lalu pilih **Open with Live Server**.
5. Aplikasi akan terbuka otomatis di browser, biasanya pada alamat `http://127.0.0.1:5500/index.html`.

**Alternatif tanpa Live Server:** klik dua kali file `index.html` agar terbuka langsung di browser.

**Catatan:** font Inter dan JetBrains Mono dimuat dari Google Fonts, sehingga koneksi internet dibutuhkan agar tampilan font sesuai rancangan. Tanpa internet, aplikasi tetap berjalan menggunakan font bawaan sistem.

---

## 5. Daftar Fitur

### Validasi Form
- [x] Nama barang wajib diisi, minimal 3 karakter
- [x] Harga satuan wajib berupa angka dan minimal Rp 500
- [x] Qty wajib berupa bilangan bulat minimal 1
- [x] Pesan error berwarna merah tampil tepat di bawah input yang salah
- [x] Input yang salah diberi border merah
- [x] Barang tidak masuk keranjang jika ada input yang tidak valid
- [x] Form otomatis di-reset setelah barang berhasil ditambahkan

### Kalkulator
- [x] Subtotal per barang (harga satuan x qty)
- [x] Total belanja dihitung otomatis dari seluruh subtotal
- [x] Diskon 10% otomatis jika total belanja minimal Rp 50.000
- [x] Kode promo `HEMAT10` untuk diskon 10%
- [x] Nominal diskon dan total akhir ditampilkan
- [x] Input uang bayar dengan perhitungan kembalian otomatis
- [x] Keterangan "Uang belum mencukupi" jika uang bayar kurang
- [x] Format angka dalam Rupiah (contoh: Rp 12.500)

### Keranjang Belanja dan localStorage
- [x] Tabel keranjang dengan kolom No, Nama Barang, Harga Satuan, Qty, Subtotal, dan Aksi
- [x] Tombol Hapus pada setiap baris barang
- [x] Total belanja dan diskon terhitung ulang otomatis setelah item dihapus
- [x] Keranjang disimpan ke `localStorage` dengan `JSON.stringify()`
- [x] Keranjang dimuat kembali dengan `JSON.parse()` sehingga tidak hilang saat refresh
- [x] Tombol Transaksi Baru / Reset untuk mengosongkan keranjang dan `localStorage`

### Fitur Tambahan
- [x] Menu Favorit Cepat (Es Teh, Ayam Geprek, Gorengan, Kopi Susu) untuk mengisi form lebih cepat
- [x] Tampilan keranjang kosong (empty state)
- [x] Tampilan responsif untuk desktop, tablet, dan HP
- [x] Fokus kursor kembali ke kolom Nama Barang setelah barang ditambahkan

---

## 6. Tangkapan Layar (Screenshot)

### 6.1 Tampilan Form Input Utama
![Tampilan Form Input](screenshots/form.png)

### 6.2 Tampilan Saat Validasi Error Muncul
![Tampilan Validasi Error](screenshots/error.png)

### 6.3 Tampilan Hasil Perhitungan Kalkulator dan Tabel Keranjang
![Tampilan Hasil Perhitungan](screenshots/hasil.png)

---

## 7. Penjelasan Teknis Singkat

### 7.1 Penanganan Validasi Input
Ketika form di-submit, fungsi `tambahBarang()` memanggil `event.preventDefault()` agar halaman tidak reload, lalu menjalankan `validasiForm()`. Fungsi ini memeriksa ketiga input sekaligus agar semua pesan error tampil bersamaan:

- **Nama barang:** setelah `trim()` (membuang spasi di awal dan akhir), panjangnya harus minimal 3 karakter.
- **Harga satuan:** tidak boleh kosong, harus berupa angka, dan minimal `MIN_HARGA` (500).
- **Qty:** harus bilangan bulat (dicek dengan `Number.isInteger()`) dan minimal 1.

Jika ada input yang salah, pesan error ditulis ke elemen `<small class="error">` di bawah input tersebut dan input diberi class `invalid` agar border-nya berwarna merah. Fungsi mengembalikan `false`, sehingga barang tidak ditambahkan ke keranjang. Jika semua input benar, barang dimasukkan ke array `keranjang` beserta `id` unik (`Date.now()`), data disimpan, dan form di-reset.

### 7.2 Algoritma Kalkulator
Perhitungan dilakukan oleh beberapa fungsi kecil yang masing-masing punya satu tugas:

| Fungsi | Tugas | Rumus |
|---|---|---|
| `hitungTotalBelanja()` | Menjumlahkan semua subtotal dengan `reduce()` | Total = jumlah (harga x qty) |
| `hitungDiskon()` | Menentukan potongan harga | Diskon = 10% x Total, jika Total >= Rp 50.000 atau kode `HEMAT10` dimasukkan |
| `renderRingkasan()` | Menghitung total akhir | Total Akhir = Total - Diskon |
| `hitungKembalian()` | Menghitung kembalian | Kembalian = Uang Bayar - Total Akhir |

Diskon karena total belanja dan diskon karena kode promo tidak ditumpuk, sehingga diskon maksimal 10%. Jika uang bayar kurang dari total akhir, aplikasi menampilkan keterangan "Uang belum mencukupi". Setiap kali kasir mengetik di kolom kode promo atau uang bayar, perhitungan dijalankan ulang secara langsung lewat event `input`.

Nilai aturan bisnis (harga minimal, minimal belanja diskon, persen diskon, kode promo) disimpan sebagai konstanta di bagian atas `script.js`, sehingga mudah diubah tanpa menyentuh logika fungsi.

Angka ditampilkan dalam format Rupiah dengan `toLocaleString("id-ID")`.

### 7.3 Mekanisme Serialisasi localStorage
`localStorage` hanya dapat menyimpan data bertipe string, sedangkan keranjang berupa array berisi objek. Karena itu dilakukan serialisasi:

- **Menyimpan:** `simpanKeranjang()` mengubah array menjadi string JSON.
```javascript
  localStorage.setItem("miniPosKeranjang", JSON.stringify(keranjang));
```
- **Memuat:** `muatKeranjang()` dipanggil saat halaman dibuka. Fungsi ini membaca string dari `localStorage` lalu mengubahnya kembali menjadi array dengan `JSON.parse()`. Proses dibungkus `try...catch` agar aplikasi tidak error jika data rusak, dan `Array.isArray()` memastikan hasilnya benar-benar array.
- **Menghapus:** tombol reset memanggil `localStorage.removeItem("miniPosKeranjang")`.

Penyimpanan dilakukan setiap kali keranjang berubah (menambah barang, menghapus barang, dan reset). Itulah yang membuat isi keranjang tetap ada setelah halaman di-refresh.

### 7.4 Keamanan dan Struktur Kode
- Isi tabel dibuat dengan `createElement()` dan `textContent`, bukan `innerHTML`, sehingga input seperti `<script>` tidak dieksekusi (mencegah XSS).
- Setiap barang memiliki `id` unik untuk penghapusan yang akurat.
- Kode dipisah menjadi `index.html` (struktur), `style.css` (tampilan), dan `script.js` (logika), dengan nama fungsi yang menjelaskan tugasnya.

---

## 8. Folder `modul/`

Folder `modul/` berisi file latihan yang dikerjakan selama mengikuti materi praktikum Pertemuan 1.

| File | Keterangan |
|---|---|
| [nama-file-latihan-1] | [keterangan singkat] |
| [nama-file-latihan-2] | [keterangan singkat] |