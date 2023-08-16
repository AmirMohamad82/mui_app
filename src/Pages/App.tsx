import Navbar from "../Components/Navbar/Navbar";
import Table from "../Components/Table/Table";
import Tasks from "../Components/TaskCard/Tasks";
import State from "../Components/Table/State";
import Loading from "../Components/Loading/Loading";
import { useEffect, useState } from "react";
import { fetchTasks } from "../Features/FeatureTask/TaskSlice";
import User from "../Components/Navbar/User";
import Welcome from "../Components/Welcome/Welcome";
import { useAppDispatch, useAppSelector } from "../Store/hook";
import { Error } from "..";
import Typography from "@mui/material/Typography";

const App = () => {
  const loading = useAppSelector((state) => state.task.loading);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    dispatch(
      fetchTasks({
        error: (error) => {
          Error(error);
        },
      })
    );
  }, [dispatch]);

  return (
    <>
      {Welcome()}
      <User />
      <Navbar value={value} setValue={setValue} />
      {value === 0 ? (
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "#FF5D39",
            display: "flex",
            justifyContent: "center",
            mt: "10%",
          }}
        >
          No Message yet!!
        </Typography>
      ) : (
        ""
      )}
      {value === 1 ? (
        <>
          <Table />
          <State />
          {loading ? <Loading /> : <Tasks />}
        </>
      ) : (
        ""
      )}
      {value === 2 ? (
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "#FF5D39",
            display: "flex",
            justifyContent: "center",
            mt: "10%",
          }}
        >
          No Activity yet!!
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
