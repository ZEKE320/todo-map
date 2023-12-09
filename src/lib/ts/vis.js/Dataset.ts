import {
  GOAL_NODE_ID,
  PROGRESS_COLORS,
  START_NODE_ID,
  TEXT_COLORS,
} from "@/lib/ts/todo-map/TodoMapConstants";
import TodoMapDataSets from "@/lib/ts/todo-map/TodoMapDataSet";
import { DataSet } from "vis-data";
import { Data, DataSetEdges, DataSetNodes, Edge, Node } from "vis-network";

/** ノードリスト */
const baseNodes: Node[] = [
  {
    id: START_NODE_ID,
    label: "現在｜人と話すことが得意ではない",
    color: PROGRESS_COLORS.start,
    x: 0,
    y: 0,
    fixed: true,
    font: {
      color: TEXT_COLORS.highlighted,
    },
    borderWidth: 5,
  },
  {
    id: 1,
    label: "1｜ピンポンルールをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 2,
    label: "2｜信号機ルールをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 3,
    label: "3｜一時停止ルールをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 4,
    label: "4｜Anchorをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 5,
    label: "5｜Revealをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 6,
    label: "6｜Encourageをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 7,
    label: "7｜今日の良い出来事を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 8,
    label: "8｜熱心に取り組んでいる活動を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 9,
    label: "9｜わくわくした出来事を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 10,
    label: "10｜最近の出来事を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: 11,
    label: "11｜最近の出来事をどう感じたか聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.secondary,
    },
  },
  {
    id: GOAL_NODE_ID,
    label: "理想｜初対面でもしばらく会話を続けられる",
    color: PROGRESS_COLORS.goal,
    x: 1500,
    y: -500,
    fixed: true,
    font: {
      color: TEXT_COLORS.highlighted,
    },
    borderWidth: 5,
  },
];

/** エッジリスト */
const baseEdges: Edge[] = [
  { from: START_NODE_ID, to: 1 },
  { from: START_NODE_ID, to: 2 },
  { from: START_NODE_ID, to: 3 },
  { from: 1, to: 4 },
  { from: 1, to: 5 },
  { from: 2, to: 6 },
  { from: 2, to: 7 },
  { from: 3, to: 7 },
  { from: 3, to: 8 },
  { from: 3, to: 9 },
  { from: 4, to: 10 },
  { from: 4, to: 7 },
  { from: 5, to: 8 },
  { from: 5, to: 11 },
  { from: 6, to: 9 },
  { from: 7, to: 11 },
  { from: 7, to: GOAL_NODE_ID },
  { from: 8, to: GOAL_NODE_ID },
  { from: 8, to: 10 },
  { from: 9, to: 10 },
  { from: 9, to: 11 },
  { from: 10, to: GOAL_NODE_ID },
  { from: 11, to: GOAL_NODE_ID },
];

/** TodoMapのデータセット */
const todoMapDataSets = new TodoMapDataSets();

/** 利用可能なデータ */
const availableData: { [key: string]: Data } = {
  external: initDataExternal(),
  internal: initDataInternal(),
};

/**
 * モジュール内のベースデータを用いてデータを初期化する
 * @returns データ
 */
function initDataInternal(): Data {
  const nodes: DataSetNodes = initDataSetNodes(baseNodes);
  const edges: DataSetEdges = initDataSetEdges(baseEdges);

  return { nodes, edges };
}

/**
 * 外部モジュールのデータセットを用いてデータを初期化する
 * @returns データ
 */
function initDataExternal(): Data {
  const nodes: DataSetNodes = initDataSetNodes(todoMapDataSets.nodes);
  const edges: DataSetEdges = initDataSetEdges(todoMapDataSets.edges);

  return { nodes, edges };
}

/**
 * ノードリストを用いてデータセットノードを初期化する
 * @param nodes ノードリスト
 * @returns データセットノード
 */
function initDataSetNodes(nodes: Node[]): DataSetNodes {
  return new DataSet(
    nodes.map((node: Node): Node => JSON.parse(JSON.stringify(node)))
  );
}

/**
 * エッジリストを用いてデータセットエッジを初期化する
 * @param edges エッジリスト
 * @returns データセットエッジ
 */
function initDataSetEdges(edges: Edge[]): DataSetEdges {
  return new DataSet(
    edges.map((edge: Edge) => JSON.parse(JSON.stringify(edge)))
  );
}

/**
 * データセットを変更する
 */
function getData(dataName: string) {
  const dataNames = Object.keys(availableData);
  if (!dataNames.includes(dataName)) {
    throw new Error(`データ名が不正です: ${dataName}`);
  }
  return availableData[dataName];
}

/** デフォルトで用いるデータ */
let dataDefault: Data = getData("internal");

/**
 * データを初期化する
 */
function initData() {
  availableData["external"] = initDataExternal();
  availableData["internal"] = initDataInternal();
}

function updateDataDefault(dataName: string) {
  dataDefault = getData(dataName);
}

export { dataDefault, initData, updateDataDefault };

