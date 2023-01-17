import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WatchIcon from "@mui/icons-material/Watch";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export const sidebarList = [
  {
    name: "Dashboards",
    icon: HomeOutlinedIcon,
    link: "/dashboard",
  },
  // {
  //   name: "Customer",
  //   icon: PersonOutlineOutlinedIcon,
  // },
  //   name: "Log Aktivitas",
  //   icon: CheckCircleOutlineOutlinedIcon,
  // },
  {
    name: "Master",
    icon: LockOpenIcon,
    children: [
      {
        name: "User Admin",
        icon: CircleOutlinedIcon,
        link: "/admin/user",
      },
    ],
  },
  {
    name: "Transaksi",
    icon: ContentPasteOutlinedIcon,
    children: [
      {
        name: "Pembelian Produk",
        icon: CircleOutlinedIcon,
        link: "/laporan-transaksi",
      },
      {
        name: "Laporan Pembatalan",
        icon: CircleOutlinedIcon,
        link: "/laporan-pembatalan",
      },
      {
        name: "Laporan Detail Transaksi",
        icon: CircleOutlinedIcon,
        link: "/laporan-detail-transaksi",
      },
      {
        name: "Laporan Pembayaran",
        icon: CircleOutlinedIcon,
        link: "/laporan-pembayaran",
      },
      {
        name: "Laporan Penjualan Per Tiket",
        icon: CircleOutlinedIcon,
        link: "/laporan-penjualan-per-tiket",
      },
      {
        name: "Laporan Pengunjung",
        icon: CircleOutlinedIcon,
        link: "/laporan-pengunjung",
      },
      {
        name: "Laporan Riwayat Cetak Tiket",
        icon: CircleOutlinedIcon,
        link: "/laporan-riwayat-tiket",
      },
      {
        name: "Laporan Rekap Pendapatan",
        icon: CircleOutlinedIcon,
        link: "/laporan-rekap-pendapatan",
      },
      {
        name: "Laporan Rekap Kasir",
        icon: CircleOutlinedIcon,
        link: "/laporan-rekap-kasir",
      },
    ],
  },
  {
    name: "User",
    icon: AccountBoxIcon,
    children: [
      {
        name: "Unblock User",
        icon: CircleOutlinedIcon,
        link: "/unblock-user",
      },
    ],
  },
  // {
  //   name: "Pelimpahan",
  //   icon: CreditCardOutlinedIcon,
  //   children: [
  //     {
  //       name: "Object Wisata",
  //       icon: CircleOutlinedIcon,
  //       link: "/laporan-transaks",
  //     },
  //   ],
  // },
];
