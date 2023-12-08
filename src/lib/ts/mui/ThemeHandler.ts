import grey from "@mui/material/colors/grey";
import createTheme from "@mui/material/styles/createTheme";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#1d2429",
      default: "#1d2429",
    },
    text: {
      primary: grey[50],
      secondary: grey[200],
    },
  },
});
