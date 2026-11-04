# Praktikum Pengembangan Aplikasi Web - Pertemuan 4: Python Dasar

| | |
|---|---|
| **Nama** | Adelia Eva Ananta |
| **NIM** | 124140123 |
| **Program Studi** | Teknik Informatika, Institut Teknologi Sumatera (ITERA) |
| **Mata Kuliah** | Praktikum Pengembangan Aplikasi Web |
| **Topik** | Python Dasar (variabel, struktur kendali, fungsi, struktur data, modul) |

## Tujuan Pembelajaran
1. Memahami konsep dasar Python sebagai bahasa pemrograman.
2. Menguasai variabel, tipe data, dan operator.
3. Mengimplementasikan struktur kendali (conditionals dan loops).
4. Membuat dan menggunakan fungsi.
5. Bekerja dengan koleksi data: list, dictionary, tuple, dan set.

## Struktur Folder

```
adeliaevaananta_124140123_pertemuan4/
├── .gitignore
├── README.md
├── Praktikum/
│   ├── Praktikum1/   
│   ├── Praktikum2/   
│   ├── Praktikum3/   
│   ├── Praktikum4/   
│   ├── Praktikum5/   
│   └── Praktikum6/   
├── Latihan/
│   ├── Latihan1/     
│   ├── Latihan2/     
│   ├── Latihan3/     
│   ├── Latihan4/     
│   ├── Latihan5/     
│   └── Latihan6/     
└── tugas/
    ├── Tugas1.py
    ├── Tugas2.py
    ├── Tugas3/math_operations.py dan main.py
```

## Persyaratan
- Python 3.8 atau lebih baru (diuji pada Python 3.14).
- Visual Studio Code dengan ekstensi Python (Microsoft).
- Tidak ada library eksternal. Semua program hanya memakai pustaka bawaan Python.
  
---

# Dokumentasi Tugas

## Soal 1: Program Penghitung BMI (`tugas1_bmi.py`)

**Deskripsi:** Program menghitung Body Mass Index (BMI) dari berat badan (kg) dan tinggi badan (m), lalu menampilkan kategori status berat badan.

**Alur kerja:**
1. Program meminta input berat badan (kg) dan tinggi badan (m) memakai `input()`, lalu dikonversi ke `float`.
2. Input divalidasi: jika bukan angka (`ValueError`) atau bernilai nol/negatif, program menampilkan pesan dan berhenti.
3. Fungsi `hitung_bmi(berat, tinggi)` menghitung BMI dengan rumus `berat / (tinggi * tinggi)`.
4. Fungsi `tentukan_kategori(bmi)` menentukan kategori dengan `if-elif-else`:

| Rentang BMI | Kategori |
|---|---|
| BMI < 18.5 | Berat badan kurang |
| 18.5 ≤ BMI < 25 | Berat badan normal |
| 25 ≤ BMI < 30 | Berat badan berlebih |
| BMI ≥ 30 | Obesitas |

5. Hasil dicetak dengan f-string, BMI diformat 2 angka desimal (`:.2f`).

**Screenshot hasil eksekusi:**

(tempel screenshot di sini)

---

## Soal 2: Pengelolaan Data Nilai Mahasiswa (`tugas2_nilai_mahasiswa.py`) - Bobot 40%

**Deskripsi:** Program mengolah data nilai 5 mahasiswa, menghitung nilai akhir, menentukan grade, menampilkan tabel, dan mencari mahasiswa dengan nilai tertinggi serta terendah.

**Alur kerja:**
1. Data disimpan dalam sebuah **list** berisi 5 **dictionary** dengan kunci `nama`, `nim`, `nilai_uts`, `nilai_uas`, `nilai_tugas`.
2. Fungsi `hitung_nilai_akhir()` menghitung:
   `Nilai Akhir = (30% x UTS) + (40% x UAS) + (30% x Tugas)`
3. Fungsi `tentukan_grade()` menentukan grade:

| Nilai Akhir | Grade |
|---|---|
| ≥ 80 | A |
| 70 - 79 | B |
| 60 - 69 | C |
| 50 - 59 | D |
| < 50 | E |

