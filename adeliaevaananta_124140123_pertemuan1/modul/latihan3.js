// DATA AWAL: array berisi objek mahasiswa
let mahasiswa = [
  { id: 1, nama: "Salsabilla Afra Gunas",   nim: "124140069", jurusan: "Teknik Informatika", nilai: 85 },
  { id: 2, nama: "Bela Citra",  nim: "124140051", jurusan: "Teknik Informatika",   nilai: 92 },
  { id: 3, nama: "Tarisa Menova", nim: "124140039", jurusan: "Teknik Informatika", nilai: 70 },
  { id: 4, nama: "Cania Febriyanti",   nim: "124140153", jurusan: "Teknik Informatika",     nilai: 64 },
  { id: 5, nama: "Divania Munthe", nim: "124140027", jurusan: "Teknik Informatika",   nilai: 78 }
];

//State
let idBerikutnya = 6;        
let idSedangDiedit = null;   
let urutan = null;           
let hanyaDiAtasRata = false; 

//Referensi elemen
const formMhs = document.getElementById("form-mhs");
const inNama = document.getElementById("in-nama");
const inNim = document.getElementById("in-nim");
const inJurusan = document.getElementById("in-jurusan");
const inNilai = document.getElementById("in-nilai");
const btnSimpan = document.getElementById("btn-simpan");
const btnBatal = document.getElementById("btn-batal");
const judulForm = document.getElementById("judul-form");
const pesanError = document.getElementById("pesan-error");
const tabelMhs = document.getElementById("tabel-mhs");

//FUNGSI LOGIKA (method array)
//Rata-rata nilai
function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  const total = daftar.reduce(function (jumlah, m) {
    return jumlah + m.nilai;
  }, 0);
  return total / daftar.length;
}

//Mahasiswa nilai tertinggi
function cariTertinggi(daftar) {
  if (daftar.length === 0) return null;
  return daftar.reduce(function (maks, m) {
    return m.nilai > maks.nilai ? m : maks;
  });
}

//Filter
function filterDiAtasRata(daftar) {
  const rata = hitungRataRata(daftar);
  return daftar.filter(function (m) {
    return m.nilai > rata;
  });
}

//Urutkan berdasarkan nama.
function urutkanNama(daftar, arah) {
  return [...daftar].sort(function (a, b) {
    const hasil = a.nama.localeCompare(b.nama, "id");
    return arah === "asc" ? hasil : -hasil;
  });
}

//Tentukan data yang akan ditampilkan, sesuai filter dan urutan aktif
function ambilDataTampil() {
  let data = mahasiswa;
  if (hanyaDiAtasRata) data = filterDiAtasRata(data);
  if (urutan !== null) data = urutkanNama(data, urutan);
  return data;
}

// RENDER (READ)
function buatSel(teks, kelas) {
  const td = document.createElement("td");
  td.textContent = teks;
  if (kelas) td.className = kelas;
  return td;
}

function buatTombol(label, kelas, aksi) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  if (kelas) btn.className = kelas;
  btn.addEventListener("click", aksi);
  return btn;
}

function renderTabel() {
  const data = ambilDataTampil();
  tabelMhs.innerHTML = "";

  if (data.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.className = "kosong";
    td.textContent = "Tidak ada data untuk ditampilkan.";
    tr.appendChild(td);
    tabelMhs.appendChild(tr);
    return;
  }

  data.forEach(function (m, index) {
    const tr = document.createElement("tr");
    tr.appendChild(buatSel(index + 1));
    tr.appendChild(buatSel(m.nama));
    tr.appendChild(buatSel(m.nim));
    tr.appendChild(buatSel(m.jurusan));
    tr.appendChild(buatSel(m.nilai, "angka"));

    const tdAksi = document.createElement("td");
    tdAksi.className = "aksi";
    tdAksi.appendChild(buatTombol("Edit", "", function () { mulaiEdit(m.id); }));
    tdAksi.appendChild(buatTombol("Hapus", "bahaya", function () { hapusMahasiswa(m.id); }));
    tr.appendChild(tdAksi);

    tabelMhs.appendChild(tr);
  });
}

