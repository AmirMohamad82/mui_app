import {
  selectOpenTasks,
  selectClosedTasks,
  selectTotalTasks,
  filter,
} from "../../Features/FeatureTask/TaskSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Typography } from "@mui/material";

const State = () => {
  const dispatch = useAppDispatch();
  const openTasks: number = useAppSelector(selectOpenTasks);
  const closedTasks: number = useAppSelector(selectClosedTasks);
  const totalTasks: number = useAppSelector(selectTotalTasks);
  const [stateIndex, setStateIndex] = useState<number>(0);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={stateIndex}
          onChange={(event, newValue) => {
            setStateIndex(newValue);
            dispatch(filter(newValue));
          }}
        >
          <BottomNavigationAction
            label={
              <Typography component="span">
                All{" "}
                <Box
                  component="span"
                  sx={{
                    borderRadius: "50%",
                    p: "4px",
                    pt: 0,
                    pb: 0,
                    bgcolor: `${stateIndex === 0 ? "#1989E2" : "#666666"}`,
                    color: "#fff",
                  }}
                >
                  {totalTasks}
                </Box>
              </Typography>
            }
            sx={{ mt: "10px", mb: "10px" }}
          />
          <BottomNavigationAction
            label={
              <Typography component="span">
                Open{" "}
                <Box
                  component="span"
                  sx={{
                    borderRadius: "50%",
                    p: "4px",
                    pt: 0,
                    pb: 0,
                    bgcolor: `${stateIndex === 1 ? "#1989E2" : "#666666"}`,
                    color: "#fff",
                  }}
                >
                  {openTasks}
                </Box>
              </Typography>
            }
            sx={{ mt: "10px", mb: "10px" }}
          />
          <BottomNavigationAction
            label={
              <Typography component="span">
                Close{" "}
                <Box
                  component="span"
                  sx={{
                    borderRadius: "50%",
                    p: "4px",
                    pt: 0,
                    pb: 0,
                    bgcolor: `${stateIndex === 2 ? "#1989E2" : "#666666"}`,
                    color: "#fff",
                  }}
                >
                  {closedTasks}
                </Box>
              </Typography>
            }
            sx={{ mt: "10px", mb: "10px" }}
          />
          <BottomNavigationAction
            label={
              <Typography component="span">
                Archived{" "}
                <Box
                  component="span"
                  sx={{
                    borderRadius: "50%",
                    p: "4px",
                    pt: 0,
                    pb: 0,
                    bgcolor: `${stateIndex === 3 ? "#1989E2" : "#666666"}`,
                    color: "#fff",
                  }}
                >
                  0
                </Box>
              </Typography>
            }
            sx={{ mt: "10px", mb: "10px" }}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default State;
