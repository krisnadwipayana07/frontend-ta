export const headCells = [
  {
    id: "no",
    numeric: true,
    label: "NO",
  },
  {
    id: "id",
    numeric: true,
    label: "TANGGAL",
  },
  {
    id: "object_wisata",
    numeric: true,
    disablePadding: false,
    label: "ANAK-ANAK",
  },
  {
    id: "kabupaten",
    numeric: true,
    disablePadding: false,
    label: "DEWASA",
  },
];
function createData(date, children, adult) {
  return { date, children, adult };
}
export const rows = [
  createData("01/05/2022", "-", "-"),
  createData("01/05/2022", "-", "-"),
  createData("01/05/2022", "-", "-"),
  createData("01/05/2022", "-", "-"),
];
