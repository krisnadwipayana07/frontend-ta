import React, { useContext } from "react";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";
import TableCostum from "../../components/table/table-twotext/TableCostum";
import { headCells } from "../../utils/HeaderPenjualanPerTiket";
import axios from "axios";
import { baseApi } from "../../utils/Api";
import { GeneralContext } from "../../context/GeneralContext";
import Loading from "../../components/loading";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TotalCard from "../../components/card/card-total/TotalCard";
import { Heading } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../../utils/AutoLogOffTime";
import sweetAlert from "sweetalert";

export default function LaporanPenjualanPerTiket() {
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
  const [dataAnalytics, setDataAnalytics] = React.useState({
    ticket_summary: [
      {
        ticketName: "",
        totalRevenueAdult: 0,
        totalRevenueChild: 0,
        totalTicket: 0,
        totalTransaction: 0,
      },
      {
        ticketName: "",
        totalRevenueAdult: 0,
        totalRevenueChild: 0,
        totalTicket: 0,
        totalTransaction: 0,
      },
    ],
  });
  const [dataPenjualan, setDataPenjualan] = React.useState([]);
  const { reload, setReload } = React.useContext(GeneralContext);

  const { filterData } = useContext(GeneralContext);
  const IDRConvert = Intl.NumberFormat("id-ID");
  const endPoint = "/v1/laporan/perTiket";
  const endPointDownload = "/v1/laporan/perTiket/download";

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
          setDataPenjualan(res.data.data.list);
        } else {
          setDataPenjualan([...dataPenjualan, ...res.data.data.list]);
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
      dataPenjualan.length - rowsPerPage,
      "<",
      rowsPerPage * (page + 1)
    );
    if (dataPenjualan.length - rowsPerPage <= rowsPerPage * (page + 1)) {
      getData(dataPenjualan.length, 1);
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
            `Laporan Penjualan Per Tiket_${time}.${res.config.params.fileType}`
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
          Laporan Penjualan Per Tiket
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
        {open &&
          dataAnalytics?.ticket_summary.map((data, i) => {
            return (
              <>
                <Heading as={"h3"}>{data.ticketName}</Heading>
                <Grid container spacing={0} gap="32px" mb="3vh">
                  <Paper sx={{ p: "1vw", minWidth: "240px", boxShadow: 3 }}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography fontWeight={600} letterSpacing="-0.5px">
                          Total Pendapatan Dewasa
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          fontWeight={900}
                          fontSize="18px"
                          letterSpacing="-1px"
                        >
                          Rp. {IDRConvert.format(data.totalRevenueAdult)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Paper sx={{ p: "1vw", minWidth: "240px", boxShadow: 3 }}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography fontWeight={600} letterSpacing="-0.5px">
                          Total Pendapatan Anak-anak
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          fontWeight={900}
                          fontSize="18px"
                          letterSpacing="-1px"
                        >
                          Rp. {IDRConvert.format(data.totalRevenueChild)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Paper sx={{ p: "1vw", minWidth: "240px", boxShadow: 3 }}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography fontWeight={600} letterSpacing="-0.5px">
                          Total Tiket
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          fontWeight={900}
                          fontSize="18px"
                          letterSpacing="-1px"
                        >
                          {IDRConvert.format(data.totalTicket)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Paper sx={{ p: "1vw", minWidth: "240px", boxShadow: 3 }}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography fontWeight={600} letterSpacing="-0.5px">
                          Total Transaksi
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          fontWeight={900}
                          fontSize="18px"
                          letterSpacing="-1px"
                        >
                          Rp. {IDRConvert.format(data.totalTransaction)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            );
          })}

        <Box pt="1vh">
          <TableCostum
            headCells={headCells}
            rows={dataPenjualan}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            download={handleDownload}
            setIsLoading={setIsLoading}
          >
            {dataPenjualan
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
                    <TableCell>{row.ticketName}</TableCell>
                    <TableCell>{row.totalTransaction}</TableCell>
                    <TableCell>{row.totalAdultQuantity}</TableCell>
                    <TableCell>{row.totalChildQuantity}</TableCell>
                    <TableCell>{row.totalQuantity}</TableCell>
                    <TableCell>
                      Rp. {IDRConvert.format(row.priceAdult)}
                    </TableCell>
                    <TableCell>
                      Rp. {IDRConvert.format(row.priceChild)}
                    </TableCell>
                    <TableCell>
                      Rp. {IDRConvert.format(row.totalPrice)}
                    </TableCell>
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
