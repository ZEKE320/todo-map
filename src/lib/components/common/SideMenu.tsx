import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Menu from "@mui/icons-material/Menu";
import TungstenIcon from "@mui/icons-material/Tungsten";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

const SideMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={() => setOpenDrawer(true)}
      >
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        color="#030c12"
        elevation={1}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <TungstenIcon sx={{ marginRight: "1em" }} />
            達成できるTODO
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <DoneOutlineIcon sx={{ marginRight: "1em" }} />
            達成したTODO
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <UnpublishedIcon sx={{ marginRight: "1em" }} />
            まだ達成できないTODO
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideMenu;
