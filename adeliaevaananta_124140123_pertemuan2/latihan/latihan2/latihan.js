function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// 1. Nested destructuring 3+ level
const data = { perusahaan: { kantor: { alamat: { kota: "Bandar Lampung" } } } };
const { perusahaan: { kantor: { alamat: { kota } } } } = data;

// 2. Rest parameters -> statistik
const statistik = (...n) => ({
  min: Math.min(...n),
  max: Math.max(...n),
  average: n.reduce((t, x) => t + x, 0) / n.length
});

// 3. Merge 3 object + override
const o1 = { nama: "John", umur: 25 };
const o2 = { umur: 26, kota: "Jakarta" };
const o3 = { kota: "Bandung" };
const gabungan = { ...o1, ...o2, ...o3, aktif: true };

// 4. Destructuring di for...of
const baris = [];
for (const { id, nama } of [{ id: 1, nama: "Adel" }, { id: 2, nama: "Dewangga" }]) {
  baris.push(`#${id} ${nama}`);
}

addOutput("1. Nested destructuring", `kota = ${kota}`);
addOutput("2. Rest parameters", JSON.stringify(statistik(4, 8, 15, 16, 23, 42)));
addOutput("3. Merge 3 object", JSON.stringify(gabungan));
addOutput("4. for...of + destructuring", baris);
