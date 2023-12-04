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
      springConstant: 1,
      springLength: 200,
      nodeDistance: 200,
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
      edgeMinimization: false,
      parentCentralization: true,
    },
  },
  interaction: {
    dragNodes: false,
    dragView: true,
    zoomView: true,
    navigationButtons: false,
    hover: true,
  },
};
