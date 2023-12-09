import { Options } from "vis-network/peer/esm/vis-network";

/** 階層レイアウトのオプション */
const optionsHierarchic: Options = {
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
    dragNodes: false,
    dragView: true,
    zoomView: true,
    navigationButtons: false,
    hover: true,
  },
};

/** マップレイアウトのオプション */
const optionsMap: Options = {
  nodes: {
    shape: "dot",
    size: 24,
    font: {
      size: 12,
    },
    fixed: false,
  },
  edges: {
    width: 6,
    arrows: "to",
    color: {
      opacity: 0.7,
    },
    smooth: {
      enabled: true,
      type: "dynamic",
      forceDirection: "none",
      roundness: 0.2,
    },
  },
  physics: {
    solver: "repulsion",
    repulsion: {
      springLength: 10,
      springConstant: 0.01,
      nodeDistance: 250,
      damping: 0.75,
    },
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
    hover: true,
  },
};

/** オプション一覧 */
const availableOptions: { [key: string]: Options } = {
  hierarchic: optionsHierarchic,
  map: optionsMap,
};

/**
 * オプションを取得する
 * @param optionName オプション名
 * @returns オプション
 */
function getOptions(optionName: string) {
  const layoutNames = Object.keys(availableOptions);
  if (!layoutNames.includes(optionName)) {
    throw new Error(`レイアウト名が不正です: ${optionName}`);
  }

  return availableOptions[optionName];
}

/** デフォルトオプション */
let optionsDefault: Options = getOptions("map");

/**
 * デフォルトオプションを更新する
 * @param optionName オプション名
 */
function updateOptionsDefault(optionName: string) {
  optionsDefault = getOptions(optionName);
}

export { optionsDefault, updateOptionsDefault };
