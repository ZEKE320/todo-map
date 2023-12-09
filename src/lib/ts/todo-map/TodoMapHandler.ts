import {
  GOAL_NODE_ID,
  PROGRESS_COLORS,
  START_NODE_ID,
  TEXT_COLORS,
} from "@/lib/ts/todo-map/TodoMapConstants";
import { data, initData } from "@/lib/ts/vis.js/Dataset";
import { optionsDefault } from "@/lib/ts/vis.js/Options";
import {
  DataSetNodes,
  IdType,
  Network,
  Node,
} from "vis-network/peer/esm/vis-network";

/** 目標達成済みならばtrue */
export let achievedGoal = false;

/** 達成可能なノードID一覧 */
export const achievableNodeIds = new Set<IdType>([START_NODE_ID]);

/** ネットワーク図 */
export let network: Network | null = null;

/**
 * ノードリンクを初期化する
 */
export function initTodoMap() {
  if (network === null) {
    alert("ネットワークが見つかりません！");
    throw new Error("ネットワークが見つかりません！");
  }

  // 描画用シードを更新
  const newSeed = Math.floor(Math.random() * 1000);
  network.setOptions({
    ...optionsDefault,
    layout: { ...optionsDefault.layout, randomSeed: newSeed },
  });

  // データを初期化
  initData();
  network.setData(data);

  // 達成可能なノード一覧を初期化
  achievableNodeIds.clear();
  updateAchievableNodes(START_NODE_ID);

  // ゴール達成フラグを初期化
  achievedGoal = false;

  // 目標再設定ボタンを非表示にする
  const refreshButtonElem = document.querySelector("#refreshButton");
  if (refreshButtonElem) {
    (refreshButtonElem as HTMLElement).style.display = "none";
  }
}

function handleTodoMap() {
  /** ネットワークコンテナ */
  const todoMapElem: HTMLElement | null = document.querySelector("#todoMap");

  if (!todoMapElem) {
    alert("ノードリンクが見つかりません!");
    throw new Error("ノードリンクが見つかりません！");
  }

  // NOTE データを指定しなければ初期化できないため、ダミーデータを指定。その後すぐにデータを更新する
  network = new Network(todoMapElem, {}, optionsDefault);
  initTodoMap();

  network.on("click", (props: { nodes: IdType[] }) => {
    // 選択したノードが単一でなければ何もしない
    if (props.nodes.length !== 1) {
      return;
    }

    const nodeId: IdType = props.nodes[0];
    const node: Node | null = (data.nodes as DataSetNodes).get(nodeId);
    if (!node) {
      alert("選択したノードが見つかりません！");
      throw new Error("選択したノードが見つかりません！");
    }
    if (!network) {
      alert("ネットワークが見つかりません！");
      throw new Error("ネットワークが見つかりません！");
    }

    if (!achievableNodeIds.has(nodeId) || checkNodeIsDone(node)) {
      return;
    }

    // ノードを達成済みにする
    markAsDone(nodeId, node);

    // 達成パスの描画と達成アラートの表示
    plotGoalPathAndAlert(nodeId);
  });

  window.addEventListener("resize", () => adjustNetworkSize());
  document.addEventListener("DOMContentLoaded", () => adjustNetworkSize());

  adjustNetworkSize();
}

/**
 * ノードリンク図のサイズを調整する
 */
function adjustNetworkSize() {
  const todoMapContainer: HTMLElement | null =
    document.querySelector("#todoMap");

  if (!todoMapContainer) {
    return;
  }

  const windowHeight: number = window.innerHeight;
  const headerHeight: number =
    document.querySelector("header")?.scrollHeight ?? 0;
  const footerHeight: number =
    document.querySelector("footer")?.scrollHeight ?? 0;
  const containerHeight: number = windowHeight - headerHeight - footerHeight;

  todoMapContainer.style.height = `${containerHeight}px`;

  setTimeout(() => {
    network?.fit();
  });
}

/**
 * ノードが達成済みかどうかをチェックする
 * @param node ノード
 * @returns 達成済みならばtrue
 */
function checkNodeIsDone(node: Node) {
  return node.color === PROGRESS_COLORS.done;
}

/**
 * ノードを達成済みにする
 */
function markAsDone(nodeId: IdType, node: Node) {
  (data.nodes as DataSetNodes).update({
    id: nodeId,
    color: PROGRESS_COLORS.done,
    font: {
      color: TEXT_COLORS.highlighted,
    },
    label: node.label + "\n(達成)",
  });

  updateAchievableNodes(nodeId);
}

/**
 * 達成可能なノード一覧を更新する
 * @param nodeId 現在のノードID
 */
function updateAchievableNodes(nodeId: IdType) {
  /** 隣接ノード */
  const connectedNodes = network?.getConnectedNodes(nodeId, "to");
  connectedNodes?.forEach(
    (connectedNodeId: IdType | { fromId: IdType; toId: IdType }) => {
      if (typeof connectedNodeId === "object") {
        connectedNodeId = connectedNodeId.toId; // IdTypeに変換
      }
      achievableNodeIds.add(connectedNodeId);

      /** 次のノード */
      const nextNode = (data.nodes as DataSetNodes).get(connectedNodeId);
      if (nextNode && nextNode.color !== PROGRESS_COLORS.goal) {
        // フォントカラーを更新し、ノードを有効化する
        (data.nodes as DataSetNodes).update({
          id: nextNode.id,
          font: { color: TEXT_COLORS.primary },
          borderWidth: 4,
        });
      }
    }
  );
}

/**
 * 目標達成時の達成パスを描画し、達成アラートを表示する
 * @param nodeId 現在のノードID
 */
function plotGoalPathAndAlert(nodeId: IdType) {
  const nextNodeIds: IdType[] | undefined = network
    ?.getConnectedNodes(nodeId, "to")
    .map((connectedNodeId: IdType | { fromId: IdType; toId: IdType }) => {
      if (typeof connectedNodeId === "object") {
        return connectedNodeId.toId;
      }
      return connectedNodeId;
    });

  const nextNodes = nextNodeIds?.map((nodeId) => {
    return (data.nodes as DataSetNodes).get(nodeId);
  });

  if (
    nextNodeIds?.includes(GOAL_NODE_ID) ||
    nextNodes?.some((nextNode) => nextNode?.color === PROGRESS_COLORS.path)
  ) {
    plotGoalPath();
    if (!achievedGoal) {
      const refreshButtonElem = document.querySelector("#refreshButton");
      if (refreshButtonElem) {
        (refreshButtonElem as HTMLElement).style.display = "block";
      }
      achievedGoal = true;

      setTimeout(() => {
        alertGoal();
      }, 20);
    }
  }
}

/**
 * 目標達成時の達成パスを描画する
 */
function plotGoalPath() {
  (data.nodes as DataSetNodes)?.forEach((node) => {
    if (node.color === PROGRESS_COLORS.done) {
      (data.nodes as DataSetNodes).update({
        id: node.id,
        color: PROGRESS_COLORS.path,
        label: node.label,
      });
    }
  });
}

/**
 * 目標達成時のアラート
 */
function alertGoal() {
  const confirmation = confirm(
    "おめでとうございます！目標を達成しました！次の目標を設定しますか？"
  );
  if (confirmation) {
    initTodoMap();
  }
}

export default handleTodoMap;
