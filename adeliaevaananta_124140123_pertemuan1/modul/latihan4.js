//FUNGSI BANTU
//Membuat elemen dengan class dan teks
function buatEl(tag, kelas, teks) {
  const el = document.createElement(tag);
  if (kelas) el.className = kelas;
  if (teks !== undefined) el.textContent = teks;
  return el;
}

//Menampilkan atau menghapus pesan error pada satu input
function tampilkanError(input, pesanEl, pesan) {
  pesanEl.textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
}

//Membaca array dari localStorage dengan aman
function bacaStorage(kunci) {
  const data = localStorage.getItem(kunci);
  if (!data) return [];
  try {
    const hasil = JSON.parse(data);
    return Array.isArray(hasil) ? hasil : [];
  } catch (error) {
    return [];
  }
}

//DARK MODE (manipulasi class CSS)
const KEY_TEMA = "tema";
const btnTema = document.getElementById("btn-tema");

function terapkanTema(gelap) {
  document.body.classList.toggle("dark", gelap);
  btnTema.textContent = gelap ? "☀️ Mode Terang" : "🌙 Mode Gelap";
}

btnTema.addEventListener("click", function () {
  const gelap = !document.body.classList.contains("dark");
  terapkanTema(gelap);
  localStorage.setItem(KEY_TEMA, gelap ? "gelap" : "terang");
});

//FORM MAHASISWA + LOCALSTORAGE
const KEY_MHS = "mahasiswaData";
const PANJANG_NIM = 9;
let mahasiswa = [];

const formMhs = document.getElementById("form-mhs");
const inNama = document.getElementById("in-nama");
const inNim = document.getElementById("in-nim");
const inJurusan = document.getElementById("in-jurusan");
const inNilai = document.getElementById("in-nilai");
const tabelMhs = document.getElementById("tabel-mhs");

function simpanMahasiswa() {
  localStorage.setItem(KEY_MHS, JSON.stringify(mahasiswa));
}

function validasiMahasiswa() {
  let valid = true;

  const nama = inNama.value.trim();
  const nim = inNim.value.trim();
  const jurusan = inJurusan.value.trim();
  const nilaiStr = inNilai.value.trim();
  const nilai = Number(nilaiStr);

  //Nama
  if (nama.length < 3) {
    tampilkanError(inNama, document.getElementById("error-nama"), "Nama wajib diisi, minimal 3 karakter.");
    valid = false;
  } else {
    tampilkanError(inNama, document.getElementById("error-nama"), "");
  }

  //NIM: harus angka semua, panjang tertentu, dan tidak boleh kembar
  const nimKembar = mahasiswa.some(function (m) { return m.nim === nim; });
  if (nim.length !== PANJANG_NIM || !/^\d+$/.test(nim)) {
    tampilkanError(inNim, document.getElementById("error-nim"), "NIM harus berupa " + PANJANG_NIM + " digit angka.");
    valid = false;
  } else if (nimKembar) {
    tampilkanError(inNim, document.getElementById("error-nim"), "NIM sudah terdaftar.");
    valid = false;
  } else {
    tampilkanError(inNim, document.getElementById("error-nim"), "");
  }

  //Jurusan
  if (jurusan.length < 3) {
    tampilkanError(inJurusan, document.getElementById("error-jurusan"), "Jurusan wajib diisi, minimal 3 karakter.");
    valid = false;
  } else {
    tampilkanError(inJurusan, document.getElementById("error-jurusan"), "");
  }

  //Nilai
  if (nilaiStr === "" || isNaN(nilai) || nilai < 0 || nilai > 100) {
    tampilkanError(inNilai, document.getElementById("error-nilai"), "Nilai harus angka 0 sampai 100.");
    valid = false;
  } else {
    tampilkanError(inNilai, document.getElementById("error-nilai"), "");
  }

  return valid;
}

function tambahMahasiswa(event) {
  event.preventDefault();
  if (!validasiMahasiswa()) return;

  mahasiswa.push({
    id: Date.now(),
    nama: inNama.value.trim(),
    nim: inNim.value.trim(),
    jurusan: inJurusan.value.trim(),
    nilai: Number(inNilai.value)
  });

  simpanMahasiswa();
  formMhs.reset();
  inNama.focus();
  renderMahasiswa();
}

function hapusMahasiswa(id) {
  const data = mahasiswa.find(function (m) { return m.id === id; });
  if (!confirm("Hapus data " + data.nama + "?")) return;

  mahasiswa = mahasiswa.filter(function (m) { return m.id !== id; });
  simpanMahasiswa();
  renderMahasiswa();
}

function renderMahasiswa() {
  tabelMhs.innerHTML = "";

  if (mahasiswa.length === 0) {
    const tr = document.createElement("tr");
    const td = buatEl("td", "kosong", "Belum ada data mahasiswa.");
    td.colSpan = 6;
    tr.appendChild(td);
    tabelMhs.appendChild(tr);
    return;
  }

  mahasiswa.forEach(function (m, index) {
    const tr = document.createElement("tr");
    tr.appendChild(buatEl("td", "", index + 1));
    tr.appendChild(buatEl("td", "", m.nama));
    tr.appendChild(buatEl("td", "", m.nim));
    tr.appendChild(buatEl("td", "", m.jurusan));
    tr.appendChild(buatEl("td", "angka", m.nilai));

    const tdAksi = document.createElement("td");
    const btn = buatEl("button", "btn btn-hapus", "Hapus");
    btn.type = "button";
    btn.addEventListener("click", function () { hapusMahasiswa(m.id); });
    tdAksi.appendChild(btn);
    tr.appendChild(tdAksi);

    tabelMhs.appendChild(tr);
  });
}

formMhs.addEventListener("submit", tambahMahasiswa);

