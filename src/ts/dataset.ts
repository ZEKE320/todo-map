import {
  START_NODE_ID,
  PROGRESS_COLORS,
  TEXT_COLORS,
  GOAL_NODE_ID,
} from "ts/constants";
import { DataSet } from "vis-data";
import { DataSetEdges, DataSetNodes, Edge } from "vis-network";

export const dataSetNodes: DataSetNodes = new DataSet([
  {
    id: START_NODE_ID,
    label: "現在:\n人と話すことが得意ではない",
    color: PROGRESS_COLORS.start,
    x: 0, // x座標を0に設定
    y: 0, // y座標を0に設定
    fixed: true,
    font: {
      color: TEXT_COLORS.highlighted,
    },
    borderWidth: 5,
  },
  {
    id: 2,
    label: "Task\nピンポンルールをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 3,
    label: "Task\n信号機ルールをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 4,
    label: "Task\n一時停止ルールをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 5,
    label: "Task\nAnchorをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 6,
    label: "Task\nRevealをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 7,
    label: "Task\nEncourageをマスターする",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 8,
    label: "Task\n今日の良い出来事を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 9,
    label: "Task\n熱心に取り組んでいる活動を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 10,
    label: "Task\nわくわくした出来事を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 11,
    label: "Task\n最近の出来事を聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },
  {
    id: 12,
    label: "Task\n最近の出来事をどう感じたか聞くことができる",
    color: PROGRESS_COLORS.undone,
    font: {
      color: TEXT_COLORS.fade,
    },
  },

  {
    id: GOAL_NODE_ID,
    label: "理想:\n初対面でもしばらく会話を続けられる",
    color: PROGRESS_COLORS.goal,
    x: 1500,
    y: -500,
    fixed: true,
    font: {
      color: TEXT_COLORS.highlighted,
    },
    borderWidth: 5,
  },
]);

/** エッジ */
export const edges: Edge[] = [
  { from: START_NODE_ID, to: 2 },
  { from: START_NODE_ID, to: 3 },
  { from: START_NODE_ID, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
  { from: 3, to: 7 },
  { from: 3, to: 8 },
  { from: 4, to: 9 },
  { from: 4, to: 10 },
  { from: 5, to: 11 },
  { from: 5, to: 8 },
  { from: 6, to: 9 },
  { from: 6, to: 12 },
  { from: 7, to: GOAL_NODE_ID },
  { from: 8, to: GOAL_NODE_ID },
  { from: 9, to: GOAL_NODE_ID },
  { from: 9, to: 11 },
  { from: 10, to: GOAL_NODE_ID },
  { from: 11, to: GOAL_NODE_ID },
  { from: 12, to: GOAL_NODE_ID },
];

/** データセットエッジ */
export const dataSetEdges: DataSetEdges = new DataSet(edges);
