import { useEffect, useState } from "react";
import { ClosedTasks, OpenTasks } from "../../Features/FeatureTask/TaskSlice";
import Task from "./Task";
import { useAppSelector } from "./../../Store/hook";
import { Box, Typography } from "@mui/material";

interface TaskType {
  title: string;
  description: string;
  date: number;
  done: boolean;
  id: number;
  userId: number;
  owner?: number;
}

const Tasks = () => {
  const tasks = useAppSelector((state) => state.task.tasks);
  const allTasks = tasks;
  const openTasks = useAppSelector(OpenTasks);
  const closedTasks = useAppSelector(ClosedTasks);
  const filter = useAppSelector((state) => state.task?.filter);
  const [Case, setCase] = useState<number>(0);

  useEffect(() => {
    setCase(filter);
  }, [filter]);

  return (
    <>
      {tasks?.length ? (
        <>
          {Case === 0 &&
            allTasks!.map((task: TaskType) => (
              <Task key={task.id} task={task} />
            ))}
          {Case === 1 &&
            openTasks!.map((task: TaskType) => (
              <Task key={task.id} task={task} />
            ))}
          {Case === 2 &&
            closedTasks!.map((task: TaskType) => (
              <Task key={task.id} task={task} />
            ))}
        </>
      ) : (
        <Box component="div" sx={{ textAlign: "center" }}>
          <Typography
            component="span"
            sx={{ color: "error", fontSize: "20px" }}
          >
            No tasks to show!!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Tasks;
