// js/data-menu.js

// Import modul selevel menggunakan path relatif ./
import { yasinData } from './data-yasin.js';
import { tawasulData } from './data-tawasul.js';
import { daftarDoaPilihan } from './doas/index.js';

// Kategori Menu Utama untuk index.html & category.html
export const MENU_CATEGORIES = [
  {
    id: 'yasin',
    title: 'Surah Yasin',
    description: 'Bacaan Surah Yasin 83 Ayat lengkap latin dan terjemahan',
    icon: '📖'
  },
  {
    id: 'tawasul',
    title: 'Tawasul / Hadrah',
    description: 'Bacaan Tawasul / Hadrah lengkap',
    icon: '🤲'
  },
  {
    id: 'doa_pilihan',
    title: 'Doa-Doa Pilihan',
    description: 'Kumpulan doa harian, doa selamat, dan doa tahlil',
    icon: '🙏🏻'
  }
];

// Data Konten Lengkap
export const prayersData = {
  "yasin": yasinData,
  "tawasul": tawasulData,
  "doa_pilihan": {
    title: "Doa-Doa Pilihan",
    listDoa: daftarDoaPilihan
  },
  "doa": {
    title: "Doa-Doa Pilihan",
    listDoa: daftarDoaPilihan
  }
};