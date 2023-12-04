/** スタート ノードID */
export const START_NODE_ID = 0;
/** ゴール ノードID */
export const GOAL_NODE_ID = Number.MAX_SAFE_INTEGER;

/** テキストカラー */
export const TEXT_COLORS = {
  highlighted: "#D0F288",
  normal: "#96F8F4",
  fade: "#939495",
};

/** 進捗カラー */
export const PROGRESS_COLORS = {
  start: "#D0F288", // 現在
  undone: "#f9fafc", // 未達成
  done: "#86E8E4", // 達成済み
  achievable: "#6495ED", // 達成可能
  path: "#FFD700", // 達成済みのパス
  goal: "#DF826C", // 目標
};
