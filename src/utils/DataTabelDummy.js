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
    id: "jumlah_transaksi",
    numeric: true,
    disablePadding: false,
    label: "JUMLAH TRANSAKSI",
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
];
function createData(
  cashierName,
  transactionDate,
  merchantName,
  regency,
  province,
  transactionQuantity,
  netAdultRevenue,
  netChildRevenue,
  totalTransaction
) {
  return {
    cashierName,
    transactionDate,
    merchantName,
    regency,
    province,
    transactionQuantity,
    netAdultRevenue,
    netChildRevenue,
    totalTransaction,
  };
}
export const rows = [
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
  createData(
    "ALDI",
    "05/03/2021",
    "PANTAI KUTA",
    "BADUNG",
    "BALI",
    10,
    5,
    5,
    10
  ),
];
