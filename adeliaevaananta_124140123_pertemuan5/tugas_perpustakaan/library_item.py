"""
library_item.py
Berisi abstract class LibraryItem beserta subclass Book dan Magazine.
Menerapkan: Abstract Class, Inheritance, Encapsulation, @property, Polymorphism.
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract base class untuk semua item di perpustakaan."""

    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        self._item_id = item_id          # protected: id unik item
        self._judul = judul              # protected: judul item
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False          # private: status peminjaman

    # PROPERTY (read-only)
    @property
    def item_id(self) -> str:
        return self._item_id

    @property
    def judul(self) -> str:
        return self._judul

    @property
    def tahun_terbit(self) -> int:
        return self._tahun_terbit

    @property
    def is_dipinjam(self) -> bool:
        """Status peminjaman hanya bisa dibaca dari luar class."""
        return self.__dipinjam

    # METHOD KONKRET
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. Return False jika sudah dipinjam."""
        if self.__dipinjam:
            print(f"Gagal: '{self._judul}' sedang dipinjam.")
            return False
        self.__dipinjam = True
        print(f"Berhasil: '{self._judul}' dipinjam.")
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai tersedia kembali."""
        if not self.__dipinjam:
            print(f"Gagal: '{self._judul}' tidak sedang dipinjam.")
            return False
        self.__dipinjam = False
        print(f"Berhasil: '{self._judul}' dikembalikan.")
        return True

    # ABSTRACT METHOD
    @abstractmethod
    def hitung_denda(self, hari_telat: int) -> float:
        """Menghitung denda keterlambatan (berbeda tiap jenis item)."""

    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan detail lengkap item (berbeda tiap jenis item)."""

    def __str__(self) -> str:
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self._item_id}] {self._judul} ({self._tahun_terbit}) - {status}"


class Book(LibraryItem):
    """Buku: denda Rp 1.000 per hari."""
    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, tahun_terbit: int, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def hitung_denda(self, hari_telat: int) -> float:
        return max(0, hari_telat) * self.DENDA_PER_HARI

    def get_detail(self) -> str:
        return (f"BUKU | {self._judul} oleh {self._penulis} | "
                f"{self._jumlah_halaman} halaman | Terbit {self._tahun_terbit}")


class Magazine(LibraryItem):
    """Majalah: denda Rp 500 per hari."""
    DENDA_PER_HARI = 500

    def __init__(self, item_id: str, judul: str, tahun_terbit: int, edisi: str, penerbit: str):
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    def hitung_denda(self, hari_telat: int) -> float:
        return max(0, hari_telat) * self.DENDA_PER_HARI

    def get_detail(self) -> str:
        return (f"MAJALAH | {self._judul} edisi {self._edisi} | "
                f"Penerbit {self._penerbit} | Terbit {self._tahun_terbit}")
