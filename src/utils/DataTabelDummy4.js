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
  cashierName,
  merchantName,
  regency,
  transactionDate,
  ticketName,
  totalTransaction,
  totalAdultQuantity,
  totalChildQuantity,
  totalQuantity,
  priceChild,
  priceAdult,
  totalPrice
) {
  return {
    cashierName,
    merchantName,
    regency,
    transactionDate,
    ticketName,
    totalTransaction,
    totalAdultQuantity,
    totalChildQuantity,
    totalQuantity,
    priceChild,
    priceAdult,
    totalPrice,
  };
}
export const rows = [
  createData(
    "ALDI",
    "PANTAI KUTA",
    "BADUNG",
    "26/05/2022",
    "SAMPLE",
    1,
    2,
    1,
    3,
    100000,
    5000,
    250000
  ),
];
