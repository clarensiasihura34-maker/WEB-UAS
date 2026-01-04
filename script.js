function digitalClock(){
  document.getElementById("clock").innerText =
    new Date().toLocaleString();
}
setInterval(digitalClock, 1000);

// --- FILTER PENCARIAN TABEL ---
const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  const rows = document.querySelectorAll("table tr:not(:first-child)");

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(keyword) ? "" : "none";
  });
});

// --- WARNA STATUS BUKU ---
const statusCells = document.querySelectorAll("table td:last-child");

statusCells.forEach(cell => {
  const status = cell.innerText.trim().toLowerCase();

  if (status === "tersedia") {
    cell.style.color = "green";
    cell.style.fontWeight = "bold";
  }

  if (status === "dipinjam") {
    cell.style.color = "red";
    cell.style.fontWeight = "bold";
  }
});

// --- VALIDASI FORM & RINGKASAN ---
const form = document.getElementById("formPinjam");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // menghentikan reload halaman

  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();
  const judul = document.getElementById("judul").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const catatan = document.getElementById("catatan").value;

  // cek tanggal tidak mundur
  const today = new Date().toISOString().split("T")[0];
  if (tanggal < today) {
    alert("Tanggal peminjaman tidak boleh sebelum hari ini.");
    return;
  }

  // cek semua wajib isi
  if (!nama || !kelas || !judul || !tanggal) {
    alert("Harap lengkapi semua data wajib.");
    return;
  }

  // tampilkan ringkasan
  document.getElementById("hasil").innerText =
    `Permohonan atas nama ${nama} (kelas ${kelas}) untuk buku "${judul}" sudah terkirim.`;

  // reset form
  form.reset();
});
