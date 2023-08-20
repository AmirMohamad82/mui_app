import { Outlet, useNavigate } from "react-router-dom";
import NavbarHome from "../Components/Navbar/NavbarHome";
import { fetchLogin } from "../Features/FeatureLogin/LoginSlice";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "./../Store/hook";
import { Error } from "..";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import img from "./../Images/2018-welcome-blue-black.jpg";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";

interface UserType {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [User, setUser] = useState<UserType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/app");
    }
  }, [navigate]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchLogin({
        User,
        success: () => {
          navigate("/app");
        },
        fail: (error) => {
          Error(error);
        },
      })
    );
  };

  return (
    <>
      <NavbarHome index={2} />
      <Box component="div" sx={{ mt: 5 }}>
        <Box component="div" sx={{ textAlign: "center" }}>
          <Box component="img" src={img} alt="welcome" sx={{ width: "40%" }} />
        </Box>
        <Box
          component="form"
          sx={{
            textAlign: "center",
            "& .MuiTextField-root": { mt: 5, mb: 2, width: "75%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <Box component="div">
            <TextField
              label="Email"
              type="email"
              multiline
              required
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...User, email: event.target.value });
              }}
            />
            <FormControl
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...User, password: event.target.value });
              }}
              required
              sx={{
                textAlign: "center",
                mb: 2,
                width: "75%",
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" startIcon={<LoginIcon />}>
            Login
          </Button>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default Login;
