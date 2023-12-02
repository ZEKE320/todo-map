"use client";

import { ButtonData } from "@/lib/type";
import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import Button from "@mui/material/Button";
import { useState } from "react";
import { initTodoMap } from "../ts/TodoMapHandler";

const PageReloadingBtn = ({ label }: ButtonData) => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    // シードを変更して再描画
    initTodoMap();
    setLoading(false);
  };

  return (
    <div>
      <Button
        id="refreshButton"
        variant="contained"
        onClick={() => handleLoading()}
      >
        {label}
      </Button>
      <Backdrop sx={{ color: "#fff" }} open={loading}>
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>
    </div>
  );
};

export default PageReloadingBtn;
