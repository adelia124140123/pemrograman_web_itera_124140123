function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// ----------------------------
// Arrow Functions
// ----------------------------
export function demoArrowFunctions() {
  // Fungsi reguler
  function regularSum(a, b) {
    return a + b;
  }

  // Arrow function dasar
  const arrowSum = (a, b) => {
    return a + b;
  };

  // Arrow function dengan implicit return
  const shortArrowSum = (a, b) => a + b;

  // Arrow function tanpa parameter
  const sayHello = () => "Hello World!";

  // Arrow function dengan satu parameter (kurung opsional)
  const square = x => x * x;

  return {
    regularSum: regularSum(5, 3),
    arrowSum: arrowSum(5, 3),
    shortArrowSum: shortArrowSum(5, 3),
    sayHello: sayHello(),
    square: square(4)
  };
}
