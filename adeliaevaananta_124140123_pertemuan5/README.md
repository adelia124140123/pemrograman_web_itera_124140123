# Praktikum Pengembangan Aplikasi Web - Pertemuan 5: Python OOP

| | |
|---|---|
| **Nama** | Adelia Eva Ananta |
| **NIM** | 124140123 |
| **Kelas Praktikum** | RB |
| **Program Studi** | Teknik Informatika, Institut Teknologi Sumatera (ITERA) |
| **Mata Kuliah** | Praktikum Pengembangan Aplikasi Web |
| **Topik** | Python OOP (class, object, inheritance, encapsulation, polymorphism, abstract class) |

## Tujuan Pembelajaran
1. Memahami konsep dasar Object-Oriented Programming (OOP).
2. Mengimplementasikan Class dan Object dalam Python.
3. Menerapkan atribut dan metode dalam class.
4. Menggunakan constructor dan `self` dalam Python.
5. Mengimplementasikan Inheritance (pewarisan) antar class.
6. Menerapkan Encapsulation dan access modifiers.
7. Memahami Polymorphism dan method overriding.
8. Mengimplementasikan Abstract Class dan interface.

## Struktur Folder

```
adeliaevaananta_124140123_pertemuan5/
├── .gitignore
├── README.md
├── screenshots/
│   ├── Outputmain(1).png
│   └── Outputmain(2).png
├── latihan/
│   ├── 01_everything_is_object.py
│   ├── 01_procedural_vs_oop.py
│   ├── 02_class_object.py
│   ├── 03_inheritance.py
│   ├── 04_encapsulation.py
│   ├── 05_polymorphism.py
│   └── 06_abstract_class.py
└── tugas_perpustakaan/
    ├── library_item.py
    ├── member.py
    ├── library.py
    └── main.py
```

## Persyaratan
- Python 3.10 atau lebih baru (diuji pada Python 3.14).
- Visual Studio Code dengan ekstensi Python (Microsoft).
- Tidak ada library eksternal. Semua program hanya memakai pustaka bawaan Python (`abc`, `math`).

## Cara Menjalankan

```bash
# Tugas Sistem Manajemen Perpustakaan
cd tugas_perpustakaan
python main.py

# Contoh menjalankan salah satu latihan
cd latihan
python 03_inheritance.py
```

Jika `python` tidak dikenali, gunakan `py` sebagai gantinya (Windows).

---

# Dokumentasi Tugas

## Tugas: Sistem Manajemen Perpustakaan Sederhana (`tugas_perpustakaan/`)

**Deskripsi:** Program console untuk mengelola koleksi perpustakaan. Pengguna dapat menambahkan item, menampilkan daftar item yang tersedia, mencari item berdasarkan judul atau id, serta meminjam dan mengembalikan item. Program dibuat dengan menerapkan konsep class, inheritance, encapsulation, dan polymorphism.

### A. Struktur Class

| File | Class | Peran |
|---|---|---|
| `library_item.py` | `LibraryItem(ABC)` | Abstract base class untuk semua item perpustakaan |
| `library_item.py` | `Book` | Subclass `LibraryItem` untuk buku (denda Rp 1.000/hari) |
| `library_item.py` | `Magazine` | Subclass `LibraryItem` untuk majalah (denda Rp 500/hari) |
| `member.py` | `Member` | Anggota perpustakaan yang dapat meminjam item (maksimal 3 pinjaman) |
| `library.py` | `Library` | Menyimpan dan mengelola koleksi item |
| `main.py` | - | Program utama untuk menguji seluruh fitur |

### B. Atribut dan Method Utama

**`LibraryItem` (abstract)**

| Elemen | Jenis | Keterangan |
|---|---|---|
| `_item_id`, `_judul`, `_tahun_terbit` | Atribut protected | Data dasar item |
| `__dipinjam` | Atribut private | Status peminjaman, tidak bisa diubah langsung dari luar |
| `item_id`, `judul`, `tahun_terbit`, `is_dipinjam` | `@property` | Akses baca (read-only) |
| `pinjam()`, `kembalikan()` | Method konkret | Mengubah status peminjaman dengan validasi |
| `hitung_denda(hari_telat)` | `@abstractmethod` | Wajib di-override subclass |
| `get_detail()` | `@abstractmethod` | Wajib di-override subclass |

**`Book`**: atribut tambahan `_penulis` dan `_jumlah_halaman`.
**`Magazine`**: atribut tambahan `_edisi` dan `_penerbit`.

**`Library`**

| Method | Fungsi |
|---|---|
| `tambah_item(item)` | Menambahkan item ke koleksi, menolak id yang duplikat |
| `tampilkan_tersedia()` | Menampilkan item yang tidak sedang dipinjam |
| `tampilkan_semua()` | Menampilkan seluruh koleksi beserta statusnya |
| `cari_by_id(item_id)` | Mencari item berdasarkan id |
| `cari_by_judul(kata_kunci)` | Mencari item yang judulnya mengandung kata kunci |
| `cari_item(kata_kunci)` | Pencarian gabungan berdasarkan judul atau id |

