export const headCells = [
  {
    id: "no",
    numeric: true,
    label: "NO",
  },
  {
    id: "no_billing",
    numeric: true,
    label: "NO BILLING",
  },
  {
    id: "id",
    numeric: true,
    label: "NAMA KASIR",
  },
  {
    id: "tanggal_transaksi",
    numeric: false,
    label: "TANGGAL TRANSAKSI",
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
    id: "provinsi",
    numeric: true,
    disablePadding: false,
    label: "PROVINSI",
  },
  {
    id: "nama_tiket",
    numeric: true,
    disablePadding: false,
    label: "NAMA TIKET",
  },
  {
    id: "jumlah_tiket_dewasa",
    numeric: true,
    disablePadding: false,
    label: "JUMLAH TIKET (DEWASA)",
  },
  {
    id: "jumlah_tiket_anak",
    numeric: true,
    disablePadding: false,
    label: "JUMLAH TIKET (ANAK)",
  },
  {
    id: "tipe_pembayaran",
    numeric: true,
    disablePadding: false,
    label: "TIPE PEMBAYARAN",
  },
  {
    id: "total_dewasa",
    numeric: true,
    disablePadding: false,
    label: "TOTAL DEWASA",
  },
  {
    id: "total_anakanak",
    numeric: true,
    disablePadding: false,
    label: "TOTAL ANAK-ANAK",
  },
  {
    id: "total_transaksi",
    numeric: true,
    disablePadding: false,
    label: "TOTAL TRANSAKSI",
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "CATATAN",
  },
];
function createData(
  cashierName,
  merchantName,
  regency,
  transactionDate,
  transactionQuantity,
  totalPay,
  totalTransaction,
  totalChange,
  paymentType
) {
  return {
    cashierName,
    merchantName,
    regency,
    transactionDate,
    transactionQuantity,
    totalPay,
    totalTransaction,
    totalChange,
    paymentType,
  };
}
export const rows = [
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    1,
    100000,
    100000,
    0,
    "CASH"
  ),
];
