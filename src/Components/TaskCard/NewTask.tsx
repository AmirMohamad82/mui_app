import { FormEvent, useState } from "react";
import { AddTask, fetchTasks } from "../../Features/FeatureTask/TaskSlice";
import { Error, Success, Warning } from "../..";
import { useAppDispatch } from "./../../Store/hook";
import { Box, Button, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Dayjs } from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface TaskType {
  title: string;
  description: string;
  unixTime: number;
  done: boolean;
}

const NewTask = ({ Close, Open }: { Close: () => void; Open: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>();
  const done: boolean = false;
  const dispatch = useAppDispatch();

  const addTask = async (task: TaskType) => {
    await dispatch(AddTask(task));
    await dispatch(
      fetchTasks({
        error: (error) => {
          Error(error);
        },
      })
    );
    window.scrollTo(0, document.body.scrollHeight);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test");
    if (!title && !description && !date) {
      Warning("Please fill out the form correctly");
      Open()
      return;
    }

    const time: Date = new Date(String(date));
    const unixTime: number = Math.floor(time.getTime() / 1000);

    addTask({ title, description, unixTime, done });

    setTitle("");
    setDescription("");
    setDate(null);

    Success("Task added successfully");
  };

  return (
    <>
      <Box component="div">
        <Box
          component="form"
          sx={{
            textAlign: "center",
            "& .MuiTextField-root": { mb: 2, width: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <Box component="div">
            <TextField
              id="title"
              label="Title"
              multiline
              value={title}
              onInput={(event) =>
                setTitle((event.target as HTMLTextAreaElement).value)
              }
            />
            <TextField
              id="description"
              label="Description"
              multiline
              value={description}
              onInput={(event) =>
                setDescription((event.target as HTMLTextAreaElement).value)
              }
              rows={4}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <MobileDateTimePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  disablePast
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddTaskIcon />}
              onClick={Close}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewTask;
