function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// 1 & 2. Class, inheritance, getter & setter
class Product {
  constructor(name, price) { this.name = name; this.price = price; }
  get price() { return this._price; }
  set price(v) {
    if (v < 0) throw new Error("Harga tidak boleh negatif");
    this._price = v;
  }
  info() { return `${this.name} - Rp${this.price.toLocaleString("id-ID")}`; }
}
class DigitalProduct extends Product {
  constructor(name, price, sizeMB) { super(name, price); this.sizeMB = sizeMB; }
  info() { return `${super.info()} (${this.sizeMB} MB)`; }
}
class PhysicalProduct extends Product {
  constructor(name, price, weight) { super(name, price); this.weight = weight; }
  info() { return `${super.info()} (${this.weight} kg)`; }
}

const ebook = new DigitalProduct("E-Book JS", 50000, 12);
const sepatu = new PhysicalProduct("Sepatu", 350000, 0.8);
sepatu.price = 400000; // setter
let setterErr;
try { sepatu.price = -1; } catch (e) { setterErr = e.message; }

// 3. Computed property names
const key = "produk";
const dinamis = { [`${key}_1`]: ebook.name, [`${key}_2`]: sepatu.name };

// 4. Default parameters + destructuring
const buat = ({ name = "Tanpa Nama", price = 0 } = {}) => new Product(name, price);

addOutput("1. Inheritance", [ebook.info(), sepatu.info()]);
addOutput("2. Getter & Setter", [`Harga baru: ${sepatu.price}`, `Setter menolak: ${setterErr}`]);
addOutput("3. Computed property", JSON.stringify(dinamis));
addOutput("4. Default param + destructuring", [buat().info(), buat({ name: "Meja", price: 900000 }).info()]);