4. Nilai akhir dan grade disimpan kembali ke tiap dictionary, lalu semua data ditampilkan dalam tabel rapi memakai perataan f-string (`<` rata kiri, `>` rata kanan).
5. Nilai tertinggi dan terendah dicari dengan `max()` dan `min()` yang memakai `key=lambda`.

**Screenshot hasil eksekusi:**

(tempel screenshot di sini)

---

## Soal 3: Modul Matematika Python (`math_operations.py` dan `main.py`) - Bobot 30%

**Deskripsi:** Membuat modul matematika kustom, lalu memanggil seluruh fungsinya dari program utama.

### A. Modul `math_operations.py`
| Kategori | Fungsi |
|---|---|
| Konstanta | `PI = 3.14159` |
| Persegi | `luas_persegi(sisi)`, `keliling_persegi(sisi)` |
| Persegi panjang | `luas_persegi_panjang(panjang, lebar)`, `keliling_persegi_panjang(panjang, lebar)` |
| Lingkaran | `luas_lingkaran(jari_jari)`, `keliling_lingkaran(jari_jari)` |
| Konversi suhu | `celsius_ke_fahrenheit(celsius)`, `celsius_ke_kelvin(celsius)` |

Setiap fungsi punya docstring yang menjelaskan parameter dan nilai kembaliannya.

### B. Program utama `main.py`
Menerapkan **2 cara impor berbeda**:
- `import math_operations`: fungsi dipanggil dengan awalan nama modul, misalnya `math_operations.luas_persegi(5)`.
- `from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI`: fungsi dan konstanta dipanggil langsung tanpa awalan.

**Screenshot hasil eksekusi:**

(tempel screenshot di sini)

---

# Dokumentasi Praktikum dan Latihan

## Praktikum
| Folder | File | Materi |
|---|---|---|
| praktikum1 | `01_pengenalan.py` | Fungsi `print()`, parameter `sep` dan `end`, escape character |
| praktikum2 | `02_variabel.py` | Tipe data, f-string, operasi string, type casting, `input()` |
| praktikum3 | `03_kendali.py` | `if-elif-else`, ternary, `for`, `while`, `break`, `continue`, nested loop |
| praktikum4 | `04_fungsi.py` | Default argument, multiple return, `*args`, `**kwargs`, lambda |
| praktikum5 | `05_struktur_data.py` | List, tuple, dictionary, set, list comprehension |
| praktikum6 | `kalkulator_lib.py`, `06_modul_app.py` | Modul kustom, standard library, `if __name__ == "__main__"` |

## Latihan Mandiri
| Folder | File | Deskripsi |
|---|---|---|
| latihan1 | `latihan1.py` | Mencetak profil dengan `sep` dan kartu identitas berbingkai `#` memakai escape character |
| latihan2 | `latihan2_suhu.py` | Konversi Celsius ke Fahrenheit dan Kelvin dari input pengguna |
| latihan3 | `latihan3_tebak.py` | Game tebak angka dengan `while True` dan `break` |
| latihan4 | `latihan4_validasi.py` | Fungsi validasi password (minimal 8 karakter dan mengandung angka) |
| latihan5 | `latihan5_kontak.py` | Katalog kontak berbasis dictionary (tambah, cari dengan `.get()`, tampilkan) |
| latihan6 | `password_gen.py`, `main.py` | Modul generator password acak dengan `random` dan `string` |

---

## Konsep Penting yang Dipelajari
- **Nama file = nama modul.** `import math_operations` hanya berhasil jika ada file `math_operations.py` di folder yang sama.
- **`if __name__ == "__main__":`** mencegah kode pengujian ikut berjalan saat file di-import oleh file lain.
- **`.get()` pada dictionary** lebih aman daripada `dict[key]` karena tidak memicu `KeyError`.
- **`input()` selalu menghasilkan string**, sehingga harus dikonversi dengan `int()` atau `float()` sebelum dihitung.
- **Indentasi** menentukan blok kode di Python (standar PEP 8: 4 spasi).

## Konvensi Kode
- Penamaan variabel dan fungsi memakai `snake_case`.
- Indentasi 4 spasi secara konsisten.
- Setiap fungsi di bagian tugas diberi docstring.
- Folder `venv/` dan `__pycache__/` tidak diunggah (terdaftar di `.gitignore`).
