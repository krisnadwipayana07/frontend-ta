export const headCells = [
  {
    id: "no",
    numeric: true,
    label: "NO",
  },
  {
    id: "id",
    numeric: true,
    label: "TANGGAL KUNJUNGAN",
  },
  {
    id: "object_wisata",
    numeric: true,
    disablePadding: false,
    label: "OBJECT WISATA",
  },
  {
    id: "jumlah_kunjungan",
    numeric: true,
    disablePadding: false,
    label: "JUMLAH KUNJUNGAN",
  },
];
function createData(printDate, noBilling, username, type) {
  return {
    printDate,
    noBilling,
    username,
    type,
  };
}
export const rows = [
  createData("26/05/2022", "AB1234567", "BERLIN", "PDF"),
  createData("26/05/2022", "AB1234567", "BERLIN", "PDF"),
  createData("26/05/2022", "AB1234567", "BERLIN", "PDF"),
  createData("26/05/2022", "AB1234567", "BERLIN", "PDF"),
];
