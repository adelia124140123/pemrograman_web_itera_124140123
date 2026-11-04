"""Modul operasi matematika: geometri dan konversi suhu."""

PI = 3.14159


# ---------- Geometri ----------
def luas_persegi(sisi: float) -> float:
    """Luas persegi. Parameter: sisi. Return: sisi * sisi."""
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """Keliling persegi. Parameter: sisi. Return: 4 * sisi."""
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Luas persegi panjang. Parameter: panjang, lebar. Return: panjang * lebar."""
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Keliling persegi panjang. Parameter: panjang, lebar. Return: 2 * (panjang + lebar)."""
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """Luas lingkaran. Parameter: jari_jari. Return: PI * r^2."""
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari: float) -> float:
    """Keliling lingkaran. Parameter: jari_jari. Return: 2 * PI * r."""
    return 2 * PI * jari_jari


# ---------- Konversi suhu ----------
def celsius_ke_fahrenheit(celsius: float) -> float:
    """Konversi Celsius ke Fahrenheit. Return: C * 9/5 + 32."""
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Konversi Celsius ke Kelvin. Return: C + 273.15."""
    return celsius + 273.15
