function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// Destructuring
const person = {
  firstName: "John", lastName: "Doe",
  address: { city: "Jakarta", postalCode: "12345" }
};
const { firstName, lastName: lName, hobby = "coding" } = person;
const { address: { city } } = person;

const colors = ["red", "green", "blue", "yellow"];
const [first, , third, ...rest] = colors;

let x = 1, y = 2;
[x, y] = [y, x]; // swap

addOutput("Destructuring", [
  `Object: ${firstName} ${lName}, hobi default: ${hobby}, kota: ${city}`,
  `Array: ${first}, ${third}, rest = ${JSON.stringify(rest)}`,
  `Swap: x=${x}, y=${y}`
]);

// Spread & Rest
const arr = [1, 2, 3];
const merged = [...arr, 4, 5];
const emp = { name: "John", age: 30, ...{ age: 31, company: "Tech Co" } };
const sum = (...nums) => nums.reduce((t, n) => t + n, 0);

addOutput("Spread & Rest", [
  `Spread array: ${JSON.stringify(merged)}`,
  `Spread object: ${JSON.stringify(emp)}`,
  `Rest sum(1..5): ${sum(1, 2, 3, 4, 5)}`
]);
