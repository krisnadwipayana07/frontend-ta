import React, { useState, useContext } from "react";
import {
  Alert,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";
import TableCostum from "../../components/table/table-costume-toolbar/TableCostum";
import { headCells, rows } from "../../utils/DataTabelDummy7";
import FilterOnly from "../../components/table/table-costume-toolbar/toolbar-version/FilterOnly";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableMaster from "../../layout/table/rekap-pendapatan/TableMaster";
import TableTotal from "../../layout/table/rekap-pendapatan/TableTotal";

import { GeneralContext } from "../../context/GeneralContext";
import axios from "axios";
import { baseApi } from "../../utils/Api";
import Loading from "../../components/loading";
import sweetAlert from "sweetalert";

export default function LaporanRekapKasir() {
  window.addEventListener(
    "beforeunload",
    (e) => {
      e.preventDefault();
      console.log(e);
      return (e.returnValue = "Are you sure you want to leave the page?");
    },
    { capture: true }
  );

  const { filterData, setMerchantData } = useContext(GeneralContext);
  const [isLoading, setIsLoading] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const IDRConvert = Intl.NumberFormat("id-ID");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [category, setCategory] = useState("Total");
  const endPointMerchant = "/v1/merchant";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  // const endPoint = "/v1/laporan/detailTransaksi";
  const endPointDownload = "/v1/laporan/rekapKasir/download";
  console.log(filterData);
  const handleDownload = (fileType) => {
    if (filterData.dateStart === undefined) {
      sweetAlert({
        title: "Filter Need",
        text: "Silakan filter terlebih dahulu data yang ingin di download. maksimal 31 hari!",
        icon: "warning",
      });
    } else if (filterData.merchantID === "") {
      sweetAlert({
        title: "Merchant Need",
        text: "Silakan pilih merchant terlebih dahulu!",
        icon: "warning",
      });
    } else {
      setIsLoading(true);
      var FileDownload = require("js-file-download");
      axios
        .get(baseApi + endPointDownload, {
          params: {
            fileType: fileType,
            date: filterData.dateStart,
            // cashierName: filterData.cashierName,
            merchantID: filterData.merchantID,
          },
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          responseType: "arraybuffer",
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
            `Laporan Rekap Kasir_${time}.${res.config.params.fileType}`
          );
          setIsLoading(false);
        });
    }
  };
  React.useEffect(() => {
    axios
      .get(baseApi + endPointMerchant, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setMerchantData(res.data.data);
        console.log("merchant", res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("merchant", err);
        setIsLoading(false);
      });
  }, []);
  function Transition(props) {
    return <Slide {...props} direction="down" />;
  }
  return (
    <div>
      <ResponsiveAppBar>
        <Grid container mt="3vh" display="flex" alignContent="center">
          <Grid item xs>
            <Typography
              fontSize="24px"
              fontWeight={700}
              letterSpacing="-1px"
              color="#3D734D"
            >
              Laporan Rekap Kasir
            </Typography>
          </Grid>
        </Grid>
        {category !== "Total" ? (
          <>
            <TableMaster
              rows={rows}
              title="Domestik"
              headCells={headCells}
              download={handleDownload}
            />
            <TableMaster
              rows={rows}
              title="Asing"
              headCells={headCells}
              download={handleDownload}
            />
          </>
        ) : (
          <TableTotal
            rows={rows}
            // title="Jumlah Kunjungan & Jumlah Pendapatan"
            download={handleDownload}
          />
        )}
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openBackdrop}
        TransitionComponent={Transition}
      >
        <Alert onClose={handleCloseBackdrop} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
