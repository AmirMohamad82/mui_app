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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const User = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
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
                      <EmailIcon color="primary" />
                    </IconButton>
                    <Typography component="span" sx={{ flexGrow: 1 }}>
                      {window.localStorage.getItem("email")}
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleClickOpen}>
                  <Box sx={{ flexGrow: 1 }}>
                    <IconButton
                      size="large"
                      aria-label="Logout"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <LogoutIcon color="error" />
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
            Are you sure you want to Logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Button variant="contained" color="error" onClick={handleClickClose}>
              No
            </Button>{" "}
            <Button variant="contained" color="success" onClick={logout}>
              Yes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
