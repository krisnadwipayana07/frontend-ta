import React from "react";
import ResponsiveAppBar from "../components/appbar/ResponsiveAppBar";
import { datasetLaporanKabupaten } from "../utils/DataLaporanKabupatenDummy";
import { datasetLaporanPayment } from "../utils/DataLaporanPaymentDummy";
import { datasetLaporanpayment2 } from "../utils/DataLaporanPaymentDummy2";
import { baseApi } from "../utils/Api";
import axios from "axios";
import { GeneralContext } from "../context/GeneralContext";
import Loading from "../components/loading";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import jwt_decode from "jwt-decode";
import { autoLogOffTime } from "../utils/AutoLogOffTime";
import sweetAlert from "sweetalert";

export default function Homepage() {
  // Enter Dummy Data for Testing
  const data_laporan_kabupaten = datasetLaporanKabupaten;
  const data_laporan_by_payment = datasetLaporanpayment2;

  const [isLoading, setIsLoading] = React.useState(true);
  const [dataKabupaten, setDataKabupaten] = React.useState([]);
  const [dataKabupatenList, setDataKabupatenList] = React.useState(null);
  const [dataPayment, setDataPayment] = React.useState([]);
  const [dataPaymentList, setDataPaymentList] = React.useState(null);
  const IDRConvert = Intl.NumberFormat("id-ID");
  const endPointKabupaten = "/v1/dashboard/kabupaten";
  const endPointPayment = "/v1/dashboard/paymentType";

  const { filterData, setFilterData, filterDashboard, setFilterDashboard } =
    React.useContext(GeneralContext);

  const { reload, setReload } = React.useContext(GeneralContext);

  const getDataPayment = () => {
    axios
      .get(baseApi + endPointPayment, {
        params: {
          dateStart: filterData.dateStart,
          dateEnd: filterData.dateEnd,
        },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setDataPaymentList(res.data.data);
        setDataPayment(res.data.data.analytics);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataKabupaten = () => {
    console.log(filterDashboard);
    axios
      .get(baseApi + endPointKabupaten, {
        params: {
          dateStart: filterDashboard.dateStart,
          dateEnd: filterDashboard.dateEnd,
        },
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setDataKabupatenList(res.data.data);
        setDataKabupaten(res.data.data.analytics);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStartDatePayment = (newStartDate) => {
    setFilterData({
      ...filterData,
      dateStart: parseInt((newStartDate.getTime() / 1000).toFixed(0)),
    });
  };

  const handleEndDatePayment = (newEndDate) => {
    setFilterData({
      ...filterData,
      dateEnd: parseInt((newEndDate.getTime() / 1000).toFixed(0)),
    });
  };

  const handleStartDateKabupaten = (newStartDate) => {
    setFilterDashboard({
      ...filterDashboard,
      dateStart: parseInt((newStartDate.getTime() / 1000).toFixed(0)),
    });
  };

  const handleEndDateKabupaten = (newEndDate) => {
    setFilterDashboard({
      ...filterDashboard,
      dateEnd: parseInt((newEndDate.getTime() / 1000).toFixed(0)),
    });
  };

  console.log(dataPaymentList);

  const dataLaporanKabupeten = {
    labels: [
      "Penglipuran",
      "Alun Alun Kota Bangli",
      "Desa Trunyan",
      "Air Terjun Pengibul",
      "Museum Geopark Batur",
      "Air Terjun Dusun Kuning",
      "Toya Bungkah",
      // dataKabupatenList?.list[12].kabupaten,
    ],
    datasets: [
      {
        data: [
          dataKabupatenList?.list[0].total,
          dataKabupatenList?.list[1].total,
          dataKabupatenList?.list[2].total,
          dataKabupatenList?.list[3].total,
          dataKabupatenList?.list[4].total,
          dataKabupatenList?.list[5].total,
          dataKabupatenList?.list[6].total,
          dataKabupatenList?.list[7].total,
          dataKabupatenList?.list[8].total,
          dataKabupatenList?.list[9].total,
          dataKabupatenList?.list[10].total,
          dataKabupatenList?.list[11].total,
          // dataKabupatenList?.list[12].total,
        ],
        backgroundColor: "#3D734D",
        barPercentage: 0.5,
      },
    ],
  };

  const dataLaporanPayment = {
    labels: [
      dataPaymentList?.list[0].payment_type,
      dataPaymentList?.list[1].payment_type,
      "VA BPD Bali",
      dataPaymentList?.list[3].payment_type,
      dataPaymentList?.list[4].payment_type,
      dataPaymentList?.list[5].payment_type,
      dataPaymentList?.list[6].payment_type,
      dataPaymentList?.list[7].payment_type,
    ],
    datasets: [
      {
        data: [
          dataPaymentList?.list[0].total,
          dataPaymentList?.list[1].total,
          dataPaymentList?.list[2].total,
          dataPaymentList?.list[3].total,
          dataPaymentList?.list[4].total,
          dataPaymentList?.list[5].total,
          dataPaymentList?.list[6].total,
          dataPaymentList?.list[7].total,
        ],
        backgroundColor: "#3D734D",
        barPercentage: 0.3,
      },
    ],
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

    getDataKabupaten();
    getDataPayment();
    setIsLoading(false);
  }, [filterData]);

  console.log();

  return (
    <div>
      <ResponsiveAppBar>
        <Box
          className="welcome"
          width="100%"
          height="50vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography
            variant="h4"
            component="h2"
            color="grey.500"
            fontWeight="medium"
          >
            Selamat Datang di
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            color="gray"
            fontWeight="bold"
          >
            Dashboard - Restaurant
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            color="grey.500"
            fontWeight="bold"
            pt="1em"
          >
            Implementasi Business Intelligence Pada Restoran dengan menggunakan
            Metode Online Analytical Processing
          </Typography>
          <Typography
            variant="h5"
            component="h1"
            color="grey.500"
            fontWeight="bold"
          >
            I Kadek Krisna Dwi Payana (1908561100)
          </Typography>
        </Box>
      </ResponsiveAppBar>
      <Loading loading={isLoading} />
    </div>
  );
}
