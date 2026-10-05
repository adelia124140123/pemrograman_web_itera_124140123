//Fungsi bantu: ambil angka dari input (kosong = null)
function ambilAngka(idInput) {
  const teks = document.getElementById(idInput).value.trim();
  return teks === "" ? null : Number(teks);
}


//1. TABEL PERKALIAN 1 SAMPAI 10
function buatTabelPerkalian(angka) {
  let hasil = "";
  for (let i = 1; i <= 10; i++) {
    hasil += angka + " x " + i + " = " + (angka * i) + "\n";
  }
  return hasil;
}

//2. FAKTORIAL
function faktorial(n) {
  let hasil = 1n; // BigInt supaya hasil besar tetap akurat
  for (let i = 2; i <= n; i++) {
    hasil *= BigInt(i);
  }
  return hasil;
}

//3. BILANGAN PRIMA
function isPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

//4. BMI
function hitungBMI(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  return beratKg / (tinggiM * tinggiM);
}

function kategoriBMI(bmi) {
  if (bmi < 18.5) return "Kurus";
  else if (bmi < 25) return "Normal";
  else if (bmi < 30) return "Kelebihan berat badan";
  else return "Obesitas";
}

//5. FIZZBUZZ
function fizzBuzz(batas) {
  let hasil = "";
  for (let i = 1; i <= batas; i++) {
    if (i % 15 === 0) hasil += "FizzBuzz\n";
    else if (i % 3 === 0) hasil += "Fizz\n";
    else if (i % 5 === 0) hasil += "Buzz\n";
    else hasil += i + "\n";
  }
  return hasil;
}

//EVENT HANDLER (tombol)
//1. Tabel perkalian
document.getElementById("btn-kali").addEventListener("click", function () {
  const angka = ambilAngka("in-kali");
  const out = document.getElementById("out-kali");
  out.textContent = angka === null ? "Isi angka dulu." : buatTabelPerkalian(angka);
});

//2. Faktorial
document.getElementById("btn-faktorial").addEventListener("click", function () {
  const n = ambilAngka("in-faktorial");
  const out = document.getElementById("out-faktorial");

  if (n === null) {
    out.textContent = "Isi angka dulu.";
  } else if (!Number.isInteger(n) || n < 0) {
    out.textContent = "Faktorial hanya untuk bilangan bulat tidak negatif.";
  } else if (n > 100) {
    out.textContent = "Maksimal 100 agar hasil tidak terlalu panjang.";
  } else {
    out.textContent = n + "! = " + faktorial(n).toString();
  }
});

//3. Prima
document.getElementById("btn-prima").addEventListener("click", function () {
  const n = ambilAngka("in-prima");
  const out = document.getElementById("out-prima");

  if (n === null) {
    out.textContent = "Isi angka dulu.";
  } else if (!Number.isInteger(n)) {
    out.textContent = "Masukkan bilangan bulat.";
  } else {
    out.textContent = n + (isPrima(n) ? " adalah bilangan prima." : " bukan bilangan prima.");
  }
});

//4. BMI
document.getElementById("btn-bmi").addEventListener("click", function () {
  const berat = ambilAngka("in-berat");
  const tinggi = ambilAngka("in-tinggi");
  const out = document.getElementById("out-bmi");

  if (berat === null || tinggi === null) {
    out.textContent = "Isi berat dan tinggi dulu.";
  } else if (berat <= 0 || tinggi <= 0) {
    out.textContent = "Berat dan tinggi harus lebih dari 0.";
  } else {
    const bmi = hitungBMI(berat, tinggi);
    out.textContent = "BMI: " + bmi.toFixed(1) + " (" + kategoriBMI(bmi) + ")";
  }
});

//5. FizzBuzz
document.getElementById("btn-fizzbuzz").addEventListener("click", function () {
  document.getElementById("out-fizzbuzz").textContent = fizzBuzz(100);
});