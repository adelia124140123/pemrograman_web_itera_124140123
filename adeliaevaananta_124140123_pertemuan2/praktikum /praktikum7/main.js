function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

const fetchUser = (id) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (id > 0 ? resolve({ id, name: `User ${id}` }) : reject(new Error("ID tidak valid"))), 500));

async function jalankan() {
  // Promise .then/.catch
  await fetchUser(1).then(u => addOutput("Promise", `Sukses: ${u.name}`));

  // Promise.all (paralel)
  const semua = await Promise.all([fetchUser(2), fetchUser(3), fetchUser(4)]);
  addOutput("Promise.all", semua.map(u => u.name).join(", "));

  // Promise.race
  const juara = await Promise.race([
    fetchUser(5),
    new Promise(r => setTimeout(r, 2000, { name: "Timeout" }))
  ]);
  addOutput("Promise.race", `Pemenang: ${juara.name}`);

  // async/await + try/catch
  try {
    await fetchUser(-1);
  } catch (err) {
    addOutput("async/await + try/catch", `Error tertangkap: ${err.message}`);
  }
}

jalankan();
