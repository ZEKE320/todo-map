import { Options } from "vis-network/peer/esm/vis-network";

/** オプション */
export const options: Options = {
  nodes: {
    shape: "dot",
    size: 24,
    font: {
      size: 12,
    },
  },
  edges: {
    width: 6,
    arrows: "to",
  },
  physics: {
    solver: "repulsion",
    repulsion: {
      centralGravity: 1,
      springLength: 50,
      springConstant: 0.01,
      nodeDistance: 300,
      damping: 0.75,
    },
  },
  interaction: {
    dragNodes: true,
    dragView: true,
  },
};
