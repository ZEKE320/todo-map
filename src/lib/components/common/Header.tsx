"use client";

import PageReloadingBtn from "@/lib/components/PageReloadingBtn";
import { darkTheme } from "@/lib/ts/mui/ThemeHandler";
import { HeaderData } from "@/lib/type";
import Menu from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const Header = ({ title }: HeaderData) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar elevation={0} position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {title}
          </Typography>
          <PageReloadingBtn label="次の目標を設定する"></PageReloadingBtn>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
