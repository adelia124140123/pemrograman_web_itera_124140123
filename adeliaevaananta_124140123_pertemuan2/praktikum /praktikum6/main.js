function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

const nums = [1, 2, 3, 4, 5, 6];
const users = [
  { name: "John", age: 25, active: true },
  { name: "Jane", age: 30, active: false },
  { name: "Bob", age: 22, active: true },
  { name: "Alice", age: 28, active: true }
];

addOutput("Map, Filter, Find", [
  `map x2: ${JSON.stringify(nums.map(n => n * 2))}`,
  `filter genap: ${JSON.stringify(nums.filter(n => n % 2 === 0))}`,
  `find Jane: ${JSON.stringify(users.find(u => u.name === "Jane"))}`
]);

addOutput("Reduce, Some, Every", [
  `reduce total: ${nums.reduce((t, n) => t + n, 0)}`,
  `some (ada < 18): ${users.some(u => u.age < 18)}`,
  `every (semua >= 18): ${users.every(u => u.age >= 18)}`
]);

addOutput("Chaining & Array Lanjutan", [
  `Nama aktif > 25: ${users.filter(u => u.active).filter(u => u.age > 25).map(u => u.name)}`,
  `Total umur aktif: ${users.filter(u => u.active).reduce((s, u) => s + u.age, 0)}`,
  `flat(2): ${JSON.stringify([1, [2, [3, 4]]].flat(2))}`,
  `Array.from("hi"): ${JSON.stringify(Array.from("hi"))}`,
  `includes(3): ${nums.includes(3)}`
]);
