"use client";

import PageReloadingBtn from "@/lib/components/PageReloadingBtn";
import { darkTheme } from "@/lib/ts/mui/ThemeHandler";
import { HeaderData } from "@/lib/type";
import Menu from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const Header = ({ title }: HeaderData) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar elevation={0} position="static">
        <Toolbar variant="dense">
          <Box
            sx={{
              marginRight: "auto",
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography
              variant="h4"
              fontFamily="inherit"
              fontWeight="bolder"
              color="inherit"
              component="div"
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <PageReloadingBtn label="次の目標を設定する"></PageReloadingBtn>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
