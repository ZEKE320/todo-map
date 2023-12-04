"use client";

import TodoMapHandler from "@/lib/ts/todo-map/TodoMapHandler";
import { useEffect } from "react";
import "./todo-map.scss";

const TodoMap = () => {
  useEffect(() => {
    TodoMapHandler();
  }, []);

  return <section id="todoMap"></section>;
};

export default TodoMap;
