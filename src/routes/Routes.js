import Dashboard from "../pages/Dashboard";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import IntegrasiQrGelang from "../pages/gelang/IntegrasiQrGelang";
import QrGelang from "../pages/gelang/QrGelang";
import ScanQrAndSaleAddress from "../pages/gelang/ScanQrAndSaleAddress";
import Ticket from "../pages/gelang/Ticket";
import Homepage from "../pages/Homepage";
import LaporanDetailTransaksi from "../pages/laporan/LaporanDetailTransaksi";
import LaporanPembatalan from "../pages/laporan/LaporanPembatalan";
import LaporanPembayaran from "../pages/laporan/LaporanPembayaran";
import LaporanPengunjung from "../pages/laporan/LaporanPengunjung";
import LaporanPenjualanPerTiket from "../pages/laporan/LaporanPenjualanPerTiket";
import LaporanRekapKasir from "../pages/laporan/LaporanRekapKasir";
import LaporanRekapPendapatan from "../pages/laporan/LaporanRekapPendapatan";
import LaporanRiwayatTiket from "../pages/laporan/LaporanRiwayatTiket";
import LaporanTransaksi from "../pages/laporan/LaporanTransaksi";
import Admin from "../pages/Loginpage";
import UnblockUser from "../pages/user/UnblockUser";
import ChangePassword from "../pages/ChangePassword";
import UserAdmin from "../pages/master/UserAdmin";

export const pageRoutes = [
  { name: "Homepage", link: "/", component: Homepage, isProtected: true },
  {
    name: "Dashboard",
    link: "/dashboard",
    component: Dashboard,
    isProtected: true,
  },
  {
    name: "Laporan Transaksi",
    link: "/laporan-transaksi",
    component: LaporanTransaksi,
    isProtected: true,
  },
  {
    name: "Laporan Pembatalan",
    link: "/laporan-pembatalan",
    component: LaporanPembatalan,
    isProtected: true,
  },
  {
    name: "Laporan Pembatalan",
    link: "/laporan-detail-transaksi",
    component: LaporanDetailTransaksi,
    isProtected: true,
  },
  {
    name: "Laporan Pembayaran",
    link: "/laporan-pembayaran",
    component: LaporanPembayaran,
    isProtected: true,
  },
  {
    name: "Laporan Penjualan Per Tiket",
    link: "/laporan-penjualan-per-tiket",
    component: LaporanPenjualanPerTiket,
    isProtected: true,
  },
  {
    name: "Laporan Pengunjung",
    link: "/laporan-pengunjung",
    component: LaporanPengunjung,
    isProtected: true,
  },
  {
    name: "Laporan Riwayat Tiket",
    link: "/laporan-riwayat-tiket",
    component: LaporanRiwayatTiket,
    isProtected: true,
  },
  {
    name: "Laporan Rekap Pendapatan",
    link: "/laporan-rekap-pendapatan",
    component: LaporanRekapPendapatan,
    isProtected: true,
  },
  {
    name: "Laporan Rekap Kasir",
    link: "/laporan-rekap-kasir",
    component: LaporanRekapKasir,
    isProtected: true,
  },
  { name: "Admin", link: "/admin", component: Admin, isProtected: false },
  {
    name: "Admin-User",
    link: "/admin/user",
    component: UserAdmin,
    isProtected: false,
  },
  {
    name: "Integrasi Qr Gelang",
    link: "/integrasi-qr-gelang",
    component: IntegrasiQrGelang,
    isProtected: false,
  },
  {
    name: "Qr Gelang",
    link: "/qr-gelang",
    component: QrGelang,
    isProtected: false,
  },
  {
    name: "Scan Gelang",
    link: "/scan-gelang",
    component: ScanQrAndSaleAddress,
    isProtected: false,
  },
  {
    name: "Ticket",
    link: "/ticket",
    component: Ticket,
    isProtected: false,
  },
  {
    name: "Forgot Password",
    link: "/forgot-password",
    component: ForgotPasswordPage,
    isProtected: false,
  },
  {
    name: "Unblock User",
    link: "/unblock-user",
    component: UnblockUser,
    isProtected: false,
  },
  {
    name: "Change Password",
    link: "/change-password",
    component: ChangePassword,
    isProtected: false,
  },
];
