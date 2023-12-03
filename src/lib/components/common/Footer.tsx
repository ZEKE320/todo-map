import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { blueGrey } from "@mui/material/colors";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          <Box sx={{ mr: "1rem" }}>
            Author |{" "}
            <Link color={blueGrey.A700} href="https://github.com/ZEKE320">
              @ZEKE320
            </Link>
          </Box>{" "}
          <Box>
            Source |{" "}
            <Link
              color={blueGrey.A700}
              href="https://github.com/ZEKE320/todo-map"
            >
              GitHub
            </Link>
          </Box>
        </Box>
        <Box>
          Reference |{" "}
          <Link
            color={blueGrey.A700}
            href="https://www.youtube.com/watch?v=aPPQPCMrEzo"
          >
            メンタリスト DaiGo. (YouTube.com)
          </Link>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
