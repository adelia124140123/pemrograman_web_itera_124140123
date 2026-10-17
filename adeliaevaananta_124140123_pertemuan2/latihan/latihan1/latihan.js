function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// 1. Ubah nilai const -> error
let pesanError;
const MAX = 10;
try { MAX = 20; } catch (e) { pesanError = `${e.name}: ${e.message}`; }

// 2. var di dalam & luar block
var a = "var luar"; let b = "let luar";
{ var a = "var dalam"; let b = "let dalam"; }

// 3. Arrow function berbagai sintaks
const tambah = (x, y) => { return x + y; };
const kali = (x, y) => x * y;
const kuadrat = x => x * x;
const halo = () => "Halo!";
const buatUser = (nama, umur) => ({ nama, umur });

// 4. Template literals untuk HTML string
const buah = ["Apel", "Jeruk", "Mangga"];
const html = `<ul>${buah.map(f => `<li>${f}</li>`).join("")}</ul>`;

addOutput("1. Ubah const", pesanError);
addOutput("2. var vs let di block", [`var setelah blok: ${a}`, `let setelah blok: ${b}`]);
addOutput("3. Arrow Functions", [
  `tambah(2,3)=${tambah(2, 3)}`, `kali(4,5)=${kali(4, 5)}`,
  `kuadrat(6)=${kuadrat(6)}`, `halo()=${halo()}`,
  JSON.stringify(buatUser("Ani", 20))
]);
addOutput("4. HTML String", html);
