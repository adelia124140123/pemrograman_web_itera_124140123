//Fungsi bantu: tampil di console DAN di halaman
function cetak(teks) {
  console.log(teks);
  document.getElementById("output").textContent += teks + "\n";
}

//1. Variabel data diri (const dan let)
const nama = "Adelia";
let umur = 20;
const kotaAsal = "Lampung Timur";

cetak("=== 1. DATA DIRI ===");
cetak("Nama      : " + nama);
cetak("Umur      : " + umur);
cetak("Kota Asal : " + kotaAsal);
cetak("");

//2. Pengecekan kelulusan (nilai >= 70)
let nilai = 75;

cetak("2. CEK KELULUSAN");
if (nilai >= 70) {
  cetak("Nilai " + nilai + ": LULUS");
} else {
  cetak("Nilai " + nilai + ": TIDAK LULUS");
}
cetak("");

//3. Kategori umur
function kategoriUmur(usia) {
  if (usia < 0) {
    return "Umur tidak valid";
  } else if (usia < 12) {
    return "Anak";
  } else if (usia <= 17) {
    return "Remaja";
  } else if (usia <= 59) {
    return "Dewasa";
  } else {
    return "Lansia";
  }
}

cetak("3. KATEGORI UMUR");
cetak("Umurku (" + umur + ") termasuk: " + kategoriUmur(umur));
cetak("Uji 8 tahun  : " + kategoriUmur(8));
cetak("Uji 15 tahun : " + kategoriUmur(15));
cetak("Uji 30 tahun : " + kategoriUmur(30));
cetak("Uji 65 tahun : " + kategoriUmur(65));
cetak("");

//4. Switch-case: angka hari (1-7) ke nama hari 
function namaHari(angka) {
  let hari;
  switch (angka) {
    case 1:
      hari = "Monday";
      break;
    case 2:
      hari = "Tuesday";
      break;
    case 3:
      hari = "Wednesday";
      break;
    case 4:
      hari = "Thursday";
      break;
    case 5:
      hari = "Friday";
      break;
    case 6:
      hari = "Saturday";
      break;
    case 7:
      hari = "Sunday";
      break;
    default:
      hari = "Angka tidak valid (harus 1-7)";
  }
  return hari;
}

cetak("4. KONVERSI HARI");
cetak("Hari ke-1 : " + namaHari(1));
cetak("Hari ke-5 : " + namaHari(5));
cetak("Hari ke-7 : " + namaHari(7));
cetak("Hari ke-9 : " + namaHari(9));
cetak("");

//5. Kalkulator grade dengan ternary operator
function hitungGrade(skor) {
  return skor > 100 || skor < 0 ? "Nilai tidak valid"
    : skor >= 90 ? "A"
    : skor >= 80 ? "B"
    : skor >= 70 ? "C"
    : skor >= 60 ? "D"
    : "E";
}

cetak("=== 5. KALKULATOR GRADE ===");
cetak("Nilai 95  : Grade " + hitungGrade(95));
cetak("Nilai 85  : Grade " + hitungGrade(85));
cetak("Nilai 75  : Grade " + hitungGrade(75));
cetak("Nilai 65  : Grade " + hitungGrade(65));
cetak("Nilai 40  : Grade " + hitungGrade(40));
cetak("Nilai 120 : " + hitungGrade(120));