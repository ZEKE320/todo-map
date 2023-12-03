"use client";

import PageReloadingBtn from "@/lib/components/PageReloadingBtn";
import { darkTheme } from "@/lib/ts/mui/ThemeHandler";
import { HeaderData } from "@/lib/type";
import MapIcon from "@mui/icons-material/Map";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import SideMenu from "@/lib/components/common/SideMenu";

const Header = ({ title }: HeaderData) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar elevation={0} position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <SideMenu />
            <Typography
              variant="h5"
              fontFamily="inherit"
              fontWeight="bolder"
              color="inherit"
              display="flex"
              alignItems="center"
              component="div"
            >
              {title}
              <MapIcon />
            </Typography>
          </Box>
          <Box>
            <PageReloadingBtn label="次の目標を設定する" />
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
