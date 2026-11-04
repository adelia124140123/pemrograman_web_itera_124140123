celsius = float(input("Masukkan suhu dalam Celsius: "))

fahrenheit = celsius * 9 / 5 + 32
kelvin = celsius + 273.15

print("\n--- HASIL KONVERSI SUHU ---")
print(f"Celsius    : {celsius:.2f} °C")
print(f"Fahrenheit : {fahrenheit:.2f} °F")
print(f"Kelvin     : {kelvin:.2f} K")
