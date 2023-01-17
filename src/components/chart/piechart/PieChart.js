import { Box, Container, Grid, Typography } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ModalDatePicker from "../../modal/datepicker/ModalDatePicker";

export default function PieChart(props) {
  const data = props.data;
  return (
    <Container
      sx={{
        boxShadow: 2,
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: props.marginTop,
      }}
    >
      <Box width="80%">
        <Grid container paddingBottom="2rem" paddingTop="1rem">
          <Grid item xs={6}>
            <Typography fontSize="20px" fontWeight={700}>
              {props.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="right"
            justifyContent="right"
          >
            <ModalDatePicker />
          </Grid>
        </Grid>
        <Pie
          data={data}
          options={{
            plugins: {
              legend: {
                display: props.displaylegend,
                position: "bottom",
                align: "center",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (value, index, values) => {
                    return new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(value);
                  },
                },
                suggestedMax: props.yAxisMax,
              },
            },
          }}
        />
        <Grid container paddingTop="2rem" paddingBottom="1rem">
          <Grid item xs={6}>
            <Typography fontWeight={500} fontSize="16px">
              Total Transaksi
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              fontWeight={500}
              fontSize="16px"
              display="flex"
              alignItems="right"
              justifyContent="right"
            >
              Rp. {props.total}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
