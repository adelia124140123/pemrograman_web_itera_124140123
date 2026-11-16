"""
main.py
Skrip untuk menguji seluruh fungsionalitas sistem perpustakaan.
Jalankan dengan: python main.py
"""

from library_item import Book, Magazine, LibraryItem
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- 1. Menambahkan Item ---")
    perpus.tambah_item(Book("B001", "Python untuk Pemula", 2022, "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Pemrograman Web dengan Pyramid", 2023, "Siti Rahma", 280))
    perpus.tambah_item(Magazine("M001", "Tech Monthly", 2024, "Edisi 11", "TechMedia"))
    perpus.tambah_item(Magazine("M002", "Info Komputer", 2024, "Edisi 10", "KompasMedia"))
    perpus.tambah_item(Book("B001", "Duplikat Id", 2020, "Anonim", 100))  # ditolak

    print("\n--- 2. Katalog Item Tersedia ---")
    perpus.tampilkan_tersedia()

    print("\n--- 3. Pencarian Item ---")
    for kata_kunci in ["python", "M001", "tidakada"]:
        hasil = perpus.cari_item(kata_kunci)
        print(f"Cari '{kata_kunci}':", [str(i) for i in hasil] if hasil else "tidak ditemukan")

    print("\n--- 4. Peminjaman & Status Ketersediaan ---")
    anggota = Member("Adelia Eva Ananta", "124140123")
    buku = perpus.cari_by_id("B001")
    majalah = perpus.cari_by_id("M001")
    anggota.pinjam_item(buku)
    anggota.pinjam_item(majalah)
    anggota.pinjam_item(buku)  # sudah dipinjam
    print(anggota)
    print("Status buku B001 dipinjam? ", buku.is_dipinjam)
    perpus.tampilkan_tersedia()

    print("\n--- 5. Polymorphism: Hitung Denda (telat 5 hari) ---")
    for item in [buku, majalah]:
        print(f"{item.judul}: Rp {item.hitung_denda(5):,.0f}")

    print("\n--- 6. Pengembalian ---")
    anggota.kembalikan_item(buku)
    print(anggota)
    perpus.tampilkan_semua()

    print("\n--- 7. Bukti Enkapsulasi & Abstract Class ---")
    try:
        buku.is_dipinjam = False  # property read-only
    except AttributeError:
        print("is_dipinjam bersifat read-only (AttributeError).")
    try:
        LibraryItem("X", "Abstrak", 2000)
    except TypeError as err:
        print("LibraryItem tidak bisa diinstansiasi:", err)


if __name__ == "__main__":
    main()
