function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

const name = "John", age = 30;

const lama = "Nama saya " + name + " dan umur saya " + age + " tahun.";
const baru = `Nama saya ${name} dan umur saya ${age} tahun.`;
const multi = `Baris 1
Baris 2 (Nama: ${name})`;
const ekspresi = `Tahun lahir: ${new Date().getFullYear() - age}`;

addOutput("Template Literals", [
  `Cara lama: ${lama}`,
  `Cara baru: ${baru}`,
  `Ekspresi: ${ekspresi}`,
  `Multi-baris:\n${multi}`
]);
