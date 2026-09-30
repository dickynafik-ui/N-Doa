import { db } from './firebase-config.js';
import { doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Data default awal jika Firebase belum terisi / offline
let listArwah = [
  { nama: "Didi Carmadi bin Waskim", gender: "L" },
  { nama: "Fitriah binti Didi Carmadi", gender: "P" }
];

const inputContainer = document.getElementById('input-container');
const btnAdd = document.getElementById('btn-add');
const btnSave = document.getElementById('btn-save');
const tawasulContent = document.getElementById('tawasul-content');

// Helper untuk mencegah serangan XSS saat menampilkan teks ke innerHTML
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}

// Sinkronkan nilai dari DOM input kembali ke variabel listArwah
function syncInputsToMemory() {
  if (!inputContainer) return;
  const rowsNama = inputContainer.querySelectorAll('.input-nama');
  const rowsGender = inputContainer.querySelectorAll('.input-gender');

  listArwah = [];
  rowsNama.forEach((input, i) => {
    listArwah.push({
      nama: input.value.trim(),
      gender: rowsGender[i] ? rowsGender[i].value : 'L'
    });
  });
}

// Render input form nama almarhum/ah
function renderInputFields(data) {
  if (!inputContainer) return;
  inputContainer.innerHTML = '';
  
  data.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = "flex gap-2 items-center bg-slate-50 p-2 rounded-lg border";
    row.innerHTML = `
      <input type="text" class="input-nama w-full p-1.5 text-sm border rounded bg-white" value="${escapeHtml(item.nama)}" placeholder="Nama & Bin/Binti">
      <select class="input-gender p-1.5 text-xs border rounded bg-white">
        <option value="L" ${item.gender === 'L' ? 'selected' : ''}>L (Bin)</option>
        <option value="P" ${item.gender === 'P' ? 'selected' : ''}>P (Binti)</option>
      </select>
      <button type="button" class="btn-hapus text-red-500 font-bold px-2 text-sm hover:bg-red-50 rounded" data-index="${index}">✕</button>
    `;
    inputContainer.appendChild(row);
  });
}

// Event Delegation untuk Hapus Row (Lebih aman dari inline onclick)
if (inputContainer) {
  inputContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-hapus')) {
      syncInputsToMemory();
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      listArwah.splice(index, 1);
      renderInputFields(listArwah);
    }
  });
}

// Tambah baris nama baru
if (btnAdd) {
  btnAdd.addEventListener('click', () => {
    syncInputsToMemory();
    listArwah.push({ nama: "", gender: "L" });
    renderInputFields(listArwah);
  });
}

// Simpan data ke Firestore secara Realtime
if (btnSave) {
  btnSave.addEventListener('click', async () => {
    syncInputsToMemory();

    // Filter nama yang tidak kosong
    const updatedList = listArwah.filter(item => item.nama !== "");

    if (updatedList.length === 0) {
      alert("Masukkan setidaknya 1 nama almarhum/ah!");
      return;
    }

    try {
      btnSave.disabled = true;
      btnSave.innerText = "Menyimpan...";

      await setDoc(doc(db, "tawasul", "sesi_aktif"), {
        daftarNama: updatedList,
        updatedAt: new Date()
      });

      alert("Data Tawasul Berhasil Diperbarui!");
    } catch (err) {
      console.error("Gagal menyimpan ke Firebase:", err);
      alert("Gagal menyimpan data ke Firebase. Pastikan Security Rules Firestore sudah di-Publish!");
    } finally {
      btnSave.disabled = false;
      btnSave.innerText = "Simpan";
    }
  });
}

