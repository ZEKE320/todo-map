import Footer from "@/lib/components/common/Footer";
import Header from "@/lib/components/common/Header";
import TodoMapCmp from "@/lib/components/todo-map/TodoMap";
import Container from "@mui/material/Container";
import "./page.module.scss";

const Home = () => {
  return (
    <div>
      <Header title="ToDoマップ(🧪)"></Header>
      <Container maxWidth={false}>
        <main id="mainContent">
          <TodoMapCmp></TodoMapCmp>
        </main>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default Home;
