// js/data-menu.js

import { yasinData } from './data-yasin.js';
import { tawasulData } from './data-tawasul.js';

// Kategori Menu Utama untuk index.html
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
  }
];

// Data Konten Lengkap
export const prayersData = {
  "yasin": yasinData,
  "tawasul": tawasulData
};