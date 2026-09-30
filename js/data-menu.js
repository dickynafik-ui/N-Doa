import { tawasulData } from './tawasul.js';
import { daftarDoaPilihan } from './doas/index.js'; // <-- Import daftar doa di sini

export const MENU_CATEGORIES = [
  {
    id: "tawasul",
    title: "Tawasul & Hadiah Fatihah",
    description: "Bacaan tawasul lengkap beserta doa khusus ahli kubur"
  },
  {
    id: "doa_pilihan",
    title: "Doa-Doa Pilihan",
    description: "Kumpulan doa harian, doa selamat, dan doa tahlil"
  }
];

export const prayersData = {
  tawasul: tawasulData,
  doa_pilihan: {
    title: "Doa-Doa Pilihan",
    listDoa: daftarDoaPilihan // <-- Masukkan daftar Doa Yasin ke sini
  }
};