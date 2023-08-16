import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Navbar = ({ value, setValue } : {value:number , setValue: React.Dispatch<React.SetStateAction<number>>}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
        >
          <Tab label="Message" />
          <Tab label="Today's Task" />
          <Tab label="Last Activity" />
        </Tabs>
      </Box>
    </>
  );
};
export default Navbar;
