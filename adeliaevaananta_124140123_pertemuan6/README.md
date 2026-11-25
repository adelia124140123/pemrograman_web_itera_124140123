# Pertemuan 6 - RESTful API Mahasiswa & Matakuliah (Pyramid + PostgreSQL)

## Identitas
- **Nama Lengkap**    : <Adelia Eva Ananta>
- **NIM**             : <124140123>
- **Kelas Praktikum** : <RB>

## Deskripsi
Aplikasi RESTful API berbasis **Pyramid Framework** dengan database **PostgreSQL**
(SQLAlchemy ORM + Alembic). Terdapat dua modul CRUD:
1. **Mahasiswa** (`/api/mahasiswa`)
2. **Matakuliah** (`/api/matakuliah`) - tugas praktikum

## Instalasi & Menjalankan

### 1. Virtual environment & dependensi
```bash
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install --upgrade pip setuptools
pip install psycopg2-binary
pip install -e ".[testing]"
```

### 2. Database PostgreSQL
```sql
CREATE DATABASE pyramid_mahasiswa;
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
\c pyramid_mahasiswa
GRANT ALL ON SCHEMA public TO pyramid_user;
```
Connection string di `development.ini`:
```ini
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
```

### 3. Migrasi Alembic
File migrasi sudah tersedia di `pyramid_mahasiswa/alembic/versions/`. Terapkan ke database:
```bash
alembic -c development.ini upgrade head
```

### 4. Seeding data awal
```bash
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

### 5. Jalankan server
```bash
pserve development.ini --reload
```
Server berjalan di `http://localhost:6543`.

## Daftar Endpoint Matakuliah
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/matakuliah` | Daftar seluruh mata kuliah |
| GET | `/api/matakuliah/{id}` | Detail mata kuliah (404 jika tidak ada) |
| POST | `/api/matakuliah` | Tambah mata kuliah (400 jika tidak lengkap/tidak valid) |
| PUT | `/api/matakuliah/{id}` | Update mata kuliah |
| DELETE | `/api/matakuliah/{id}` | Hapus mata kuliah |

## Pengujian (cURL)
```bash
# READ ALL
curl -X GET http://localhost:6543/api/matakuliah

# READ ONE
curl -X GET http://localhost:6543/api/matakuliah/1

# CREATE
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

# UPDATE
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{"nama_mk": "Pemrograman Web Lanjut", "sks": 4}'

# DELETE
curl -X DELETE http://localhost:6543/api/matakuliah/4

# NOT FOUND (404)
curl -X GET http://localhost:6543/api/matakuliah/4
```

## Bukti Pengujian (Screenshot)
> Tempelkan screenshot hasil cURL/Postman untuk seluruh endpoint **Mahasiswa** dan **Matakuliah**.

![READ ALL Matakuliah](screenshots/matakuliah_read_all.png)
![READ ONE Matakuliah](screenshots/matakuliah_read_one.png)
![CREATE Matakuliah](screenshots/matakuliah_create.png)
![UPDATE Matakuliah](screenshots/matakuliah_update.png)
![DELETE Matakuliah](screenshots/matakuliah_delete.png)
![404 Matakuliah](screenshots/matakuliah_404.png)
![400 Matakuliah](screenshots/matakuliah_400.png)
