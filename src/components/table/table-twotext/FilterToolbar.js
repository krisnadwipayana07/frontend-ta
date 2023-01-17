import { Box, Button, Grid, InputBase, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useContext, useState } from "react";
import FilterDialog from "../../dialog/FilterDialog";
import DateDialog from "../../dialog/DateDialog";
import { GeneralContext } from "../../../context/GeneralContext";

export default function EnhancedTableToolbar(props) {
  const [open, setOpen] = useState(false);
  const [openTanggal, setOpenTanggal] = useState(false);
  const { handleChange } = useContext(GeneralContext);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const HandleTanggalOpen = () => {
    setOpen(false);
    setOpenTanggal(true);
  };
  const HandleTanggalClose = () => {
    setOpenTanggal(false);
  };
  const HandlerFilter = (e) => {
    if (e.target.value.length === 0 || e.target.value.length >= 3) {
      handleChange(e);
      props.setIsLoading(true);
    }
  };

  return (
    <Toolbar
      sx={{
        py: "2vw",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <form>
        <Grid container spacing={3}>
          <Grid item>
            <Box
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "249px",
                border: "1px solid #CDCDCD",
                borderRadius: "10px",
              }}
            >
              <IconButton sx={{ p: "10px", ml: "1.5vw" }} aria-label="menu">
                <SearchIcon style={{ color: "green" }} />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nama Kasir"
                name="cashierName"
                onBlur={(e) => HandlerFilter(e)}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "249px",
                border: "1px solid #CDCDCD",
                borderRadius: "10px",
              }}
            >
              <IconButton sx={{ p: "10px", ml: "1.5vw" }} aria-label="menu">
                <SearchIcon style={{ color: "green" }} />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Objek Wisata"
                name="merchantName"
                onBlur={(e) => HandlerFilter(e)}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                px: "3vw",
                borderRadius: "10px",
                py: "1.5vh",
              }}
              onClick={onOpen}
            >
              <FilterAltIcon sx={{ color: "green", mr: "0.5vw" }} />
              Filter
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                px: "3vw",
                borderRadius: "10px",
                py: "1.5vh",
              }}
              onClick={() => props.download("xlsx")}
            >
              Download .xlsx
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                px: "3vw",
                borderRadius: "10px",
                py: "1.5vh",
              }}
              onClick={() => props.download("pdf")}
            >
              Download .pdf
            </Button>
          </Grid>
        </Grid>
      </form>
      <FilterDialog
        open={open}
        handleClose={onClose}
        handleOpenTanggal={HandleTanggalOpen}
      />
      <DateDialog open={openTanggal} handleClose={HandleTanggalClose} />
    </Toolbar>
  );
}
