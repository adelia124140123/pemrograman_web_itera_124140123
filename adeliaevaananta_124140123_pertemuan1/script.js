//Konstanta
const STORAGE_KEY = "miniPosKeranjang";
const MIN_HARGA = 500;
const MIN_BELANJA_DISKON = 50000;
const PERSEN_DISKON = 0.1;
const KODE_PROMO = "HEMAT10";

//State
let keranjang = [];

//Referensi elemen DOM
const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputQty = document.getElementById("qty");
const tabelKeranjang = document.getElementById("tabel-keranjang");
const elTotalBelanja = document.getElementById("total-belanja");
const inputPromo = document.getElementById("kode-promo");
const elInfoDiskon = document.getElementById("info-diskon");
const elNominalDiskon = document.getElementById("nominal-diskon");
const elTotalAkhir = document.getElementById("total-akhir");
const inputUangBayar = document.getElementById("uang-bayar");
const elKembalian = document.getElementById("kembalian");
const elStatusBayar = document.getElementById("status-bayar");
const btnReset = document.getElementById("btn-reset");

//Utilitas
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

//LocalStorage
function simpanKeranjang() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

function muatKeranjang() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    keranjang = [];
    return;
  }
  try {
    const hasil = JSON.parse(data);
    keranjang = Array.isArray(hasil) ? hasil : [];
  } catch (error) {
    keranjang = [];
  }
}

//Validasi
function tampilkanError(input, pesanEl, pesan) {
  pesanEl.textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
}

function validasiForm() {
  let valid = true;

  const nama = inputNama.value.trim();
  const hargaStr = inputHarga.value.trim();
  const qtyStr = inputQty.value.trim();
  const harga = Number(hargaStr);
  const qty = Number(qtyStr);

  //Nama
  if (nama.length < 3) {
    tampilkanError(inputNama, document.getElementById("error-nama"),
      "Nama barang wajib diisi, minimal 3 karakter.");
    valid = false;
  } else {
    tampilkanError(inputNama, document.getElementById("error-nama"), "");
  }

  //Harga
  if (hargaStr === "" || isNaN(harga) || harga < MIN_HARGA) {
    tampilkanError(inputHarga, document.getElementById("error-harga"),
      "Harga wajib angka dan minimal Rp 500.");
    valid = false;
  } else {
    tampilkanError(inputHarga, document.getElementById("error-harga"), "");
  }

  //Qty
  if (qtyStr === "" || !Number.isInteger(qty) || qty < 1) {
    tampilkanError(inputQty, document.getElementById("error-qty"),
      "Jumlah wajib bilangan bulat minimal 1.");
    valid = false;
  } else {
    tampilkanError(inputQty, document.getElementById("error-qty"), "");
  }

  return valid;
}

//Keranjang
function tambahBarang(event) {
  event.preventDefault();
  if (!validasiForm()) return;

  keranjang.push({
    id: Date.now(),
    nama: inputNama.value.trim(),
    harga: Number(inputHarga.value),
    qty: Number(inputQty.value)
  });

  simpanKeranjang();
  formBarang.reset();
  inputNama.focus();
  render();
}

function hapusBarang(id) {
  keranjang = keranjang.filter(function (item) { return item.id !== id; });
  simpanKeranjang();
  render();
}

function resetTransaksi() {
  keranjang = [];
  localStorage.removeItem(STORAGE_KEY);
  formBarang.reset();
  inputPromo.value = "";
  inputUangBayar.value = "";
  [inputNama, inputHarga, inputQty].forEach(function (el) { el.classList.remove("invalid"); });
  ["error-nama", "error-harga", "error-qty"].forEach(function (id) {
    document.getElementById(id).textContent = "";
  });
  render();
}

//Render tabel
function buatSel(teks, kelas) {
  const td = document.createElement("td");
  td.textContent = teks;
  if (kelas) td.className = kelas;
  return td;
}

