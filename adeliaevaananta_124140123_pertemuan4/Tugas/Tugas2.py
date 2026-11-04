data_mahasiswa = [
    {"nama": "Adelia Eva Ananta", "nim": "124140123", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Dewangga Arya Sucipta",      "nim": "124220123", "nilai_uts": 72, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Isnaini Febriana",        "nim": "124140075", "nilai_uts": 70, "nilai_uas": 86, "nilai_tugas": 78},
    {"nama": "Bela Citra",      "nim": "124140051", "nilai_uts": 95, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Dinar Berliana",      "nim": "124140041", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]


def hitung_nilai_akhir(mhs: dict) -> float:
    """Nilai Akhir = 30% UTS + 40% UAS + 30% Tugas."""
    return (0.3 * mhs["nilai_uts"]) + (0.4 * mhs["nilai_uas"]) + (0.3 * mhs["nilai_tugas"])


def tentukan_grade(nilai: float) -> str:
    """Mengembalikan grade A-E berdasarkan nilai akhir."""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


# Hitung nilai akhir & grade, simpan kembali ke tiap dictionary
for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(mhs)
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

# Tampilkan tabel
garis = "=" * 60
print(garis)
print(f"{'No':<4}{'Nama':<22}{'NIM':<14}{'Nilai Akhir':>12}{'Grade':>8}")
print(garis)
for no, mhs in enumerate(data_mahasiswa, start=1):
    print(f"{no:<4}{mhs['nama']:<22}{mhs['nim']:<14}{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}")
print(garis)

# Nilai tertinggi & terendah
tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print("\nMahasiswa dengan nilai akhir TERTINGGI:")
print(f"  {tertinggi['nama']} ({tertinggi['nim']}) - {tertinggi['nilai_akhir']:.2f} [{tertinggi['grade']}]")
print("Mahasiswa dengan nilai akhir TERENDAH:")
print(f"  {terendah['nama']} ({terendah['nim']}) - {terendah['nilai_akhir']:.2f} [{terendah['grade']}]")
