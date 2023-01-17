import React, { useState, useContext } from "react";
import {
  Alert,
  Backdrop,
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
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../../utils/AutoLogOffTime";
import sweetAlert from "sweetalert";

export default function LaporanRekapPendapatan() {
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
  const [isLoading, setIsLoading] = React.useState(true);
  const IDRConvert = Intl.NumberFormat("id-ID");
  const listCategory = [
    "Tunai",
    "ECash",
    "Total ETiket",
    "Hasil Penjualan Tiket",
    "Total",
  ];

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [category, setCategory] = useState("Total");
  const { reload, setReload } = React.useContext(GeneralContext);
  const endPointMerchant = "/v1/merchant";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  // const endPoint = "/v1/laporan/detailTransaksi";
  const endPointDownload = "/v1/laporan/rekapPendapatan/download";
  console.log(errorMessage, openBackdrop);
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
    } else if (filterData.merchantID === null || filterData.merchantID === "") {
      setErrorMessage("Silakan pilih merchant terlebih dahulu!");
      setOpenBackdrop(true);
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
            `Laporan Rekap Pendapatan_${time}.${res.config.params.fileType}`
          );
          setIsLoading(false);
        });
    }
  };
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
              Laporan Rekap Pendapatan
            </Typography>
          </Grid>
          {/* <Grid item justifyContent="flex-end">
            <Select
              value={category}
              onChange={handleChangeCategory}
              IconComponent={KeyboardArrowDownIcon}
              sx={{ px: "1vw" }}
            >
              {listCategory.map((item) => (
                <MenuItem value={item}>{item} </MenuItem>
              ))}
            </Select>
          </Grid> */}
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
    </div>
  );
}