function renderTabel() {
  tabelKeranjang.innerHTML = "";

  if (keranjang.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.className = "kosong";

    const wrap = document.createElement("div");
    wrap.className = "empty-state-wrap";
    [
      ["span", "empty-icon", "🛒"],
      ["p", "empty-title", "Keranjang Belanja Masih Kosong"],
      ["p", "empty-subtitle", "Masukkan nama, harga, dan jumlah barang pada form di sebelah kiri."]
    ].forEach(function (x) {
      const el = document.createElement(x[0]);
      el.className = x[1];
      el.textContent = x[2];
      wrap.appendChild(el);
    });

    td.appendChild(wrap);
    tr.appendChild(td);
    tabelKeranjang.appendChild(tr);
    return;
  }

  keranjang.forEach(function (item, index) {
    const tr = document.createElement("tr");
    tr.appendChild(buatSel(index + 1));
    tr.appendChild(buatSel(item.nama));
    tr.appendChild(buatSel(formatRupiah(item.harga), "angka"));
    tr.appendChild(buatSel(item.qty, "angka"));
    tr.appendChild(buatSel(formatRupiah(item.harga * item.qty), "angka"));

    const tdAksi = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-hapus";
    btn.textContent = "Hapus";
    btn.addEventListener("click", function () { hapusBarang(item.id); });
    tdAksi.appendChild(btn);
    tr.appendChild(tdAksi);

    tabelKeranjang.appendChild(tr);
  });
}

//Kalkulator
function hitungTotalBelanja() {
  return keranjang.reduce(function (total, item) {
    return total + item.harga * item.qty;
  }, 0);
}

function hitungDiskon(total) {
  const kode = inputPromo.value.trim().toUpperCase();
  const pakaiKode = kode === KODE_PROMO;
  const memenuhiMinimal = total >= MIN_BELANJA_DISKON;

  if (total > 0 && memenuhiMinimal) {
    elInfoDiskon.textContent = "Diskon 10% otomatis (belanja minimal Rp 50.000).";
    return total * PERSEN_DISKON;
  }
  if (total > 0 && pakaiKode) {
    elInfoDiskon.textContent = "Kode HEMAT10 berhasil dipakai, diskon 10%.";
    return total * PERSEN_DISKON;
  }
  if (kode !== "" && !pakaiKode) {
    elInfoDiskon.textContent = "Kode promo tidak valid.";
  } else {
    elInfoDiskon.textContent = "";
  }
  return 0;
}

function hitungKembalian(totalAkhir) {
  const bayarStr = inputUangBayar.value.trim();
  elStatusBayar.className = "status";

  if (totalAkhir === 0) {
    elKembalian.textContent = "-";
    elStatusBayar.textContent = "";
    return;
  }
  if (bayarStr === "") {
    elKembalian.textContent = "-";
    elStatusBayar.textContent = "Masukkan nominal uang bayar.";
    return;
  }

  const bayar = Number(bayarStr);
  if (isNaN(bayar) || bayar < totalAkhir) {
    elKembalian.textContent = "-";
    elStatusBayar.textContent = "Uang belum mencukupi.";
    elStatusBayar.classList.add("kurang");
  } else {
    elKembalian.textContent = formatRupiah(bayar - totalAkhir);
    elStatusBayar.textContent = "Pembayaran mencukupi.";
    elStatusBayar.classList.add("ok");
  }
}

function renderRingkasan() {
  const total = hitungTotalBelanja();
  const diskon = hitungDiskon(total);
  const totalAkhir = total - diskon;

  elTotalBelanja.textContent = formatRupiah(total);
  elNominalDiskon.textContent = formatRupiah(diskon);
  elTotalAkhir.textContent = formatRupiah(totalAkhir);
  hitungKembalian(totalAkhir);
}

function render() {
  renderTabel();
  renderRingkasan();
}

//Event listener & inisialisasi
formBarang.addEventListener("submit", tambahBarang);
inputPromo.addEventListener("input", renderRingkasan);
inputUangBayar.addEventListener("input", renderRingkasan);
btnReset.addEventListener("click", resetTransaksi);

//Menu favorit cepat: hanya mengisi form, tetap lewat validasi
document.querySelectorAll(".preset-chip").forEach(function (chip) {
  chip.addEventListener("click", function () {
    inputNama.value = chip.dataset.nama;
    inputHarga.value = chip.dataset.harga;
    inputQty.value = 1;
    inputQty.focus();
  });
});

muatKeranjang();
render();
