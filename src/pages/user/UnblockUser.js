import { TableCell, TableRow, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Box } from "@mui/system";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import ResponsiveAppBar from "../../components/appbar/ResponsiveAppBar";
import Loading from "../../components/loading";
import { GeneralContext } from "../../context/GeneralContext";
import { baseApi } from "../../utils/Api";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import sweetAlert from "sweetalert";

import { useNavigate } from "react-router-dom";
import { autoLogOffTime } from "../../utils/AutoLogOffTime";

export default function UnblockUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  // const [dataAnalytics, setDataAnalytics] = React.useState({});
  // const [dataTransaksi, setDataTransaksi] = React.useState([]);

  // const { filterData } = useContext(GeneralContext);
  const { reload, setReload } = React.useContext(GeneralContext);
  const [user, setUser] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const data = React.useRef(user);
  let navigate = useNavigate();
  // const IDRConvert = Intl.NumberFormat("id-ID");
  // const endPoint = "/v1/laporan/transaksi";

  // const endPointDownload = "/v1/laporan/transaksi/download";

  // function getData(offset, method) {
  //   let start =
  //     filterData.dateStart === undefined || filterData.dateStart === null
  //       ? (new Date().getTime() / 1000 + 86400 - 57600).toFixed(0)
  //       : filterData.dateStart;
  //   let end =
  //     filterData.dateEnd === undefined || filterData.dateEnd === null
  //       ? (new Date().getTime() / 1000 + 86400 + 28799).toFixed(0)
  //       : filterData.dateEnd;

  // axios
  //   .get(baseApi + endPoint, {
  //     params: {
  //       offset: offset,
  //       limit: rowsPerPage + 1,
  //       cashierName: filterData.cashierName,
  //       merchantName: filterData.merchantName,
  //       dateStart: start,
  //       dateEnd: end,
  //     },
  //     headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //   })
  //   .then((res) => {
  //     if (method === 0) {
  //       setDataAnalytics(res.data.data.analytics);
  //       setDataTransaksi(res.data.data.list);
  //     } else {
  //       setDataTransaksi([...dataTransaksi, ...res.data.data.list]);
  //     }
  //     console.log(res.data.data);
  //     setIsLoading(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     setIsLoading(false);
  //   });
  // }

  const handleUnblock = (userId) => {
    axios
      .post(baseApi + "/v1/useradmin/unblockuseradmin", {
        id: userId,
      })
      .then((res) => {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 6000);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getData() {
    const decode = jwt_decode(localStorage.getItem("token"));

    axios
      .post(baseApi + "/v1/admin/blockedUserAdmin", {
        level: decode.Level,
        merchantId: decode.MerchantID,
      })
      .then((res) => {
        setUser(res.data.data.userAdmins);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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

    getData();
  }, []);

  // const handleDownload = () => {
  //   if (
  //     filterData.dateStart === undefined ||
  //     filterData.dateEnd === undefined
  //   ) {
  //     alert(
  //       "Silakan filter terlebih dahulu data yang ingin di download. maksimal 31 hari!"
  //     );
  //   } else {
  //     setIsLoading(true);
  //     var FileDownload = require("js-file-download");
  //     axios
  //       .get(baseApi + endPointDownload, {
  //         params: {
  //           fileType: "xlsx",
  //           dateStart: filterData.dateStart,
  //           dateEnd: filterData.dateEnd,
  //           cashierName: filterData.cashierName,
  //           merchantName: filterData.merchantName,
  //         },
  //         responseType: "arraybuffer",
  //         headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         let today = new Date();
  //         let day = String(today.getDate()).padStart(2, "0");
  //         let month = String(today.getMonth() + 1).padStart(2, "0");
  //         let year = String(today.getFullYear());
  //         let h = String(today.getHours()).padStart(2, "0");
  //         let m = String(today.getMinutes()).padStart(2, "0");
  //         let s = String(today.getSeconds()).padStart(2, "0");
  //         let time = year + month + day + h + m + s;
  //         FileDownload(
  //           res.data,
  //           `Laporan Transaksi_${time}.${res.config.params.fileType}`
  //         );
  //         setIsLoading(false);
  //       });
  //   }
  // };

  // const handleChangePage = (event, newPage) => {
  //   console.log("pages ", newPage);
  //   setPage(newPage);
  //   console.log(
  //     dataTransaksi.length - rowsPerPage,
  //     "<",
  //     rowsPerPage * (page + 1)
  //   );
  //   if (dataTransaksi.length - rowsPerPage <= rowsPerPage * (page + 1)) {
  //     getData(dataTransaksi.length, 1);
  //   }
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <div>
      <ResponsiveAppBar>
        <Typography
          fontSize="24px"
          fontWeight={700}
          letterSpacing="-1px"
          color="#3D734D"
        >
          Unblock User
        </Typography>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id User</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((data) => {
                  console.log(data);
                  return (
                    <TableRow
                      key={data.idUserAdmin}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {data.idUserAdmin}
                      </TableCell>
                      <TableCell>{data.username}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleUnblock(data.idUserAdmin)}
                          color="success"
                        >
                          unblock
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Snackbar
          sx={{ height: "5%" }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Unblock User Success
          </Alert>
        </Snackbar>
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
    </div>
  );
}
