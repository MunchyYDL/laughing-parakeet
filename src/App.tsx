import "./App.css";
import Menu from "./components/Menu/Menu";
// import LearnReact from "./components/LearnReact/LearnReact";

function App() {
  return (
    <div className="App">
      <header>
        <h1>My App!</h1>
      </header>
      <aside>
        <Menu />
      </aside>
      <main >
        Nothing Selected...
        {/* <LearnReact /> */}
      </main>
    </div>
  );
}

export default App;
