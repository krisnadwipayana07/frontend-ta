import {
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";
import TableCostum from "../../components/table/table-twotext/TableCostum";
import { headCells } from "../../utils/DataTabelDummy";
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
import { GetAllTransaction } from "../../utils/api/TransactionApi";
import { IDRConvert } from "../../utils/tools/IDRConvert";

export default function LaporanTransaksi() {
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
  const [dataTransaksi, setDataTransaksi] = React.useState([]);

  const { filterData } = useContext(GeneralContext);
  const { reload, setReload } = React.useContext(GeneralContext);
  const endPoint = "/v1/laporan/transaksi";

  const endPointDownload = "/v1/laporan/transaksi/download";

  function getData(offset, method) {
    let dateNowStart = new Date().setHours(0, 0, 0, 0);
    let start =
      filterData.dateStart === undefined || filterData.dateStart === null
        ? (new Date(dateNowStart).getTime() / 1000).toFixed(0)
        : filterData.dateStart;
    let end =
      filterData.dateEnd === undefined || filterData.dateEnd === null
        ? (new Date().getTime() / 1000).toFixed(0)
        : filterData.dateEnd;

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
          setDataTransaksi(res.data.data.list);
        } else {
          setDataTransaksi([...dataTransaksi, ...res.data.data.list]);
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

    GetAllTransaction()
      .then((res) => setDataTransaksi(res.data.data))
      .finally(() => setIsLoading(false));
  }, [filterData]);

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
            `Laporan Transaksi_${time}.${res.config.params.fileType}`
          );
          setIsLoading(false);
        });
    }
  };

  const handleChangePage = (event, newPage) => {
    console.log("pages ", newPage);
    setPage(newPage);
    console.log(
      dataTransaksi.length - rowsPerPage,
      "<",
      rowsPerPage * (page + 1)
    );
    if (dataTransaksi.length - rowsPerPage <= rowsPerPage * (page + 1)) {
      getData(dataTransaksi.length, 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          Laporan Transaksi
        </Typography>
        <Grid container my="3vh" display="flex" alignContent="center">
          <Grid item xs>
            <Typography
              fontSize="24px"
              fontWeight={700}
              letterSpacing="-1px"
              color="#000000AB"
            >
              Lihat Total
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
                judul="Total Penjualan Tiket Dewasa"
                total={
                  "Rp. " +
                  IDRConvert.format(dataAnalytics?.totalAdultTicketRevenue)
                }
                persen={12}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Total Penjualan Tiket Anak-Anak"
                total={
                  "Rp. " +
                  IDRConvert.format(dataAnalytics?.totalChildrenRevenue)
                }
                persen={11}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Total Penjualan"
                total={"Rp. " + IDRConvert.format(dataAnalytics?.totalRevenue)}
                persen={10}
              />
            </Grid>
            <Grid item>
              <TotalCard
                judul="Jumlah Transaksi"
                total={dataAnalytics?.totalTransaction}
                persen={10}
              />
            </Grid>
          </Grid>
        )}
        <Box pt="1vh">
          <TableCostum
            headCells={[
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
                label: "TOTAL TRANSAKSI",
              },
              {
                id: "object_wisata",
                numeric: true,
                disablePadding: false,
                label: "TANGGAL TRANSAKSI",
              },
            ]}
            rows={dataTransaksi}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            download={handleDownload}
            setIsLoading={setIsLoading}
          >
            {dataTransaksi
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.CashierName}</TableCell>
                    <TableCell>{IDRConvert.format(row.Total)}</TableCell>
                    <TableCell>{row.CreatedAt}</TableCell>
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
