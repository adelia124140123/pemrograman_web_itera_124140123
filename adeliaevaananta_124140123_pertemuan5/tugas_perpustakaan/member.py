"""
member.py
Class Member: anggota perpustakaan yang dapat meminjam item.
"""

from library_item import LibraryItem


class Member:
    MAKS_PINJAM = 3

    def __init__(self, nama: str, nim: str):
        self.nama = nama
        self._nim = nim
        self.__item_dipinjam = []  # private: daftar item yang sedang dipinjam

    @property
    def nim(self) -> str:
        return self._nim

    @property
    def jumlah_pinjaman(self) -> int:
        return len(self.__item_dipinjam)

    def pinjam_item(self, item: LibraryItem) -> bool:
        if self.jumlah_pinjaman >= self.MAKS_PINJAM:
            print(f"Gagal: {self.nama} sudah mencapai batas {self.MAKS_PINJAM} pinjaman.")
            return False
        if item.pinjam():
            self.__item_dipinjam.append(item)
            return True
        return False

    def kembalikan_item(self, item: LibraryItem) -> bool:
        if item in self.__item_dipinjam and item.kembalikan():
            self.__item_dipinjam.remove(item)
            return True
        return False

    def __str__(self) -> str:
        return f"Member: {self.nama} (NIM: {self._nim}) | Pinjaman aktif: {self.jumlah_pinjaman}"
