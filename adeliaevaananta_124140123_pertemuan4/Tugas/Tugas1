def hitung_bmi(berat: float, tinggi: float) -> float:
    """Menghitung BMI. berat dalam kg, tinggi dalam meter. Mengembalikan nilai BMI (float)."""
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi: float) -> str:
    """Menentukan kategori berat badan dari nilai BMI. Mengembalikan teks kategori."""
    if bmi < 18.5:
        return "Berat badan kamu kurang"
    elif bmi < 25:
        return "Berat badan kamu normal"
    elif bmi < 30:
        return "Berat badan kamu berlebih"
    else:
        return "Obesitas"


def main():
    print("=== APLIKASI PENGHITUNG BMI ===")
    try:
        berat = float(input("Masukkan berat badan (kg)  : "))
        tinggi = float(input("Masukkan tinggi badan (m)  : "))
    except ValueError:
        print("Mohon untuk menginputkan angka!")
        return

    if berat <= 0 or tinggi <= 0:
        print("Berat dan tinggi harus lebih dari 0!")
        return

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print("\n--- HASIL ---")
    print(f"Berat badan : {berat} kg")
    print(f"Tinggi badan: {tinggi} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
