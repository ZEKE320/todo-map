import Footer from "@/lib/components/common/Footer";
import Header from "@/lib/components/common/Header";
import TodoMap from "@/lib/components/todo-map/TodoMap";
import Container from "@mui/material/Container";
import "./page.module.scss";
import { Suspense } from "react";
import Loading from "@/app/loading";

const Home = () => {
  return (
    <div>
      <Header title="ToDoマップ"></Header>
      <Container maxWidth={false}>
        <main id="mainContent">
          <Suspense fallback={<Loading />}>
            <TodoMap />
          </Suspense>
        </main>
        <Footer />
      </Container>
    </div>
  );
};

export default Home;
