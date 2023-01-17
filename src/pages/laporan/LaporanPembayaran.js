import {
  Button,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";
import TableCostum from "../../components/table/table-twotext/TableCostum";
import { headCells, rows } from "../../utils/DataTabelDummy4";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TotalCard from "../../components/card/card-total/TotalCard";
import axios from "axios";
import { baseApi } from "../../utils/Api";
import { GeneralContext } from "../../context/GeneralContext";
import Loading from "../../components/loading";
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../../utils/AutoLogOffTime";
import sweetAlert from "sweetalert";

export default function LaporanPembayaran() {
  window.addEventListener(
    "beforeunload",
    (e) => {
      e.preventDefault();
      console.log(e);
      return (e.returnValue = "Are you sure you want to leave the page?");
    },
    { capture: true }
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(true);
  const [dataAnalytics, setDataAnalytics] = React.useState({});
  const [dataPembayaran, setDataPembayaran] = React.useState([]);
  const { reload, setReload } = React.useContext(GeneralContext);

  const { filterData } = useContext(GeneralContext);
  const IDRConvert = Intl.NumberFormat("id-ID");
  const endPoint = "/v1/laporan/pembayaran";
  const endPointDownload = "/v1/laporan/pembayaran/download";
  let dateNowStart = new Date().setHours(0, 0, 0, 0);
  let start =
    filterData.dateStart === undefined || filterData.dateStart === null
      ? (new Date(dateNowStart).getTime() / 1000).toFixed(0)
      : filterData.dateStart;
  let end =
    filterData.dateEnd === undefined || filterData.dateEnd === null
      ? (new Date().getTime() / 1000).toFixed(0)
      : filterData.dateEnd;

  function getData(offset, method) {
    axios
      .get(baseApi + endPoint, {
        params: {
          offset: offset,
          limit: rowsPerPage + 1,
          cashierName: filterData.cashierName,
          merchantName: filterData.merchantName,
          dateStart: start,
          dateEnd: end,
        },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        if (method === 0) {
          setDataAnalytics(res.data.data.analytics);
          setDataPembayaran(res.data.data.list);
        } else {
          setDataPembayaran([...dataPembayaran, ...res.data.data.list]);
        }
        console.log(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    setTimeout(() => {
      const decode = jwt_decode(localStorage.getItem("token"));

      console.log(decode);

      axios.post(baseApi + "/v1/band/logout", {
        id: `${decode.ID}`,
        islogin: 0,
      });
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      setReload(reload + 1);
      sweetAlert({
        title: "Session Timeout",
        text: "Your session has timeout, please login again",
        icon: "warning",
      });
    }, autoLogOffTime);
    getData(0, 0);
  }, [filterData]);

  const handleChangePage = (event, newPage) => {
    console.log("pages ", newPage);
    setPage(newPage);
    console.log(
      dataPembayaran.length - rowsPerPage,
      "<",
      rowsPerPage * (page + 1)
    );
    if (dataPembayaran.length - rowsPerPage <= rowsPerPage * (page + 1)) {
      getData(dataPembayaran.length, 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDownload = (fileType) => {
    if (
      filterData.dateStart === undefined ||
      filterData.dateEnd === undefined
    ) {
      sweetAlert({
        title: "Filter Need",
        text: "Silakan filter terlebih dahulu data yang ingin di download. maksimal 31 hari!",
        icon: "warning",
      });
    } else {
      setIsLoading(true);
      var FileDownload = require("js-file-download");
      axios
        .get(baseApi + endPointDownload, {
          params: {
            fileType: fileType,
            dateStart: filterData.dateStart,
            dateEnd: filterData.dateEnd,
            cashierName: filterData.cashierName,
            merchantName: filterData.merchantName,
          },
          responseType: "arraybuffer",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          let today = new Date();
          let day = String(today.getDate()).padStart(2, "0");
          let month = String(today.getMonth() + 1).padStart(2, "0");
          let year = String(today.getFullYear());
          let h = String(today.getHours()).padStart(2, "0");
          let m = String(today.getMinutes()).padStart(2, "0");
          let s = String(today.getSeconds()).padStart(2, "0");
          let time = year + month + day + h + m + s;
          FileDownload(
            res.data,
            `Laporan Pembayaran_${time}.${res.config.params.fileType}`
          );
          setIsLoading(false);
        });
    }
  };
  return (
    <div>
      <ResponsiveAppBar>
        <Typography
          fontSize="24px"
          fontWeight={700}
          letterSpacing="-1px"
          color="#3D734D"
        >
          Laporan Pembayaran
        </Typography>
        <Grid container my="3vh" display="flex" alignContent="center">
          <Grid item xs>
            <Typography
              fontSize="24px"
              fontWeight={700}
              letterSpacing="-1px"
              color="#3D734D"
            >
              Lihat Detail
            </Typography>
          </Grid>
          <Grid item justifyContent="flex-end">
            <IconButton aria-label="open" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
          </Grid>
        </Grid>
        {open && (
          <Grid container spacing={4} mb="3vh">
            <Grid item>
              <TotalCard
                judul="Jumlah Pembayaran Cash"
                total={
                  "Rp. " +
                  IDRConvert.format(
                    dataAnalytics?.totalPaymentCash?.totalTransaction
                  ) +
                  " (" +
                  dataAnalytics?.totalPaymentCash?.totalTicket +
                  ")"
                }
                persen={0}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Jumlah Pembayaran EDC"
                total={
                  "Rp. " +
                  IDRConvert.format(
                    dataAnalytics?.totalPaymentDebit?.totalTransaction
                  ) +
                  " (" +
                  dataAnalytics?.totalPaymentDebit?.totalTicket +
                  ")"
                }
                persen={0}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Jumlah Pembayaran Virtual Account BPD Bali"
                total={
                  "Rp. " +
                  IDRConvert.format(
                    dataAnalytics?.totalPaymentVA?.totalTransaction
                  ) +
                  " (" +
                  dataAnalytics?.totalPaymentVA?.totalTicket +
                  ")"
                }
                persen={0}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Jumlah Pembayaran QRIS"
                total={
                  "Rp. " +
                  IDRConvert.format(
                    dataAnalytics?.totalPaymentQris?.totalTransaction
                  ) +
                  " (" +
                  dataAnalytics?.totalPaymentQris?.totalTicket +
                  ")"
                }
                persen={0}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Jumlah Pembayaran QRIS Statis"
                total={
                  "Rp. " +
                  IDRConvert.format(
                    dataAnalytics?.totalPaymentQrisStatis?.totalTransaction
                  ) +
                  " (" +
                  dataAnalytics?.totalPaymentQrisStatis?.totalTicket +
                  ")"
                }
                persen={0}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Jumlah Pembayaran Lainnya"
                total={
                  "Rp. " +
                  IDRConvert.format(
                    dataAnalytics?.totalPaymentOther?.totalTransaction
                  ) +
                  " (" +
                  dataAnalytics?.totalPaymentOther?.totalTicket +
                  ")"
                }
                persen={0}
              />
            </Grid>
          </Grid>
        )}
        <Box pt="1vh">
          <TableCostum
            headCells={headCells}
            rows={dataPembayaran}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            download={handleDownload}
            setIsLoading={setIsLoading}
          >
            {dataPembayaran
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.cashierName}</TableCell>
                    <TableCell>{row.merchantName}</TableCell>
                    <TableCell>{row.regency}</TableCell>
                    <TableCell>
                      {row.transactionDate.substring(0, 10)}
                    </TableCell>
                    <TableCell>{row.transactionQuantity}</TableCell>
                    <TableCell>Rp. {IDRConvert.format(row.totalPay)}</TableCell>
                    <TableCell>
                      Rp. {IDRConvert.format(row.totalTransaction)}
                    </TableCell>
                    <TableCell>
                      Rp. {IDRConvert.format(row.totalChange)}
                    </TableCell>
                    <TableCell>{row.paymentType}</TableCell>
                  </TableRow>
                );
              })}
          </TableCostum>
        </Box>
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
    </div>
  );
}
