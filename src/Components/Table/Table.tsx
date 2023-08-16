import { Box, Grid, Button } from "@mui/material";
import NewTask from "../TaskCard/NewTask";
import TodayDate from "../Today/TodayDate";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';

const Table = () => {
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
      {/*<div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add task</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <NewTask />
            </div>
          </div>
        </div>
      </div>
    */}
    </>
  );
};

export default Table;
