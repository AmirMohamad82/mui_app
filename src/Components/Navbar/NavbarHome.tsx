import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface PropsType {
  window?: () => Window;
  index: number;
}

const NavbarHome = ({ index, window }: PropsType) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const navItems: string[] = ["Home", "Login", "SignUp"];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Tasks Manager
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handle(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handle = (item: string) => {
    switch (item) {
      case "Home": {
        navigate("/");
        break;
      }
      case "Login": {
        navigate("/login");
        break;
      }
      case "SignUp": {
        navigate("/signup");
        break;
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#1976d2",
            borderRadius: "50px",
            width: "90%",
            ml: "5%",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Tasks Manager
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={() => handle(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
    // <nav className="navbar navbar-dark navbar-expand-lg bg-secondary m-3 rounded-5">
    //   <div className="container-fluid">
    //     <div className="navbar-header">
    //       <span className="navbar-brand h1">Tasks Manager</span>
    //     </div>
    //     <div className="navbar-brand">
    //       <button
    //         className="navbar-toggler btn btn-default float-end"
    //         onClick={toggleCollapse}
    //       >
    //         <FiMenu style={{ fontSize: "30px" }} />
    //       </button>
    //     </div>
    //     <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item p-2">
    //           <Link to="/">
    //             <button
    //               className={
    //                 index === 1
    //                   ? "text-white btn btn-secondary active"
    //                   : "text-white btn btn-secondary"
    //               }
    //             >
    //               Home
    //             </button>
    //           </Link>
    //         </li>
    //         <li className="nav-item p-2">
    //           <Link to="/login">
    //             <button
    //               className={
    //                 index === 2
    //                   ? "text-white btn btn-secondary active"
    //                   : "text-white btn btn-secondary"
    //               }
    //             >
    //               Login
    //             </button>
    //           </Link>
    //         </li>
    //         <li className="nav-item p-2">
    //           <Link to="/signup">
    //             <button
    //               className={
    //                 index === 3
    //                   ? "text-white btn btn-secondary active"
    //                   : "text-white btn btn-secondary"
    //               }
    //             >
    //               Sign Up
    //             </button>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   <Outlet />
    // </nav>
  );
};

export default NavbarHome;
