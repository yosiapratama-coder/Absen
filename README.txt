# Website Absensi Peserta Ospek Lapangan

Fitur:
- 50 slot peserta (33 nama/NIM dari data yang diberikan + 17 slot tambahan)
- Jurusan
- NIM
- Semester: 1, 3, 5, 7
- Status: Hadir, Izin + alasan, Alfa
- Data tersimpan otomatis ke Google Sheets saat menekan OK, Simpan
- Jika NIM yang sama diabsen lagi, data diperbarui
- Bisa dibuka siapa saja setelah Web App Google Apps Script dideploy

CARA PASANG:
1. Buat Google Sheet baru.
2. Extensions > Apps Script.
3. Buat file Code.gs, paste isi Code.gs dari paket ini.
4. Buat file HTML bernama Index, paste isi Index.html.
5. Jalankan fungsi setup() satu kali dan beri izin akses.
6. Deploy > New deployment > Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Deploy, lalu salin URL Web App.
10. Bagikan URL tersebut kepada peserta.

CATATAN:
- Karena akses dibuat "Anyone", siapa pun yang memiliki URL dapat mengisi/mengubah absensi.
- Untuk keamanan lebih tinggi, tambahkan login/admin atau kode akses.
- Google Sheets menjadi database bersama.
