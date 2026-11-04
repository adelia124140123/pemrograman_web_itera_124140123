angka_rahasia = 7

print("=== GAME TEBAK ANGKA (1-10) ===")
while True:
    tebakan = int(input("Masukkan tebakanmu: "))

    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
