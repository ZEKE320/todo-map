export type TodoMapDataSet = {
  id: number; // ノードID
  title: string; // タイトル
  description: string; // 説明
  nextIds: number[]; // 次のノードID
};
