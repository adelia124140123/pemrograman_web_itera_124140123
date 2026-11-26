# Pertemuan 6 - RESTful API Mahasiswa & Matakuliah (Pyramid + PostgreSQL)

## Identitas
- **Nama Lengkap**    : Adelia Eva Ananta
- **NIM**             : 124140123
- **Kelas Praktikum** : RB

## Deskripsi
Proyek ini adalah aplikasi **RESTful API** berbasis **Pyramid Framework** (Python) yang menyimpan data di database **PostgreSQL**. Komunikasi dengan database memakai **SQLAlchemy ORM**, sedangkan perubahan struktur tabel dikelola dengan **Alembic** (migrasi).

REST API artinya klien (browser, Postman, cURL, aplikasi mobile) mengakses data lewat URL dan method HTTP (`GET`, `POST`, `PUT`, `DELETE`), lalu server membalas dalam format JSON.

Terdapat dua modul CRUD:
1. **Mahasiswa** (`/api/mahasiswa`)
2. **Matakuliah** (`/api/matakuliah`) - tugas praktikum

## Teknologi yang Digunakan
| Teknologi | Fungsi |
|-----------|--------|
| Python 3 | Bahasa pemrograman utama |
| Pyramid | Web framework untuk membuat routing dan view API |
| PostgreSQL | Database relasional penyimpan data |
| SQLAlchemy | ORM, memetakan tabel database menjadi class Python |
| Alembic | Pengelola migrasi (versi struktur tabel) |
| psycopg2 | Driver penghubung Python ke PostgreSQL |
| cURL / Postman | Alat untuk menguji endpoint |

## Struktur Tabel Matakuliah
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | Integer (PK) | ID unik, auto increment |
| `kode_mk` | String | Kode mata kuliah (wajib, unik) |
| `nama_mk` | String | Nama mata kuliah (wajib) |
| `sks` | Integer | Jumlah SKS (wajib, harus > 0) |
| `semester` | Integer | Semester pelaksanaan (wajib) |

## Instalasi & Menjalankan

### 1. Virtual environment & dependensi
Virtual environment dipakai supaya library proyek ini terpisah dari library Python lain di komputer.
```bash
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install --upgrade pip setuptools
pip install psycopg2-binary
pip install -e ".[testing]"
```

### 2. Database PostgreSQL
Buat database dan user khusus untuk aplikasi ini, lalu beri hak aksesnya.
```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
\c pyramid_mahasiswa
GRANT ALL ON SCHEMA public TO pyramid_user;
```
Sesuaikan connection string di `development.ini`:
```ini
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
```
Format: `postgresql://<user>:<password>@<host>:<port>/<nama_database>`

### 3. Migrasi Alembic
File migrasi sudah tersedia di `pyramid_mahasiswa/alembic/versions/`. Perintah berikut membuat tabel-tabel di database sesuai file migrasi tersebut:
```bash
alembic -c development.ini upgrade head
```

### 4. Seeding data awal
Mengisi tabel dengan data contoh supaya API langsung bisa diuji.
```bash
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

### 5. Jalankan server
```bash
pserve development.ini --reload
```
Server berjalan di `http://localhost:6543`. Opsi `--reload` membuat server restart otomatis setiap kode diubah.

## Daftar Endpoint Matakuliah
| Method | Endpoint | Keterangan | Status Sukses |
|--------|----------|------------|---------------|
| GET | `/api/matakuliah` | Daftar seluruh mata kuliah | 200 |
| GET | `/api/matakuliah/{id}` | Detail satu mata kuliah (404 jika tidak ada) | 200 |
| POST | `/api/matakuliah` | Tambah mata kuliah (400 jika tidak lengkap/tidak valid) | 201 |
| PUT | `/api/matakuliah/{id}` | Update mata kuliah | 200 |
| DELETE | `/api/matakuliah/{id}` | Hapus mata kuliah | 200 |

### Kode Status yang Digunakan
| Kode | Arti |
|------|------|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Data yang dikirim tidak lengkap atau tidak valid |
| 404 | Data dengan ID tersebut tidak ditemukan |

### Contoh Request Body (POST)
```json
{
  "kode_mk": "IF3250",
  "nama_mk": "Jaringan Komputer",
  "sks": 3,
  "semester": 5
}
```

## Pengujian (cURL)
Setiap perintah di bawah menguji satu skenario. Pastikan server sudah berjalan.
```bash
# READ ALL - menampilkan semua mata kuliah
curl -X GET http://localhost:6543/api/matakuliah

# READ ONE - menampilkan mata kuliah dengan id 1
curl -X GET http://localhost:6543/api/matakuliah/1

# CREATE - menambah mata kuliah baru
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk": "IF3250", "nama_mk": "Jaringan Komputer", "sks": 3, "semester": 5}'

# CREATE - validasi (tanpa kode_mk -> 400)
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"nama_mk": "Tanpa Kode", "sks": 3, "semester": 5}'

# CREATE - validasi (sks negatif -> 400)
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk": "IF9999", "nama_mk": "Uji SKS", "sks": -1, "semester": 5}'

# UPDATE - mengubah nama dan SKS mata kuliah id 1
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{"nama_mk": "Pemrograman Web Lanjut", "sks": 4}'

# DELETE - menghapus mata kuliah id 4
curl -X DELETE http://localhost:6543/api/matakuliah/4

# NOT FOUND - id 4 sudah dihapus -> 404
curl -X GET http://localhost:6543/api/matakuliah/4
```

## Bukti Pengujian (Screenshot)
Screenshot hasil cURL/Postman untuk seluruh endpoint **Mahasiswa** dan **Matakuliah**.

**1. READ ALL Matakuliah**
![READ ALL Matakuliah](screenshots/matakuliah_read_all.png)

**2. READ ONE Matakuliah**
![READ ONE Matakuliah](screenshots/matakuliah_read_one.png)

**3. CREATE Matakuliah**
![CREATE Matakuliah](screenshots/matakuliah_create.png)

**4. UPDATE Matakuliah**
![UPDATE Matakuliah](screenshots/matakuliah_update.png)

**5. DELETE Matakuliah**
![DELETE Matakuliah](screenshots/matakuliah_delete.png)

**6. Error 404 (Data Tidak Ditemukan)**
![404 Matakuliah](screenshots/matakuliah_404.png)

**7. Error 400 (Validasi Gagal)**
![400 Matakuliah](screenshots/matakuliah_400.png)
