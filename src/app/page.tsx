import Header from "@/lib/components/common/Header";
import TodoMapCmp from "@/lib/components/todo-map/TodoMap";
import Container from "@mui/material/Container";
import Link from "next/link";
import "./page.module.scss";

const Home = () => {
  return (
    <div>
      <Header title="ToDoマップ(🧪)"></Header>
      <Container maxWidth={false}>
        <main id="mainContent">
          <TodoMapCmp></TodoMapCmp>
        </main>
        <footer>
          <section>
            <span>
              Author | <Link href="https://github.com/ZEKE320">@ZEKE320</Link>
            </span>{" "}
            <span>
              Source |{" "}
              <Link href="https://github.com/ZEKE320/todo-map">GitHub</Link>
            </span>
          </section>
          <section>
            参考 |{" "}
            <Link href="https://www.youtube.com/watch?v=aPPQPCMrEzo">
              科学的に最強な雑談のはじめ方【会話スターター】とは？ |
              メンタリスト DaiGo. (YouTube.com)
            </Link>
          </section>
        </footer>
      </Container>
    </div>
  );
};

export default Home;
