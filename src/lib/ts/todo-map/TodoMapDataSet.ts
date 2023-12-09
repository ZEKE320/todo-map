import {
  GOAL_NODE_ID,
  PROGRESS_COLORS,
  START_NODE_ID,
  TEXT_COLORS,
} from "@/lib/ts/todo-map/TodoMapConstants";
import { TodoMapDataSet } from "@/lib/ts/todo-map/type";
import { Edge, Node } from "vis-network/";

/** TodoMapのデータセット */
export default class TodoMapDataSets {
  private _dataSet: TodoMapDataSet[];

  constructor() {
    this._dataSet = baseDataSet;
  }

  get nodes(): Node[] {
    return this._dataSet.map((data) => {
      return {
        id: data.id,
        label: `${data.title}`,
        title: `${data.description}`,
        x: this.nodeXCoordinate(data.id),
        y: this.nodeYCoordinate(data.id),
        fixed: false,
        color: this.nodeColor(data.id),
        font: {
          color: this.textColor(data.id),
        },
      };
    });
  }

  get edges(): Edge[] {
    return baseDataSet.flatMap((data: TodoMapDataSet) => {
      return data.nextIds.map((nextId: number) => {
        return {
          from: data.id,
          to: nextId,
        };
      });
    });
  }

  nodeXCoordinate(nodeId: number): number | undefined {
    if (nodeId === START_NODE_ID) {
      return 0;
    } else if (nodeId === GOAL_NODE_ID) {
      return 1500;
    } else {
      return undefined;
    }
  }

  nodeYCoordinate(nodeId: number): number | undefined {
    if (nodeId === START_NODE_ID) {
      return 0;
    } else if (nodeId === GOAL_NODE_ID) {
      return -500;
    } else {
      return undefined;
    }
  }

  nodeFixed(nodeId: number): boolean {
    if (nodeId === START_NODE_ID || nodeId === GOAL_NODE_ID) {
      return true;
    } else {
      return false;
    }
  }

  nodeColor(nodeId: number): string {
    if (nodeId === START_NODE_ID) {
      return PROGRESS_COLORS.start;
    } else if (nodeId === GOAL_NODE_ID) {
      return PROGRESS_COLORS.goal;
    } else {
      return PROGRESS_COLORS.undone;
    }
  }

  textColor(nodeId: number): string {
    if (nodeId === START_NODE_ID || nodeId === GOAL_NODE_ID) {
      return TEXT_COLORS.highlighted;
    } else {
      return TEXT_COLORS.secondary;
    }
  }
}

const baseDataSet: TodoMapDataSet[] = [
  {
    id: START_NODE_ID,
    title: "現状｜人と話すことが得意ではない",
    description: "現在のあなたです。",
    nextIds: [1, 2],
  },
  {
    id: 1,
    title: "1｜自己紹介の練習",
    description:
      "自己紹介は、初対面の人との会話を始める最初のステップです。自己紹介を練習することで、自分自身を他人に伝える能力を向上させることができます。",
    nextIds: [3, 4, 5],
  },
  {
    id: 2,
    title: "2｜一般的な話題について学ぶ",
    description:
      "天気、スポーツ、映画など、一般的な話題について学ぶことで、会話の範囲を広げることができます。",
    nextIds: [3, 4, 5],
  },
  {
    id: 3,
    title: "3｜質問をする練習",
    description:
      "他人に質問をすることで、会話を続ける能力を向上させることができます。また、他人の意見や経験を聞くことで、自分の視野を広げることもできます。",
    nextIds: [5, 8],
  },
  {
    id: 4,
    title: "4｜リスニングの練習",
    description:
      "他人が話していることを理解する能力は、会話をスムーズに進めるために重要です。リスニングの練習をすることで、この能力を向上させることができます。",
    nextIds: [5],
  },
  {
    id: 5,
    title: "5｜小さなグループでの会話の練習",
    description:
      "小さなグループでの会話を通じて、自分の意見を述べる能力や他人と協力する能力を向上させることができます。",
    nextIds: [6, 7, 8],
  },
  {
    id: 6,
    title: "6｜大きなグループでの会話の練習",
    description:
      "大きなグループでの会話を通じて、自分の意見を主張する能力や他人の意見を尊重する能力を向上させることができます。",
    nextIds: [8],
  },
  {
    id: 7,
    title: "7｜公の場でのスピーチの練習",
    description:
      "公の場でのスピーチを通じて、自分の意見やアイデアを大勢の人々に伝える能力を向上させることができます。",
    nextIds: [8, 9, GOAL_NODE_ID],
  },
  {
    id: 8,
    title: "8｜フィードバックを求める",
    description:
      "他人からフィードバックを求めることで、自分の会話能力の強みと弱みを理解することができます。また、フィードバックを基に改善策を立てることで、会話能力をさらに向上させることができます。",
    nextIds: [9, GOAL_NODE_ID],
  },
  {
    id: 9,
    title: "9｜継続的な練習",
    description:
      "会話能力は、継続的な練習によって向上します。日々の生活の中で積極的に人と話す機会を作ることが重要です。",
    nextIds: [GOAL_NODE_ID],
  },
  {
    id: GOAL_NODE_ID,
    title: "理想｜初対面の人と話すことに苦労しない",
    description: "あなたの設定した目標です。",
    nextIds: [],
  },
];
