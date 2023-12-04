import { Options } from "vis-network/peer/esm/vis-network";

/** オプション */
export const options: Options = {
  nodes: {
    shape: "dot",
    size: 12,
    font: {
      size: 12,
    },
    fixed: false,
  },
  edges: {
    width: 4,
    arrows: "to",
    color: {
      opacity: 0.7,
    },
    smooth: {
      enabled: true,
      type: "cubicBezier",
      forceDirection: "horizontal",
      roundness: 0.5,
    },
  },
  physics: {
    enabled: true,
    solver: "hierarchicalRepulsion",
    hierarchicalRepulsion: {
      avoidOverlap: 1,
      springConstant: 0.1,
      springLength: 370,
      nodeDistance: 50,
      damping: 1,
    },
  },
  layout: {
    hierarchical: {
      enabled: true,
      direction: "LR",
      sortMethod: "directed",
      shakeTowards: "roots",
      levelSeparation: 300,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
    },
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
    navigationButtons: false,
    hover: true,
  },
};
