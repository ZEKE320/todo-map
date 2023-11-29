import { Font } from "vis";
import {
  Data,
  IdType,
  Network,
  Node,
  Options,
} from "vis-network/peer/esm/vis-network";
import {
  GOAL_NODE_ID,
  PROGRESS_COLORS,
  START_NODE_ID,
  TEXT_COLORS,
} from "ts/constants";
import { dataSetNodes, dataSetEdges } from "ts/dataset";

import "sass/task_graph.scss";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

/** 目標達成済みならばtrue */
let achievedGoal = false;

/** ネットワークコンテナ */
const networkContainer: HTMLElement | null =
  document.querySelector("#networkDiag");

if (!networkContainer) {
  alert("ノードリンクが見つかりません!");
  throw new Error("ノードリンクが見つかりません！");
}
/** データ */
const data: Data = { nodes: dataSetNodes, edges: dataSetEdges };

/** オプション */
const options: Options = {
  nodes: {
    shape: "dot",
    size: 16,
    font: {
      size: 12,
    },
  },
  edges: {
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

/** ネットワーク */
const network = new Network(networkContainer, data, options);

window.addEventListener("resize", () => {
  adjustNetworkSize();
});

document.addEventListener("DOMContentLoaded", () => {
  adjustNetworkSize();
});

/** 達成可能なノードID一覧 */
const achievableNodeIds = new Set<IdType>([START_NODE_ID]);

updateAchievableNodes(START_NODE_ID);

network.on("click", (data: Data) => {
  // 選択したノードが単一でなければ何もしない
  if (data.nodes?.length !== 1) {
    return;
  }
  const nodeId: IdType = data.nodes[0];
  const node: Node | null = dataSetNodes.get(nodeId);

  if (!node) {
    alert("選択したノードが見つかりません！");
    throw new Error("選択したノードが見つかりません！");
  }

  // クリックしたノードが達成可能ならば達成済みにする
  if (achievableNodeIds.has(nodeId) && node.color === PROGRESS_COLORS.undone) {
    markAsDone(nodeId, node);
  } else {
    return;
  }

  // 達成パスの描画と達成アラートの表示
  plotGoalPathAndAlert(nodeId);
});

/**
 * ノードリンク図のサイズを調整する
 */
function adjustNetworkSize() {
  const networkContainer: HTMLElement | null =
    document.querySelector("#networkDiag");

  if (!networkContainer) {
    return;
  }

  const headerHeight: number =
    document.querySelector("header")?.scrollHeight ?? 0;
  const footerHeight: number =
    document.querySelector("footer")?.scrollHeight ?? 0;
  const windowHeight: number = window.innerHeight;
  const networkHeight: number = windowHeight - headerHeight - footerHeight;
  networkContainer.style.height = `${networkHeight}px`;

  network.fit();
}

/**
 * 達成可能なノード一覧を更新する
 * @param nodeId 現在のノードID
 */
function updateAchievableNodes(nodeId: IdType) {
  /** 隣接ノード */
  const connectedNodes = network.getConnectedNodes(nodeId, "to");
  connectedNodes.forEach(
    (connectedNodeId: IdType | { fromId: IdType; toId: IdType }) => {
      if (typeof connectedNodeId === "object") {
        connectedNodeId = connectedNodeId.toId; // IdTypeに変換
      }
      achievableNodeIds.add(connectedNodeId);
      /** 次のノード */
      const nextNode = dataSetNodes.get(connectedNodeId);
      if (nextNode) {
        const font: Font | string | undefined = nextNode.font;
        if (typeof font === "object") {
          // フォントカラーを更新し、ノードを有効化する
          dataSetNodes.update({
            id: nextNode.id,
            font: { color: TEXT_COLORS.active },
            borderWidth: 4,
          });
        }
      }
    }
  );
}

/**
 * ノードを達成済みにする
 */
function markAsDone(nodeId: IdType, node: Node) {
  dataSetNodes.update({
    id: nodeId,
    color: PROGRESS_COLORS.done,
    label: node.label + "\n(達成)",
  });

  updateAchievableNodes(nodeId);
}

/**
 * 目標達成時の達成パスを描画し、達成アラートを表示する
 * @param nodeId 現在のノードID
 */
function plotGoalPathAndAlert(nodeId: IdType) {
  const nextNodeIds: IdType[] = network
    .getConnectedNodes(nodeId, "to")
    .map((connectedNodeId: IdType | { fromId: IdType; toId: IdType }) => {
      if (typeof connectedNodeId === "object") {
        return connectedNodeId.toId;
      }
      return connectedNodeId;
    });

  const nextNodes = nextNodeIds.map((nodeId) => {
    return dataSetNodes.get(nodeId);
  });

  if (
    nextNodeIds.includes(GOAL_NODE_ID) ||
    nextNodes.some(
      (nextNode) => (nextNode as Node).color === PROGRESS_COLORS.path
    )
  ) {
    plotGoalPath();
    if (!achievedGoal) {
      document.querySelector("#refreshButton")?.classList.remove("hidden");
      achievedGoal = true;

      setTimeout(() => {
        alertGoal();
      }, 200);
    }
  }
}

/**
 * 目標達成時の達成パスを描画する
 */
async function plotGoalPath() {
  dataSetNodes.forEach((node) => {
    if (node.color === PROGRESS_COLORS.done) {
      dataSetNodes.update({
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
    location.reload();
  }
}
