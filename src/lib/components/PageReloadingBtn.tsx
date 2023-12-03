"use client";

import { initTodoMap } from "@/lib/ts/TodoMapHandler";
import { ButtonData } from "@/lib/type";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

const PageReloadingBtn = ({ label }: ButtonData) => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    // // シードを変更して再描画
    initTodoMap();
    setLoading(false);
  };

  return (
    <Box>
      <Button
        id="refreshButton"
        variant="contained"
        onClick={() => handleLoading()}
        sx={{ display: "none" }}
      >
        {label}
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    </Box>
  );
};

export default PageReloadingBtn;