//DATA API + SEARCH + PAGINATION
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const PER_HALAMAN = 10;

let semuaPost = [];
let halaman = 1;
let kataCari = "";

const inCari = document.getElementById("in-cari");
const statusPost = document.getElementById("status-post");
const daftarPost = document.getElementById("daftar-post");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const infoHalaman = document.getElementById("info-halaman");

//Mengambil data dari API
async function muatPost() {
  statusPost.textContent = "Memuat data dari API...";
  try {
    const respons = await fetch(API_URL);
    if (!respons.ok) throw new Error("Status HTTP " + respons.status);
    semuaPost = await respons.json();
    statusPost.textContent = "";
    renderPost();
  } catch (error) {
    statusPost.textContent = "Gagal memuat data: " + error.message + ". Cek koneksi internet lalu refresh.";
    btnPrev.disabled = true;
    btnNext.disabled = true;
  }
}

//filter berdasarkan title
function ambilHasilCari() {
  const kata = kataCari.trim().toLowerCase();
  return semuaPost.filter(function (p) {
    return p.title.toLowerCase().includes(kata);
  });
}

function hitungTotalHalaman(jumlahData) {
  return Math.max(1, Math.ceil(jumlahData / PER_HALAMAN));
}

//tampilkan hanya data milik halaman aktif
function renderPost() {
  const hasil = ambilHasilCari();
  const total = hitungTotalHalaman(hasil.length);
  if (halaman > total) halaman = total;

  const awal = (halaman - 1) * PER_HALAMAN;
  const potongan = hasil.slice(awal, awal + PER_HALAMAN);

  daftarPost.innerHTML = "";

  if (potongan.length === 0) {
    daftarPost.appendChild(buatEl("p", "status", "Tidak ada post dengan title tersebut."));
  } else {
    potongan.forEach(function (p) {
      const kotak = buatEl("div", "post");
      kotak.appendChild(buatEl("h3", "", p.id + ". " + p.title));
      kotak.appendChild(buatEl("p", "", p.body));
      daftarPost.appendChild(kotak);
    });
  }

  infoHalaman.textContent = "Halaman " + halaman + " dari " + total + " (" + hasil.length + " post)";
  btnPrev.disabled = halaman <= 1;
  btnNext.disabled = halaman >= total;
}

inCari.addEventListener("input", function () {
  kataCari = inCari.value;
  halaman = 1; // hasil pencarian selalu mulai dari halaman 1
  renderPost();
});

btnPrev.addEventListener("click", function () {
  if (halaman > 1) {
    halaman--;
    renderPost();
  }
});

btnNext.addEventListener("click", function () {
  const total = hitungTotalHalaman(ambilHasilCari().length);
  if (halaman < total) {
    halaman++;
    renderPost();
  }
});

//TODO LIST (DOM + LOCALSTORAGE)
const KEY_TODO = "todoData";
let todos = [];

const formTodo = document.getElementById("form-todo");
const inTodo = document.getElementById("in-todo");
const errorTodo = document.getElementById("error-todo");
const daftarTodo = document.getElementById("daftar-todo");
const infoTodo = document.getElementById("info-todo");

function simpanTodo() {
  localStorage.setItem(KEY_TODO, JSON.stringify(todos));
}

function tambahTodo(event) {
  event.preventDefault();
  const teks = inTodo.value.trim();

  if (teks.length < 3) {
    tampilkanError(inTodo, errorTodo, "Tugas wajib diisi, minimal 3 karakter.");
    return;
  }
  tampilkanError(inTodo, errorTodo, "");

  todos.push({ id: Date.now(), teks: teks, selesai: false });
  simpanTodo();
  inTodo.value = "";
  inTodo.focus();
  renderTodo();
}

function tandaiSelesai(id) {
  const todo = todos.find(function (t) { return t.id === id; });
  todo.selesai = !todo.selesai;
  simpanTodo();
  renderTodo();
}

function hapusTodo(id) {
  todos = todos.filter(function (t) { return t.id !== id; });
  simpanTodo();
  renderTodo();
}

function renderTodo() {
  daftarTodo.innerHTML = "";

  const jumlahSelesai = todos.filter(function (t) { return t.selesai; }).length;
  infoTodo.textContent = todos.length === 0 ? "" : jumlahSelesai + " dari " + todos.length + " tugas selesai.";

  if (todos.length === 0) {
    daftarTodo.appendChild(buatEl("li", "todo-kosong", "Belum ada tugas. Tambahkan satu di atas."));
    return;
  }

  todos.forEach(function (t) {
    const li = buatEl("li", t.selesai ? "item-todo selesai" : "item-todo");

    const cek = document.createElement("input");
    cek.type = "checkbox";
    cek.checked = t.selesai;
    cek.addEventListener("change", function () { tandaiSelesai(t.id); });

    const teks = buatEl("span", "teks", t.teks);

    const btnSelesai = buatEl("button", "btn btn-selesai", t.selesai ? "Batal" : "Selesai");
    btnSelesai.type = "button";
    btnSelesai.addEventListener("click", function () { tandaiSelesai(t.id); });

    const btnHapus = buatEl("button", "btn btn-hapus", "Hapus");
    btnHapus.type = "button";
    btnHapus.addEventListener("click", function () { hapusTodo(t.id); });

    li.appendChild(cek);
    li.appendChild(teks);
    li.appendChild(btnSelesai);
    li.appendChild(btnHapus);
    daftarTodo.appendChild(li);
  });
}

formTodo.addEventListener("submit", tambahTodo);

//INISIALISASI
terapkanTema(localStorage.getItem(KEY_TEMA) === "gelap");

mahasiswa = bacaStorage(KEY_MHS);
renderMahasiswa();

todos = bacaStorage(KEY_TODO);
renderTodo();

muatPost();