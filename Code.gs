const SHEET_NAME = "Absensi";

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);

  const headers = [
    "Timestamp","No","Nama","NIM","Jurusan","Semester",
    "Status","Alasan Izin"
  ];
  sh.clear();
  sh.getRange(1,1,1,headers.length).setValues([headers]);
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, headers.length);
  return "Setup selesai";
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Absensi Peserta Ospek Lapangan")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    setup();
    sh = ss.getSheetByName(SHEET_NAME);
  }
  const values = sh.getDataRange().getValues();
  if (values.length <= 1) return [];
  return values.slice(1).map(r => ({
    timestamp: r[0],
    no: r[1],
    nama: r[2],
    nim: r[3],
    jurusan: r[4],
    semester: r[5],
    status: r[6],
    alasan: r[7]
  }));
}

function saveAttendance(data) {
  if (!data || !data.nim) throw new Error("NIM wajib diisi.");
  if (!["Hadir","Izin","Alfa"].includes(data.status)) {
    throw new Error("Status absensi tidak valid.");
  }
  if (data.status === "Izin" && !String(data.alasan || "").trim()) {
    throw new Error("Alasan izin wajib diisi.");
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    setup();
    sh = ss.getSheetByName(SHEET_NAME);
  }

  const rows = sh.getDataRange().getValues();
  let foundRow = -1;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][3]).trim() === String(data.nim).trim()) {
      foundRow = i + 1;
      break;
    }
  }

  const row = [
    new Date(),
    data.no || "",
    data.nama || "",
    data.nim || "",
    data.jurusan || "",
    data.semester || "",
    data.status || "",
    data.alasan || ""
  ];

  if (foundRow > 0) {
    sh.getRange(foundRow, 1, 1, row.length).setValues([row]);
  } else {
    sh.appendRow(row);
  }
  return {ok:true, message:"Absensi berhasil disimpan."};
}
