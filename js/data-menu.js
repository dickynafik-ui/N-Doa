export const MENU_CATEGORIES = [
  {
    id: "tawasul",
    title: "Tawasul",
    icon: "📿",
    description: "Khusus tawasul arwah dengan input nama almarhum/ah",
    submenus: [
      { id: "tawasul-arwah", name: "Tawasul Arwah Khusus", hasInput: true },
      { id: "tawasul-lengkap", name: "Tawasul Lengkap", hasInput: true }
    ]
  },
  {
    id: "yasin",
    title: "Surat Yasin",
    icon: "📖",
    description: "Bacaan Surat Yasin & Doa Setelah Yasin",
    submenus: [
      { id: "bacaan-yasin", name: "Surat Yasin (Ayat 1 - 83)", hasInput: false },
      { id: "doa-yasin", name: "Doa Setelah Membaca Surat Yasin", hasInput: true }
    ]
  },
  {
    id: "doa",
    title: "Kumpulan Doa",
    icon: "🤲",
    description: "Kumpulan doa-doa harian, selamat, dan arwah",
    submenus: [
      { id: "doa-tahlil", name: "Doa Tahlil / Arwah", hasInput: true },
      { id: "doa-selamat", name: "Doa Selamat Ringkas", hasInput: false },
      { id: "doa-khususon", name: "Doa Khususon Mayit", hasInput: true }
    ]
  }
];