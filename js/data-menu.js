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
  },
  {
    id: 'doa',
    title: 'Doa-Doa Pilihan',
    description: 'Kumpulan doa harian, doa selamat, dan doa tahlil',
    icon: '🤲'
  }
];

// Data Doa Harian Pilihan
export const doaData = {
  title: "Doa-Doa Pilihan",
  category: "Doa Harian",
  items: [
    {
      number: 1,
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      latin: "Rabbanā ātinā fid-dunyā ḥasanataw wa fil-ākhirati ḥasanataw wa qinā 'ażāban-nār.",
      translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."
    },
    {
      number: 2,
      arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ سَلاَمَةً فِي الدِّينِ وَعَافِيَةً فِي الْجَسَدِ وَزِيَادَةً فِي الْعِلْمِ وَبَرَكَةً فِي الرِّزْقِ وَتَوْبَةً قَبْلَ الْمَوْتِ وَرَحْمَةً عِنْدَ الْمَوْتِ وَمَغْفِرَةً بَعْدَ الْمَوْتِ",
      latin: "Allāhumma innā nas'aluka salāmatan fid-dīni, wa 'āfiyatan fil-jasadi, wa ziyādatan fil-'ilmi, wa barakatan fir-rizqi, wa taubatan qablal-maut, wa raḥmatan 'indal-maut, wa maghfiratam ba'dal-maut.",
      translation: "Ya Allah, kami memohon kepada-Mu keselamatan dalam agama, kesehatan jasmani, tambahan ilmu, keberkahan rezeki, taubat sebelum mati, rahmat ketika mati, dan ampunan setelah mati."
    }
  ]
};

// Data Konten Lengkap
export const prayersData = {
  "yasin": yasinData,
  "tawasul": tawasulData,
  "doa": doaData
};