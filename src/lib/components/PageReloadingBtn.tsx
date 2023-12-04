"use client";

import { initTodoMap } from "@/lib/ts/todo-map/TodoMapHandler";
import { ButtonData } from "@/lib/type";
import LoadingButton from "@mui/lab/LoadingButton";
import { Backdrop } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const PageReloadingBtn = ({ label }: ButtonData) => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    // シードを変更して再描画
    setTimeout(() => {
      initTodoMap();
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <LoadingButton
          id="refreshButton"
          variant="contained"
          size="small"
          loading={loading}
          loadingPosition="end"
          endIcon={<CircularProgress size="20px" />}
        >
          {label}
        </LoadingButton>
      ) : (
        <Button
          id="refreshButton"
          variant="contained"
          size="small"
          onClick={() => handleLoading()}
          sx={{ display: "none" }}
        >
          {label}
        </Button>
      )}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PageReloadingBtn;
