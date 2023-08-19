import { useState } from "react";
import i3 from "./../../Images/images (1).jpg";
import i4 from "./../../Images/images (2).jpg";
import i1 from "./../../Images/download.jpg";
import Date from "../ConvertDate/Date";
import {
  DeleteTask,
  fetchTasks,
  updateTask,
} from "../../Features/FeatureTask/TaskSlice";
import { Error, Success } from "../..";
import { useAppDispatch } from "./../../Store/hook";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";

interface TaskType {
  task: {
    title: string;
    description: string;
    date: number;
    done: boolean;
    id: number;
    userId: number;
    owner?: number;
  };
}

const Task = ({ task }: TaskType) => {
  const dispatch = useAppDispatch();
  const [finish, setFinish] = useState<boolean>(task.done);
  let tasks: string = "task";
  const people: string[] = [
    `${i3}`,
    `${i1}`,
    `${i4}`,
    `${i3}`,
    `${i1}`,
    `${i4}`,
    `${i3}`,
    `${i1}`,
    `${i4}`,
  ];
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const deleteTask = async () => {
    if (
      window.localStorage.getItem("id") !==
      window.localStorage.getItem("taskUserID")
    ) {
      Error("This task is not for you");
      return;
    }
    await dispatch(DeleteTask(Number(window.localStorage.getItem("taskID"))));
    await dispatch(
      fetchTasks({
        error: (error) => {
          Error(error);
        },
      })
    );
    Success("The task was successfully deleted");
    const element = document.getElementById(
      `${Number(window.localStorage.getItem("taskID")) - 1}`
    );
    const coordinate = element!.offsetTop;
    window.scrollTo(0, coordinate - 20);
  };

  const checked = () => {
    if (Number(window.localStorage.getItem("id")) !== task.userId) {
      Error("This task is not for you");
      return;
    }
    task = {
      ...task,
      done: !task.done,
    };
    dispatch(updateTask(task));
    setFinish(!finish);
    Success("The status change was successful");
    const element = document.getElementById(String(task.id));
    const coordinate = element!.offsetTop;
    window.scrollTo(0, coordinate - 20);
  };

  return (
    <>
      <Box
        component="div"
        className={tasks + `${finish ? " end" : ""}`}
        id={String(task.id)}
      >
        <Grid container spacing={0}>
          <Box component="section">
            <Box component="div">
              <Stack component="div" direction="row">
                <Grid xs={7}>
                  <Box
                    component={`${finish ? "s" : "span"}`}
                    sx={{
                      color: "#000",
                      fontWeight: "600",
                      fontSize: "18px",
                      textAlign: "left",
                    }}
                  >
                    {task?.title}
                  </Box>
                  <br />
                  <Box
                    component="span"
                    sx={{ color: "#666666", fontSize: "16px" }}
                  >
                    {task?.description}
                  </Box>
                </Grid>
                <Grid xs={5} textAlign={"right"}>
                  <Box component="span">
                    <Checkbox
                      checked={finish}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      onClick={checked}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                      }}
                    />
                    <Button
                      color="error"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 30 },
                      }}
                      startIcon={<DeleteOutlineIcon />}
                      onClick={() => {
                        window.localStorage.setItem(
                          "taskUserID",
                          String(task.userId)
                        );
                        window.localStorage.setItem("taskID", String(task.id));
                        handleClickOpen();
                      }}
                    />
                  </Box>
                </Grid>
              </Stack>
              <Divider variant="middle" sx={{ m: 2 }} />
              <Stack component="div" direction="row">
                <Grid xs={7}>
                  <Box component="div" className="date">
                    {Date(task.date)}
                  </Box>
                </Grid>
                <Grid xs={5} textAlign={"right"}>
                  <Box component="span">
                    <AvatarGroup max={4}>
                      {people.map((item, index) => (
                        <Avatar alt="people" src={item} key={index} />
                      ))}
                    </AvatarGroup>
                  </Box>
                </Grid>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Box>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ pt: "0", pb: "0", pr: "0" }}>
          <Box sx={{ textAlign: "right" }}>
            <IconButton aria-label="close" onClick={handleClickClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h5" sx={{ mt: "10px", mb: "10px" }}>
            Are you sure you want to delete tasks?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClickClose}
            >
              No
            </Button>{" "}
            <Button variant="contained" color="success" onClick={deleteTask}>
              Yes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;