// Generate Poin 7 (Khusus Nama Almarhum/ah secara dinamis)
function generatePoinKhusus(daftar) {
  if (!daftar || daftar.length === 0) {
    return '<p class="text-red-500 text-sm italic">Belum ada nama almarhum/ah yang dimasukkan.</p>';
  }

  return daftar.map((item, idx) => {
    const isLaki = item.gender === 'L';
    const dhomirMaghfur = isLaki ? 'الْمَغْفُوْرِ لَهُ' : 'الْمَغْفُوْرِ لَهَا';
    const doaLengkapArab = isLaki 
      ? `اَللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مَدْخَلَهُ، وَاجْعَلِ الْجَنَّةَ مَثْوَاهُ، شَيْءٌ لِلّٰهِ لَهُ`
      : `اَللّٰهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا وَعَافِهَا وَاعْفُ عَنْهَا، وَأَكْرِمْ نُزُلَهَا وَوَسِّعْ مَدْخَلَهَا، وَاجْعَلِ الْجَنَّةَ مَثْوَاهَا، شَيْءٌ لِلّٰهِ لَهَا`;

    const latinDoa = isLaki
      ? `Allāhummaghfir lahū warhamhū wa 'āfihī wa'fu 'anhū, wa akrim nuzulahū wa wassi' madkhalahū, waj'alil-jannata matswāhu, syai'un lillāhi lahū`
      : `Allāhummaghfir lahā warhamhā wa 'āfihā wa'fu 'anhā, wa akrim nuzulahā wa wassi' madkhalahā, waj'alil-jannata matswāhā, syai'un lillāhi lahā`;

    const namaClean = escapeHtml(item.nama);

    return `
      <div class="mb-4 p-3 bg-amber-100/50 rounded-lg border border-amber-200">
        <p class="text-xs font-semibold text-amber-900 mb-2">Khusus Almarhum/ah ke-${idx + 1}:</p>
        <p class="text-right text-xl font-serif leading-loose text-slate-900" dir="rtl">
          وَخُصُوْصًا إِلَى رُوْحِ ${dhomirMaghfur} <span class="text-emerald-700 font-bold">${namaClean}</span>. ${doaLengkapArab}، الْفَاتِحَةُ...
        </p>
        <p class="text-xs text-slate-600 mt-2 italic leading-relaxed">
          (Wa khushūshan ilā rūhi ${isLaki ? 'al-maghfūr lah' : 'al-maghfūr lahā'} <b>${namaClean}</b>. ${latinDoa}, Al-Fātiḥah...)
        </p>
        <p class="text-xs text-emerald-800 font-medium mt-1">👉 (Jamaah membaca Al-Fatihah 1x)</p>
      </div>
    `;
  }).join('');
}

