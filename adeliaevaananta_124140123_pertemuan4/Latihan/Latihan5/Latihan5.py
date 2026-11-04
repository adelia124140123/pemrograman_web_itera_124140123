kontak = {}

def tambah_kontak(nama, nomor):
    kontak[nama] = nomor
    print(f"Kontak '{nama}' berhasil disimpan.")

def cari_kontak(nama):
    nomor = kontak.get(nama)
    if nomor:
        print(f"{nama} -> {nomor}")
    else:
        print(f"Kontak '{nama}' tidak ditemukan.")

def tampilkan_semua():
    if not kontak:
        print("Belum ada kontak tersimpan.")
        return
    print("\n--- DAFTAR KONTAK ---")
    for nama, nomor in kontak.items():
        print(f"{nama:<15}: {nomor}")


while True:
    print("\n=== KATALOG KONTAK ===")
    print("1. Tambah kontak")
    print("2. Cari kontak")
    print("3. Tampilkan semua kontak")
    print("4. Keluar")
    pilihan = input("Pilih menu (1-4): ")

    if pilihan == "1":
        nama = input("Nama  : ")
        nomor = input("Nomor : ")
        tambah_kontak(nama, nomor)
    elif pilihan == "2":
        cari_kontak(input("Cari nama: "))
    elif pilihan == "3":
        tampilkan_semua()
    elif pilihan == "4":
        print("Terimakasih, Jumpa Lagi!")
        break
    else:
        print("Pilihan tidak valid.")
