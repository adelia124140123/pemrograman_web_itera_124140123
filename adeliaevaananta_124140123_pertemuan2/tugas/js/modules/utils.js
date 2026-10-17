// Fungsi bantu (semuanya arrow function)

// Format tanggal bahasa Indonesia. Parameter kedua punya nilai default.
export const formatTanggal = (
  date = new Date(),
  options = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
) => new Intl.DateTimeFormat("id-ID", options).format(date);

// "2026-10-20" -> Date lokal (hindari bug zona waktu dari new Date("YYYY-MM-DD"))
export const parseDate = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Hari ini pukul 00:00, dipakai untuk menghitung selisih hari
export const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

// Cegah XSS saat teks dari pengguna dimasukkan lewat innerHTML
export const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
