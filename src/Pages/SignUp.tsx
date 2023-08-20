import { Link, Outlet, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import NavbarHome from "../Components/Navbar/NavbarHome";
import axios from "axios";
import { Error } from "..";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import img from "./../Images/OIP.jpg";

interface SignUpType {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp = () => {
  const [signUp, setSignUp] = useState<SignUpType>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

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

    if (signUp.password !== signUp.repeatPassword) {
      Error("The password entered does not match its repetition");
      return;
    }

    axios
      .post("http://localhost:4000/register", {
        email: signUp.email,
        password: signUp.password,
      })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data?.accessToken}`);
        localStorage.setItem("id", res.data.user?.id);
        localStorage.setItem("email", res.data.user?.email);
        setSignUp({
          email: "",
          password: "",
          repeatPassword: "",
        });
        navigate("/app");
      })
      .catch((error) => {
        Error(error.response.data);
      });
  };

  return (
    <>
      <NavbarHome index={3} />
      <Box component="div" sx={{ mt: 1 }}>
        <Box component="div" sx={{ textAlign: "center" }}>
          <Box component="img" src={img} alt="welcome" sx={{ width: "30%" }} />
        </Box>
        <Box component="div" sx={{ textAlign: "left", ml: "12.5%" }}>
          <Box component="p">
            Please fill in this form to create an account.
          </Box>
        </Box>
        <Box
          component="form"
          sx={{
            textAlign: "center",
            "& .MuiTextField-root": { mt: 1, mb: 2, width: "75%" },
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
                setSignUp({ ...signUp, email: event.target.value });
              }}
            />
            <FormControl
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSignUp({ ...signUp, password: event.target.value });
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
            <FormControl
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSignUp({ ...signUp, repeatPassword: event.target.value });
              }}
              required
              sx={{
                textAlign: "center",
                mb: 2,
                width: "75%",
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="repeatPassword">Repeat password</InputLabel>
              <OutlinedInput
                id="repeatPassword"
                type={showRepeatPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="repeatPassword"
              />
            </FormControl>
          </Box>
          <Box component="p">
            By creating an account you agree to our{" "}
            <Link to="/#">Terms & Privacy</Link>.
          </Box>
          <Button
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            signUp
          </Button>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default SignUp;
