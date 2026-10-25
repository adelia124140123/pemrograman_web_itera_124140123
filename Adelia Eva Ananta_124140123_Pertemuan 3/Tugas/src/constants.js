// Daftar status buku. Dipakai bersama oleh form, filter, daftar, dan statistik
// supaya label dan nilai status cukup didefinisikan di satu tempat.
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Milik' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

// Objek pencarian cepat: STATUS_LABEL['baca'] -> 'Sedang Dibaca'
export const STATUS_LABEL = Object.fromEntries(
  STATUS_OPTIONS.map((option) => [option.value, option.label])
);