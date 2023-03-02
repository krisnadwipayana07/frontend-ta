import { SimpleGrid } from "@chakra-ui/react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import sweetAlert from "sweetalert";
import ResponsiveAppBar from "../components/appbar/ResponsiveAppBar";
import TotalCard from "../components/card/card-total/TotalCard";
import BarChartPlain from "../components/chart/barchart/BarChartPlain";
import LineChart from "../components/chart/linechart/LineChart";
import ModalDatePicker from "../components/modal/datepicker/ModalDatePicker";
import { GeneralContext } from "../context/GeneralContext";
import { GetProductVisitGraph } from "../utils/api/ProductApi";
import {
  GetProductSales,
  GetSalesByDay,
  GetTotalBySales,
} from "../utils/api/TransactionApi";
import { IDRConvert } from "../utils/tools/IDRConvert";

function SplitDataLabel(dataList = []) {
  const data = [],
    label = [];
  if (dataList.length !== 0) {
    dataList.forEach((value) => {
      label.push(value.created_at);
      data.push(value.id);
    });
  }
  return { data, label };
}

function ErrorResult(err) {
  console.log(err);
  sweetAlert({
    title: "Error Fetching Data",
    text: "Terjadi Kesalahan saat memuat data, mohon coba lagi",
  });
}

export default function Dashboard(props) {
  const [filterDistrict, setFilterDistrict] = useState(-1);

  const [totalSalesByCashier, setTotalSalesByCashier] = useState([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [productSales, setProductSales] = useState([]);
  const [totalProductSales, setTotalProductSales] = useState(0);
  const [salesByDay, setSalesByDay] = useState([]);
  const [productVisit, setProductVisit] = useState([]);
  const [averageSales, setAverageSales] = useState(0);
  const [biggestVisit, setBiggestVisit] = useState(0);

  const [labelID, setLabelID] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  const { filterData, filterDashboard, reload, setReload } =
    React.useContext(GeneralContext);

  //Dummy Data (can delete if distrubing)

  const paramsData = {
    dateStart: filterDashboard.dateStart,
    dateEnd: filterDashboard.dateEnd,
  };

  const dataSalesByCashier = {
    labels: totalSalesByCashier?.label,
    datasets: [
      {
        data: totalSalesByCashier?.data,
        backgroundColor: "#1976d2",
        barPercentage: 0.5,
      },
    ],
  };
  const dataProductSales = {
    labels: productSales?.label,
    datasets: [
      {
        data: productSales.data,
        backgroundColor: "#1976d2",
        barPercentage: 0.5,
        label: "Jumlah",
      },
    ],
  };
  const dataTotalSalesPerDay = {
    labels: salesByDay?.label,
    datasets: [
      {
        data: salesByDay?.data,
        fill: false,
        borderColor: "#1976d2",
        barPercentage: 0.5,
      },
    ],
  };
  const dataProductVisit = {
    labels: productVisit?.label,
    datasets: [
      {
        data: productVisit?.data,
        backgroundColor: "#1976d2",
        barPercentage: 0.5,
        label: "Jumlah",
      },
    ],
  };

  React.useEffect(() => {
    GetTotalBySales(paramsData)
      .then((res) => {
        setTotalSalesByCashier(res.data.data);
        const total = res.data.data?.data.reduce(
          (total, item) => total + item,
          0
        );
        setSalesTotal(total);
      })
      .catch((err) => console.log(err));
    GetProductSales(paramsData)
      .then((res) => {
        setProductSales(res.data.data);
        const total = res.data.data?.data.reduce(
          (total, item) => total + item,
          0
        );
        setTotalProductSales(total);
      })
      .catch((err) => console.log(err));
    GetSalesByDay(paramsData).then((res) => {
      const data = res.data.data;
      setSalesByDay(data);
      let temp = 0;
      data.data.map((item) => (temp = temp + item));
      setAverageSales(Math.round(temp / data.data.length));
    });
    GetProductVisitGraph(paramsData).then((res) => {
      const data = res.data.data;
      setProductVisit(data);
      setBiggestVisit(Math.max(...data.data));
    });
  }, [filterDashboard]);

  const handleFilterDistrict = (value) => {
    // console.log(labelID[value]);
    setFilterDistrict(value !== -1 ? labelID[value] : -1);
  };

  //put console.log here
  // console.log(transactionData);

  return (
    <Box>
      <ResponsiveAppBar>
        <Box display="flex" justifyContent="end" mb="1em">
          <ModalDatePicker />
        </Box>
        <SimpleGrid columns={[1, 4]} spacing={10} pb="16">
          <Box>
            <TotalCard
              judul="Total Pendapatan"
              total={IDRConvert.format(salesTotal)}
            />
          </Box>
          <Box>
            <TotalCard
              judul="Total Product Terjual"
              total={totalProductSales + " pcs"}
            />
          </Box>
          <TotalCard judul="Rata - Rata Transaksi" total={averageSales} />
          <TotalCard
            judul="Pengunjungan produk tertinggi"
            total={biggestVisit + " kali"}
          />
        </SimpleGrid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BarChartPlain
              title="Total Sales By Cashier"
              data={dataSalesByCashier}
              displaylegend={false}
              yAxisMax={10000}
            />
          </Grid>
          <Grid item xs={6}>
            <BarChartPlain
              displaylegend={false}
              data={dataProductSales}
              title="Product Sales With Qty"
              IDConvert={false}
              yAxisMax={10}
            />
          </Grid>
          <Grid item xs={6}>
            <LineChart
              data={dataTotalSalesPerDay}
              marginTop="5rem"
              title="Total Sales Per Day"
              IDConvert={false}
              total={IDRConvert.format(totalPayment)}
              displaylegend={false}
              yAxisMax={10}
              beginAtZero={true}
            />
          </Grid>
          <Grid item xs={6}>
            <BarChartPlain
              displaylegend={false}
              data={dataProductVisit}
              title="Product Visit"
              IDConvert={false}
              yAxisMax={10}
            />
          </Grid>
        </Grid>
      </ResponsiveAppBar>
    </Box>
  );
}
