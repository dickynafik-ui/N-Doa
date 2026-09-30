import { doaYasin } from './doa-yasin.js';

// Jika nanti mas ingin menambahkan doa baru (misal: doa-2.js):
// 1. Buat file doa-2.js di dalam folder js/doas/
// 2. Import di atas (misal: import { doaSelamat } from './doa-2.js';)
// 3. Masukkan ke dalam array daftarDoaPilihan di bawah ini

export const daftarDoaPilihan = [
  doaYasin
];