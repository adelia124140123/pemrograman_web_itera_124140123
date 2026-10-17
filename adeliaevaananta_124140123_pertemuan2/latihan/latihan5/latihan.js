function addOutput(title, lines) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow";
  card.innerHTML = `<h4 class="font-bold text-blue-600 mb-2"></h4>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs whitespace-pre-wrap"></pre>`;
  card.querySelector("h4").textContent = title;
  card.querySelector("pre").textContent = [].concat(lines).join("\n");
  document.getElementById("output").appendChild(card);
}

const $ = (id) => document.getElementById(id);
const API = "https://jsonplaceholder.typicode.com";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const getJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// Retry dengan exponential backoff
async function retry(fn, retries = 3, delay = 300) {
  for (let i = 0; ; i++) {
    try { return await fn(i); }
    catch (err) {
      if (i >= retries) throw err;
      await sleep(delay * 2 ** i); // 300, 600, 1200 ms
    }
  }
}

// Error boundary: selalu mengembalikan [error, data]
const boundary = async (task) => {
  try { return [null, await task()]; } catch (e) { return [e, null]; }
};

// Loading state
async function withLoading(task) {
  $("loading").textContent = "⏳ Memuat...";
  try { return await task(); } finally { $("loading").textContent = ""; }
}

// Pagination
let page = 1, query = "";
async function renderPosts() {
  const url = `${API}/posts?_page=${page}&_limit=5${query ? `&q=${encodeURIComponent(query)}` : ""}`;
  const [err, posts] = await boundary(() => withLoading(() => getJSON(url)));
  $("postList").innerHTML = err
    ? `<li class="text-red-600">Gagal: ${err.message}</li>`
    : posts.map(({ id, title }) => `<li>#${id} ${title}</li>`).join("") || "<li>Tidak ada hasil</li>";
  $("pageInfo").textContent = `Halaman ${page}`;
}

// Debounced search
const debounce = (fn, ms = 400) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};
$("searchInput").addEventListener("input", debounce((e) => {
  query = e.target.value.trim(); page = 1; renderPosts();
}));
$("prevBtn").addEventListener("click", () => { if (page > 1) { page--; renderPosts(); } });
$("nextBtn").addEventListener("click", () => { page++; renderPosts(); });

async function jalankan() {
  // Fetch beberapa endpoint lalu gabungkan
  const [err, gabung] = await boundary(() => withLoading(async () => {
    const [users, posts] = await Promise.all([getJSON(`${API}/users?_limit=3`), getJSON(`${API}/posts?_limit=10`)]);
    return users.map(u => `${u.name}: ${posts.filter(p => p.userId === u.id).length} post`);
  }));
  addOutput("1. Fetch beberapa endpoint", err ? `Gagal: ${err.message}` : gabung);

  // Retry: gagal 2x, sukses di percobaan ke-3
  const [, hasil] = await boundary(() =>
    retry(async (i) => { if (i < 2) throw new Error("gagal"); return `berhasil di percobaan ke-${i + 1}`; })
  );
  addOutput("2. Retry + exponential backoff", hasil);

  // Error boundary dengan endpoint yang tidak ada
  const [errBoundary] = await boundary(() => getJSON(`${API}/tidak-ada`));
  addOutput("3 & 4. Loading state + Error boundary", `Error tertangkap: ${errBoundary?.message}`);

  addOutput("5 & 6. Pagination + Debounced search", "Coba tombol Prev/Next dan kolom cari di atas.");
  await renderPosts();
}
jalankan();
