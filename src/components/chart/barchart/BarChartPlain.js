import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ModalDatePicker from "../../modal/datepicker/ModalDatePicker";
import "../ChartRegister";

const BarChartPlain = ({
  data,
  title,
  displaylegend,
  yAxisMax,
  IDConvert = true,
  isSuperAdmin = false,
  kabList = [],
  filterDistrictID,
  districtID,
}) => {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  //console.log here
  // console.log(districtID);
  return (
    <Box borderRadius="10px" boxShadow={2} p="1em">
      <Grid container py="1rem">
        <Grid item>
          <Typography fontSize="20px" fontWeight={700}>
            {title}
          </Typography>
        </Grid>
      </Grid>
      {isSuperAdmin && (
        <Stack pb="1em" direction="row" spacing={2}>
          {districtID === -1 ? (
            kabList.map((item, key) => (
              <Button variant="outlined" onClick={() => filterDistrictID(key)}>
                {item}
              </Button>
            ))
          ) : (
            <Button variant="outlined" onClick={() => filterDistrictID(-1)}>
              Clear Filter
            </Button>
          )}
        </Stack>
      )}
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              display: displaylegend,
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
                  if (IDConvert === true) {
                    return new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(value);
                  } else {
                    return value;
                  }
                },
              },
              suggestedMax: yAxisMax,
            },
          },
        }}
      />
    </Box>
  );
};
export default BarChartPlain;
