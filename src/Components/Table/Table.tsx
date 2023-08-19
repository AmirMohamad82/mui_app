import { Box, Grid, Button, IconButton } from "@mui/material";
import NewTask from "../TaskCard/NewTask";
import TodayDate from "../Today/TodayDate";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Table = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container direction="row">
        <Grid xs={6} alignItems="center">
          <Box sx={{ textAlign: "center", mt: "30px" }}>
            <Typography
              component="p"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Today's Task <br />
              <Typography
                component="span"
                sx={{
                  fontSize: "14px",
                  color: "#B9B8B8",
                }}
              >
                <TodayDate />
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid xs={6} sx={{ textAlign: "center" }}>
          <Button
            disabled={false}
            size="large"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              mt: "35px",
              bgcolor: "#74A5FA",
            }}
          >
            <Typography component="span" sx={{ color: "#fff" }}>
              New Task
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{pt: "5px", pb: "5px" , pr: "0" , pl:"5px"}}>
          <Grid container direction="row">
            <Grid
              xs={8}
              alignItems="center"
              sx={{ textAlign: "left", mt: "5px" }}
            >
              <Typography variant="h5">Add new task</Typography>
            </Grid>
            <Grid xs={4} alignItems="center" sx={{ textAlign: "right" }}>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <NewTask Close={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Table;
