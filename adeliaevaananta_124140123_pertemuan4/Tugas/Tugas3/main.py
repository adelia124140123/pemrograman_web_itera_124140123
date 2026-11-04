# Cara impor 1: impor seluruh modul (dipanggil dengan awalan nama modul)
import math_operations

# Cara impor 2: impor fungsi/variabel spesifik langsung ke namespace
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI

print("=" * 45)
print("      PROGRAM PENGUJIAN MODUL MATH_OPERATIONS")
print("=" * 45)

print(f"\nKonstanta PI = {PI}")

print("\n--- PERSEGI (sisi = 5) ---")
print(f"Luas     : {math_operations.luas_persegi(5)}")
print(f"Keliling : {math_operations.keliling_persegi(5)}")

print("\n--- PERSEGI PANJANG (p = 8, l = 3) ---")
print(f"Luas     : {math_operations.luas_persegi_panjang(8, 3)}")
print(f"Keliling : {math_operations.keliling_persegi_panjang(8, 3)}")

print("\n--- LINGKARAN (r = 7) ---")
print(f"Luas     : {math_operations.luas_lingkaran(7):.2f}")
print(f"Keliling : {math_operations.keliling_lingkaran(7):.2f}")

print("\n--- KONVERSI SUHU (Celsius = 36.6) ---")
print(f"Fahrenheit : {celsius_ke_fahrenheit(36.6):.2f} °F")
print(f"Kelvin     : {celsius_ke_kelvin(36.6):.2f} K")
