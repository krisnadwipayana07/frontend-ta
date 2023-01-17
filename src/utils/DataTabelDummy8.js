export const headCells = [
  {
    id: "no",
    numeric: true,
    label: "NO",
  },
  {
    id: "id",
    numeric: true,
    label: "TANGGAL CETAK",
  },
  {
    id: "no_billing",
    numeric: true,
    disablePadding: false,
    label: "NO BILLING",
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "USERNAME",
  },
  {
    id: "tipe",
    numeric: false,
    label: "TIPE",
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
