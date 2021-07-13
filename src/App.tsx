import "./App.css";
import Menu from "./components/Menu/Menu";

interface IHeader {
  title: string
}

const Header = ({ title }: IHeader) =>
  <header>
    <h1>{title}</h1>
  </header>

const Main = () =>
  <main>
    Nothing Selected...
  </main>

const Sidebar = () =>
  <aside>
    <Menu />
  </aside>


const App = () =>
  <div className="App">
    <Header title="My App!" />
    <Sidebar />
    <Main />
  </div>

export default App;
