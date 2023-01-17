import { SimpleGrid } from "@chakra-ui/react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import sweetAlert from "sweetalert";
import ResponsiveAppBar from "../components/appbar/ResponsiveAppBar";
import TotalCard from "../components/card/card-total/TotalCard";
import BarChartPlain from "../components/chart/barchart/BarChartPlain";
import LineChart from "../components/chart/linechart/LineChart";
import { GeneralContext } from "../context/GeneralContext";
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

  const [labelID, setLabelID] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  const { filterData, filterDashboard, reload, setReload } =
    React.useContext(GeneralContext);

  //Dummy Data (can delete if distrubing)

  const paramsData = {
    dateStart: filterDashboard.dateStart,
    dateEnd: filterDashboard.dateEnd,
    districtID: filterDistrict,
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

  React.useEffect(() => {
    GetTotalBySales()
      .then((res) => {
        setTotalSalesByCashier(res.data.data);
        const total = res.data.data?.data.reduce(
          (total, item) => total + item,
          0
        );
        setSalesTotal(total);
      })
      .catch((err) => console.log(err));
    GetProductSales()
      .then((res) => {
        setProductSales(res.data.data);
        const total = res.data.data?.data.reduce(
          (total, item) => total + item,
          0
        );
        setTotalProductSales(total);
      })
      .catch((err) => console.log(err));
    GetSalesByDay().then((res) => {
      const data = res.data.data;
      setSalesByDay(data);
    });
  }, []);

  const handleFilterDistrict = (value) => {
    // console.log(labelID[value]);
    setFilterDistrict(value !== -1 ? labelID[value] : -1);
  };

  //put console.log here
  // console.log(transactionData);

  return (
    <Box>
      <ResponsiveAppBar>
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
          <TotalCard
            judul="Total Product Terjual"
            total={totalProductSales + " pcs"}
          />
          <TotalCard
            judul="Total Product Terjual"
            total={totalProductSales + " pcs"}
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
        </Grid>
      </ResponsiveAppBar>
    </Box>
  );
}
