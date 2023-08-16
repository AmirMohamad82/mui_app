import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Success } from "../..";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";

const User = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Success("You have successfully logged out");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#74A5FA" }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Tasks Manager
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appBar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appBar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Box sx={{ flexGrow: 1 }}>
                    <IconButton
                      size="large"
                      aria-label="Email of user"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <EmailIcon />
                    </IconButton>
                    <Typography component="span" sx={{ flexGrow: 1 }}>
                      {window.localStorage.getItem("email")}
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Box sx={{ flexGrow: 1 }}>
                    <IconButton
                      size="large"
                      aria-label="Logout"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <LogoutIcon />
                    </IconButton>
                    <Typography component="span" sx={{ flexGrow: 1 }}>
                      Logout
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default User;
