# Praktikum Pemrograman Web - Pertemuan 5: Python OOP

## Identitas Mahasiswa
- **Nama Lengkap** : [Adelia Eva Ananta]
- **NIM**          : [124140123]
- **Kelas Praktikum** : [RB]

## Deskripsi Program
Repositori ini berisi latihan Hands-on 1-7 (folder `latihan/`) dan tugas
**Sistem Manajemen Perpustakaan Sederhana** (folder `tugas_perpustakaan/`).

Penerapan 4 pilar OOP pada tugas perpustakaan:

- **Class & Object**: `Book`, `Magazine`, `Library`, dan `Member` dibuat sebagai class
  yang masing-masing diinstansiasi menjadi objek di `main.py`.
- **Inheritance**: `Book` dan `Magazine` mewarisi abstract class `LibraryItem`
  dan memanggil constructor parent lewat `super().__init__()`.
- **Encapsulation**: `LibraryItem` memakai atribut protected (`_judul`, `_item_id`) dan
  private (`__dipinjam`). `Library` menyimpan koleksi di `__koleksi`, `Member` menyimpan
  pinjaman di `__item_dipinjam`. Status peminjaman dibaca lewat `@property is_dipinjam`.
- **Polymorphism & Abstraction**: `LibraryItem` memiliki abstract method `hitung_denda()`
  dan `get_detail()` yang di-override berbeda oleh `Book` (Rp 1.000/hari) dan
  `Magazine` (Rp 500/hari). `Library` memanggil `item.get_detail()` pada semua jenis item
  tanpa `if-else`.

Fitur sistem: menambahkan item, menampilkan daftar item tersedia, mencari item
berdasarkan judul atau id, serta meminjam dan mengembalikan item.

## Panduan Menjalankan Program
Pastikan Python 3.10+ sudah terpasang.

```bash
# Tugas perpustakaan
cd tugas_perpustakaan
python main.py

# Contoh menjalankan latihan
cd ../latihan
python 03_inheritance.py
```

## Screenshot Output
> Tempel screenshot terminal di sini (penambahan, pencarian, dan penampilan katalog).

![Output main.py](screenshot/output_main.png)
