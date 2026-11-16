"""
library.py
Class Library: menyimpan dan mengelola koleksi item perpustakaan.
"""

from library_item import LibraryItem


class Library:
    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = []  # private: daftar seluruh item

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item ke perpustakaan (id tidak boleh duplikat)."""
        if self.cari_by_id(item.item_id) is not None:
            print(f"Gagal: item dengan id '{item.item_id}' sudah ada.")
            return False
        self.__koleksi.append(item)
        print(f"Item ditambahkan: {item.judul}")
        return True

    def tampilkan_tersedia(self):
        """Menampilkan daftar item yang tersedia (tidak sedang dipinjam)."""
        print(f"\n=== Katalog Tersedia - {self.nama} ===")
        tersedia = [item for item in self.__koleksi if not item.is_dipinjam]
        if not tersedia:
            print("(Tidak ada item yang tersedia)")
        for item in tersedia:
            print(" -", item.get_detail())  # polymorphism

    def tampilkan_semua(self):
        print(f"\n=== Seluruh Koleksi - {self.nama} ===")
        for item in self.__koleksi:
            print(" -", item)

    def cari_by_id(self, item_id: str):
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_by_judul(self, kata_kunci: str) -> list:
        kata_kunci = kata_kunci.lower()
        return [item for item in self.__koleksi if kata_kunci in item.judul.lower()]

    def cari_item(self, kata_kunci: str) -> list:
        """Mencari berdasarkan id (persis) atau judul (mengandung kata kunci)."""
        hasil = self.cari_by_judul(kata_kunci)
        item_id = self.cari_by_id(kata_kunci)
        if item_id is not None and item_id not in hasil:
            hasil.append(item_id)
        return hasil