**`Member`**

| Method | Fungsi |
|---|---|
| `pinjam_item(item)` | Meminjam item, dibatasi maksimal 3 pinjaman aktif |
| `kembalikan_item(item)` | Mengembalikan item yang sedang dipinjam |

### C. Penerapan Konsep OOP

| Konsep | Penerapan pada program |
|---|---|
| **Class dan Object** | `Book`, `Magazine`, `Library`, dan `Member` dibuat sebagai class, lalu diinstansiasi menjadi objek di `main.py`. |
| **Abstraction** | `LibraryItem` memakai `ABC` dan `@abstractmethod`, sehingga tidak dapat diinstansiasi langsung (menghasilkan `TypeError`). |
| **Inheritance** | `Book` dan `Magazine` mewarisi `LibraryItem` dan memanggil constructor parent dengan `super().__init__()`. |
| **Encapsulation** | Atribut protected (`_judul`), atribut private (`__dipinjam`, `__koleksi`, `__item_dipinjam`), dan `@property is_dipinjam` yang bersifat read-only. |
| **Polymorphism** | `hitung_denda()` dan `get_detail()` di-override berbeda oleh `Book` dan `Magazine`, lalu dipanggil secara seragam tanpa `if-elif-else` pengecekan tipe. |

### D. Alur Program (`main.py`)
1. Membuat objek `Library`, lalu menambahkan 2 buku dan 2 majalah. Penambahan item dengan id duplikat ditolak.
2. Menampilkan katalog item yang tersedia.
3. Mencari item berdasarkan judul (`python`), id (`M001`), dan kata kunci yang tidak ada (`tidakada`).
4. Membuat objek `Member`, lalu meminjam item. Peminjaman item yang sudah dipinjam ditolak, dan katalog tersedia diperbarui.
5. Menghitung denda keterlambatan 5 hari untuk buku dan majalah (demonstrasi polymorphism).
6. Mengembalikan item, lalu menampilkan seluruh koleksi beserta statusnya.
7. Membuktikan encapsulation (`is_dipinjam` read-only) dan abstract class (`LibraryItem` tidak bisa diinstansiasi).

**Screenshot hasil eksekusi:**

Penambahan item, katalog tersedia, pencarian, dan peminjaman:

![Hasil Tugas](screenshot/Outputmain(1).png)

Denda, pengembalian, dan pembuktian encapsulation:

![Hasil Tugas](screenshot/Outputmain(2).png)

---

# Dokumentasi Latihan (Hands-on)

| File | Materi | Konsep utama |
|---|---|---|
| `01_everything_is_object.py` | Hands-on 1 | Di Python semua adalah objek: `type()`, `__class__`, `id()`, fungsi sebagai objek |
| `01_procedural_vs_oop.py` | Hands-on 2 | Perbandingan pendekatan prosedural (dictionary dan fungsi terpisah) dengan OOP |
| `02_class_object.py` | Hands-on 3 | Atribut class vs atribut instance, constructor `__init__`, `self`, dunder `__str__` dan `__repr__` |
| `03_inheritance.py` | Hands-on 4 | Single dan multiple inheritance, `super()`, method overriding, `isinstance()`, `issubclass()`, MRO |
| `04_encapsulation.py` | Hands-on 5 | Public, protected, private, name mangling, `@property` dan setter |
| `05_polymorphism.py` | Hands-on 6 | Polymorphism via inheritance, duck typing, fungsi polimorfik, operator overloading (`__add__`, `__eq__`) |
| `06_abstract_class.py` | Hands-on 7 | `ABC`, `@abstractmethod`, abstract property, pola interface database |

---

## Konsep Penting yang Dipelajari
- **Class adalah cetak biru, object adalah hasil cetakannya.** Satu class dapat menghasilkan banyak objek dengan data masing-masing.
- **Atribut class dibagi bersama, atribut instance milik tiap objek.** Mengubah `Mahasiswa.universitas` berdampak ke semua objek, sedangkan `self.nama` hanya ke satu objek.
- **`self`** adalah referensi ke objek yang sedang memanggil method, dan wajib menjadi parameter pertama method instance.
- **`super()`** memanggil constructor atau method milik parent class tanpa menulis nama parent secara manual.
- **Python tidak punya `private` sungguhan.** Awalan `_` hanya konvensi (protected), sedangkan `__` memicu name mangling menjadi `_NamaClass__atribut`.
- **`@property`** membuat method bisa diakses seperti atribut, dan setter memungkinkan validasi sebelum nilai disimpan.
- **Duck typing:** objek tidak harus mewarisi class tertentu, cukup memiliki method dengan nama dan parameter yang sesuai.
- **Abstract class tidak dapat diinstansiasi.** Subclass yang lupa meng-override salah satu abstract method juga tidak dapat diinstansiasi (`TypeError`).
- **MRO (Method Resolution Order)** menentukan urutan pencarian method pada multiple inheritance. Urutannya dapat dilihat dengan `NamaClass.__mro__`.
