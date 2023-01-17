export const headCells = [
  {
    id: "no",
    numeric: true,
    label: "NO",
  },
  {
    id: "id",
    numeric: true,
    label: "NAMA KASIR",
  },
  {
    id: "object_wisata",
    numeric: true,
    disablePadding: false,
    label: "OBJECT WISATA",
  },
  {
    id: "kabupaten",
    numeric: true,
    disablePadding: false,
    label: "KABUPATEN",
  },
  {
    id: "tanggal_transaksi",
    numeric: false,
    label: "TANGGAL TRANSAKSI",
  },
  {
    id: "jumlah_transaksi",
    numeric: true,
    disablePadding: false,
    label: "JUMLAH TRANSAKSI",
  },
  {
    id: "total_bayar",
    numeric: true,
    disablePadding: false,
    label: "TOTAL DIBAYAR",
  },
  {
    id: "total_harga",
    numeric: true,
    disablePadding: false,
    label: "TOTAL HARGA",
  },
  {
    id: "kembalian",
    numeric: true,
    disablePadding: false,
    label: "KEMBALIAN",
  },
  {
    id: "tipe_pembayaran",
    numeric: true,
    disablePadding: false,
    label: "TIPE PEMBAYARAN",
  },
];
function createData(
  transactionDate,
  merchantName,
  regency,
  country_name,
  totalMale,
  totalFemale,
  totalPackage
) {
  return {
    transactionDate,
    merchantName,
    regency,
    country_name,
    totalMale,
    totalFemale,
    totalPackage,
  };
}
export const rows = [
  createData("26/05/2022", "PANTAI KUTA", "BADUNG", "INDONESIA", 1, 1, 1, 5),
  createData("26/05/2022", "PANTAI KUTA", "BADUNG", "INDONESIA", 1, 1, 1, 5),
  createData("26/05/2022", "PANTAI KUTA", "BADUNG", "INDONESIA", 1, 1, 1, 5),
  createData("26/05/2022", "PANTAI KUTA", "BADUNG", "INDONESIA", 1, 1, 1, 5),
  createData("26/05/2022", "PANTAI KUTA", "BADUNG", "INDONESIA", 1, 1, 1, 5),
  createData("26/05/2022", "PANTAI KUTA", "BADUNG", "INDONESIA", 1, 1, 1, 5),
];
