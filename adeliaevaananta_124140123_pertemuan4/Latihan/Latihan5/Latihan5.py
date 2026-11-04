def validasi_password(password):
    """Return True jika panjang >= 8 dan mengandung minimal satu angka."""
    punya_angka = any(karakter.isdigit() for karakter in password)
    return len(password) >= 8 and punya_angka


# Uji coba
daftar_uji = ["adel123", "passwordinces", "rahasia123", "12345678", "Adel2024!"]

for pw in daftar_uji:
    status = "VALID" if validasi_password(pw) else "TIDAK VALID"
    print(f"{pw:<15} -> {status}")
