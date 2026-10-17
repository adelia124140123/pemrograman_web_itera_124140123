function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

// Default Parameters
const greet = (name = "Guest", greeting = "Hello") => `${greeting}, ${name}!`;

// Classes & Inheritance
class User {
  constructor(name, email) { this.name = name; this.email = email; }
  getInfo() { return `${this.name} (${this.email})`; }
}
class Admin extends User {
  constructor(name, email, role = "admin") { super(name, email); this.role = role; }
  getInfo() { return `${super.getInfo()} - ${this.role}`; }
}
const user = new User("John", "john@example.com");
const admin = new Admin("Admin", "admin@example.com");

// Enhanced Object Literals
const name = "John", age = 30, prefix = "skill";
const obj = {
  name, age,                         // property shorthand
  sayHello() { return "Hello!"; },   // method shorthand
  [`${prefix}_1`]: "JavaScript"      // computed property
};

addOutput("Default Parameters", [greet(), greet("John", "Hi")]);
addOutput("Classes", [
  user.getInfo(),
  admin.getInfo(),
  `admin instanceof User: ${admin instanceof User}`
]);
addOutput("Enhanced Object Literals", [
  JSON.stringify(obj),
  `sayHello(): ${obj.sayHello()}`
]);
