# Data profil
nama = "Adelia Eva Ananta"
nim = "124140123"
angkatan = 2024
minat = "UI/UX Design & Civic Tech"

# Bagian 1: cetak profil dengan sep
print("=== DATA PROFIL ===")
print("Nama", nama, sep=" | ")
print("NIM", nim, sep=" | ")
print("Angkatan", angkatan, sep=" | ")
print("Minat Penelitian", minat, sep=" | ")

# Bagian 2: kartu identitas berbingkai pagar (#) dengan escape character
print("\n" + "#" * 44)
print("#\tKARTU IDENTITAS MAHASISWA" + "\t   #")
print("#" * 44)
print(f"#  Nama     : {nama}")
print(f"#  NIM      : {nim}")
print(f"#  Angkatan : {angkatan}")
print(f"#  Minat    : {minat}")
print("#" * 44)
