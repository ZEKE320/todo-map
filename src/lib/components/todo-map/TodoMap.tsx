"use client";

import TodoMapHandler from "@/lib/ts/TodoMapHandler";
import { useEffect } from "react";
import "./todo-map.scss";

const TodoMapCmp = () => {
  useEffect(() => {
    TodoMapHandler();
  }, []);

  return <section id="todoMap"></section>;
};

export default TodoMapCmp;
