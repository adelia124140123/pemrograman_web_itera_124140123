function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// Let & Const
var a = "lama";
{ var a = "tertimpa"; }        // var bocor keluar blok
let b = "asli";
{ let b = "di dalam blok"; }   // let terpisah
const user = { name: "John", age: 30 };
user.age = 31;                 // isi objek const boleh diubah

addOutput("Let dan Const", [
  `var: ${a}`,
  `let: ${b}`,
  `const object: ${JSON.stringify(user)}`
]);

// Arrow Functions
function regularSum(x, y) { return x + y; }
const arrowSum = (x, y) => { return x + y; };
const shortSum = (x, y) => x + y;
const kuadrat = x => x * x;
const halo = () => "Hello World!";
const buatUser = (name, age) => ({ name, age });

addOutput("Arrow Functions", [
  `regular: ${regularSum(5, 3)}`,
  `arrow: ${arrowSum(5, 3)}`,
  `short arrow: ${shortSum(5, 3)}`,
  `kuadrat(4): ${kuadrat(4)}`,
  `halo(): ${halo()}`,
  `buatUser: ${JSON.stringify(buatUser("Ani", 20))}`
]);