function renderRingkasan() {
  const tertinggi = cariTertinggi(mahasiswa);
  document.getElementById("info-jumlah").textContent = mahasiswa.length;
  document.getElementById("info-rata").textContent = hitungRataRata(mahasiswa).toFixed(1);
  document.getElementById("info-tertinggi").textContent = tertinggi
    ? tertinggi.nama + " (" + tertinggi.nilai + ")"
    : "-";
}

function renderTombolAktif() {
  document.getElementById("btn-asc").classList.toggle("aktif", urutan === "asc");
  document.getElementById("btn-desc").classList.toggle("aktif", urutan === "desc");
  document.getElementById("btn-filter").classList.toggle("aktif", hanyaDiAtasRata);
}

function render() {
  renderTabel();
  renderRingkasan();
  renderTombolAktif();
}

//CREATE, UPDATE, DELETE
//Validasi input; mengembalikan teks error atau "" jika valid
function validasi(nama, nim, jurusan, nilaiStr) {
  if (nama.length < 3) return "Nama wajib diisi, minimal 3 karakter.";
  if (nim === "") return "NIM wajib diisi.";

  //NIM harus unik (data yang sedang diedit tidak dihitung)
  const kembar = mahasiswa.some(function (m) {
    return m.nim === nim && m.id !== idSedangDiedit;
  });
  if (kembar) return "NIM sudah dipakai mahasiswa lain.";

  if (jurusan === "") return "Jurusan wajib diisi.";

  const nilai = Number(nilaiStr);
  if (nilaiStr === "" || isNaN(nilai) || nilai < 0 || nilai > 100) {
    return "Nilai harus angka antara 0 sampai 100.";
  }
  return "";
}

function kosongkanForm() {
  formMhs.reset();
  idSedangDiedit = null;
  judulForm.textContent = "Tambah Mahasiswa";
  btnSimpan.textContent = "Tambah";
  btnBatal.hidden = true;
  pesanError.textContent = "";
}

//Dipanggil saat form di-submit: Create atau Update, tergantung mode
function simpanMahasiswa(event) {
  event.preventDefault();

  const nama = inNama.value.trim();
  const nim = inNim.value.trim();
  const jurusan = inJurusan.value.trim();
  const nilaiStr = inNilai.value.trim();

  const error = validasi(nama, nim, jurusan, nilaiStr);
  if (error !== "") {
    pesanError.textContent = error;
    return;
  }

  const nilai = Number(nilaiStr);

  if (idSedangDiedit === null) {
    // CREATE
    mahasiswa.push({ id: idBerikutnya++, nama: nama, nim: nim, jurusan: jurusan, nilai: nilai });
  } else {
    // UPDATE
    const data = mahasiswa.find(function (m) { return m.id === idSedangDiedit; });
    data.nama = nama;
    data.nim = nim;
    data.jurusan = jurusan;
    data.nilai = nilai;
  }

  kosongkanForm();
  render();
}

//Mengisi form dengan data yang mau diedit
function mulaiEdit(id) {
  const data = mahasiswa.find(function (m) { return m.id === id; });
  inNama.value = data.nama;
  inNim.value = data.nim;
  inJurusan.value = data.jurusan;
  inNilai.value = data.nilai;

  idSedangDiedit = id;
  judulForm.textContent = "Edit Mahasiswa";
  btnSimpan.textContent = "Simpan Perubahan";
  btnBatal.hidden = false;
  pesanError.textContent = "";
  inNama.focus();
}

//DELETE
function hapusMahasiswa(id) {
  const data = mahasiswa.find(function (m) { return m.id === id; });
  if (!confirm("Hapus data " + data.nama + "?")) return;

  mahasiswa = mahasiswa.filter(function (m) { return m.id !== id; });
  if (idSedangDiedit === id) kosongkanForm();
  render();
}

// EVENT HANDLER
formMhs.addEventListener("submit", simpanMahasiswa);
btnBatal.addEventListener("click", kosongkanForm);

document.getElementById("btn-asc").addEventListener("click", function () {
  urutan = "asc";
  render();
});

document.getElementById("btn-desc").addEventListener("click", function () {
  urutan = "desc";
  render();
});

document.getElementById("btn-filter").addEventListener("click", function () {
  hanyaDiAtasRata = true;
  render();
});

document.getElementById("btn-tampil-semua").addEventListener("click", function () {
  hanyaDiAtasRata = false;
  urutan = null;
  render();
});

//Tampilan pertama kali
render();