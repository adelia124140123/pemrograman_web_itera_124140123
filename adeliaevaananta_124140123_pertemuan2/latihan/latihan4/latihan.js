function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

const data = [
  { kategori: "makanan", jumlah: 50000, lunas: true },
  { kategori: "transport", jumlah: 20000, lunas: true },
  { kategori: "makanan", jumlah: 75000, lunas: false },
  { kategori: "hiburan", jumlah: 120000, lunas: true }
];

// 1. groupBy dengan reduce
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => ((acc[item[key]] ||= []).push(item), acc), {});

// 2. Rata-rata array of objects
const rataRata = (arr, key) => arr.reduce((t, i) => t + i[key], 0) / arr.length;

// 3. Flatten array bersarang
const bersarang = [1, [2, 3], [[4, 5], 6]];

// 4. filter + map + reduce
const totalLunas = data.filter(d => d.lunas).map(d => d.jumlah).reduce((t, n) => t + n, 0);

addOutput("1. groupBy (reduce)", JSON.stringify(groupBy(data, "kategori"), null, 2));
addOutput("2. Rata-rata", `Rata-rata jumlah: ${rataRata(data, "jumlah")}`);
addOutput("3. Flatten", JSON.stringify(bersarang.flat(Infinity)));
addOutput("4. filter + map + reduce", `Total lunas: ${totalLunas}`);