// Render Tawasul Lengkap ke Layar
function renderTawasulView(daftarNama) {
  if (!tawasulContent) return;
  tawasulContent.innerHTML = `
    <!-- POIN 1 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">1. Pembuka (Dibaca Bersama-sama)</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        أَشْهَدُ أَنْ لَا إِٰلَهَ إِلاَّ اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهِ (٣x)<br>
        أَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِيْ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ (٣x)<br>
        لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيْمِ<br>
        أَعُوْذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ
      </p>
      <p class="text-xs text-slate-600 italic">Asyhadu allā ilāha illallāh... (3x), Astaghfirullāhal-'azhīm... (3x), Lā haulaw lā quwwata illā billāhil-'aliyyil-'azhīm. A'ūdzubillāhi minasy-syaithānir-rajīm.</p>
    </div>

    <!-- POIN 2 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">2. Tawasul ke Nabi Muhammad SAW, Keluarga, & Sahabat</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى آلِهِ وَأَزْوَاجِهِ وَذُرِّيَّاتِهِ وَأَهْلِ بَيْتِهِ، وَأَصْحَابِهِ الْكِرَامِ، خُصُوْصًا سَيِّدَنَا أَبَا بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيًّا، وَإِلَى بَقِيَّةِ الصَّحَابَةِ أَجْمَعِيْنَ، شَيْءٌ لِلّٰهِ لَهُمُ، الْفَاتِحَةُ...
      </p>
      <p class="text-xs text-emerald-800 font-medium">👉 (Jamaah membaca Al-Fatihah 1x)</p>
    </div>

    <!-- POIN 3 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">3. Para Nabi, Malaikat, Wali & Pemimpin Thariqah</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        ثُمَّ إِلَى حَضَرَاتِ إِخْوَانِهِ مِنَ الأَنْبِيَاءِ وَالْمُرْسَلِيْنَ، وَالمَلَائِكَةِ المَقُرَّبِيْنَ، وَالشُّهَدَاءِ وَالصَّالِحِيْنَ، وَالأَوْلِيَاءِ فِي مَشَارِقِ الأَرْضِ وَمَغَارِبِهَا بَرِّهَا وَبَحْرِهَا، خُصُوْصًا إِلَى سُلْطَانِ الأَوْلِيَاءِ الشَّيْخِ عَبْدِ القَادِرِ الجَيْلَانِيِّ، وَالشَّيْخِ أَبِي الحَسَنِ الشَّاذِلِيِّ، وَالشَّيْخِ أَحْمَدَ الرِّفَاعِيِّ، وَالشَّيْخِ أَبِي يَزِيْدَ البُسْطَامِيِّ، وَمَشَايِخِ الطَّرِيْقَةِ أَجْمَعِيْنَ، شَيْءٌ لِلّٰهِ لَهُمُ، الْفَاتِحَةُ...
      </p>
      <p class="text-xs text-emerald-800 font-medium">👉 (Jamaah membaca Al-Fatihah 1x)</p>
    </div>

    <!-- POIN 4 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">4. Para Imam Mazhab, Ulama, & Wali Songo / Guru Lokal</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        ثُمَّ إِلَى أَئِمَّةِ المُجْتَهِدِيْنَ وَمُقَلِّدِيْهِمْ فِي الدِّيْنِ، وَالعُلَمَاءِ العَامِلِيْنَ، وَالفُقَهَاءِ وَالمُحَدِّثِيْنَ، وَالمُفَسِّرِيْنَ، وَالصُّوْفِيَّةِ المُمَحِّصِيْنَ، خُصُوْصًا الإِمَامَ الشَّافِعِيَّ، وَالإِمَامَ مَالِكًا، وَالإِمَامَ أَبَا حَنِيْفَةَ، وَالإِمَامَ أَحْمَدَ بْنِ حَنْبَلٍ، وَإِلَى أَوْلِيَاءِ تِسْعَةٍ (Wali Songo) وَمَشَايِخِنَا فِي هٰذِهِ النَّاحِيَةِ، شَيْءٌ لِلّٰهِ لَهُمُ، الْفَاتِحَةُ...
      </p>
      <p class="text-xs text-emerald-800 font-medium">👉 (Jamaah membaca Al-Fatihah 1x)</p>
    </div>

    <!-- POIN 5 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">5. Orang Tua, Leluhur, Guru, & Penitip Doa</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        ثُمَّ إِلَى آبَائِنَا وَأُمَّهَاتِنَا، وَأَجْدَادِنَا وَجَدَّاتِنَا، وَمَشَايِخِنَا وَمَشَايِخِ مَشَايِخِنَا، وَمُعَلِّمِيْنَا، وَلِمَنْ أَحْسَنَ إِلَيْنَا، وَلِمَنْ لَهُ حَقٌّ عَلَيْنَا، وَلِمَنْ أَوْصَانَا بِالدُّعَاءِ، شَيْءٌ لِلّٰهِ لَهُمُ، الْفَاتِحَةُ...
      </p>
      <p class="text-xs text-emerald-800 font-medium">👉 (Jamaah membaca Al-Fatihah 1x)</p>
    </div>

    <!-- POIN 6 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">6. Ahli Kubur Umum (Kaum Muslimin & Muslimat)</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        ثُمَّ إِلَى جَمِيْعِ أَهْلِ القُبُوْرِ مِنَ المُسْلِمِيْنَ وَالمُسْلِمَاتِ وَالمُؤْمِنِيْنَ وَالمُؤْمِنَاتِ مِنْ مَشَارِقِ الأَرْضِ إِلَى مَغَارِبِهَا بَرِّهَا وَبَحْرِهَا مِنْ يَمِيْنِهَا إِلَى شِمَالِهَا، شَيْءٌ لِلّٰهِ لَهُمُ، الْفَاتِحَةُ...
      </p>
      <p class="text-xs text-emerald-800 font-medium">👉 (Jamaah membaca Al-Fatihah 1x)</p>
    </div>

    <!-- POIN 7 (DINAMIS Sesuai Input Nama) -->
    <div class="bg-amber-100/70 p-4 rounded-xl border border-amber-300">
      <h3 class="font-bold text-amber-900 text-sm mb-3">7. Khusus Khususon Nama Almarhum / Almarhumah</h3>
      ${generatePoinKhusus(daftarNama)}
    </div>

    <!-- POIN 8 -->
    <div class="bg-amber-50 p-4 rounded-xl border border-amber-200">
      <h3 class="font-bold text-amber-900 text-sm mb-2">8. Niat Hajat Bersama & Pintu Masuk Membaca Yasin</h3>
      <p class="text-right text-xl font-serif leading-loose mb-2" dir="rtl">
        وَإِلَى حَضْرَةِ صَاحِبِ هٰذِهِ النِّيَّةِ وَالمَقْصُوْدِ، اَللّٰهُمَّ اقْضِ حَوَائِجَنَا، وَاشْفِ مَرْضَانَا، وَفَرِّجْ هُمُوْمَنَا، وَبَارِكْ فِي أَعْمَارِنَا وَأَمْوَالِنَا، وَثَبِّتْ إِيْمَانَنَا، وَاخْتِمْ لَنَا بِحُسْنِ الخَاتِمَةِ، وَإِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، الْفَاتِحَةُ...
      </p>
      <p class="text-xs text-emerald-800 font-medium mb-3">👉 (Jamaah membaca Al-Fatihah 1x)</p>
      <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center text-xs font-semibold text-emerald-800">
        📖 Setelah Al-Fatihah ke-8 selesai, langsung dilanjutkan membaca Surat Yasin.
      </div>
    </div>
  `;
}

// Mendengarkan perubahan data Firestore secara Realtime dengan penanganan Error Callback
onSnapshot(
  doc(db, "tawasul", "sesi_aktif"), 
  (docSnap) => {
    if (docSnap.exists() && docSnap.data().daftarNama) {
      listArwah = docSnap.data().daftarNama;
    }
    renderInputFields(listArwah);
    renderTawasulView(listArwah);
  }, 
  (error) => {
    console.warn("Melihat tampilan offline / fallback mode:", error);
    renderInputFields(listArwah);
    renderTawasulView(listArwah);
  }
);