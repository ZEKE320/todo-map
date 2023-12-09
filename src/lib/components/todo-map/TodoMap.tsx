"use client";

import handleTodoMap from "@/lib/ts/todo-map/TodoMapHandler";
import { useEffect } from "react";
import "./todo-map.scss";

const TodoMap = () => {
  useEffect(() => {
    handleTodoMap("internal", "map");
  }, []);

  return <section id="todoMap" />;
};

export default TodoMap;
