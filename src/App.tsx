import "./App.css";
import Menu from "./components/Menu/Menu";

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
      </main>
    </div>
  );
}

export default App;
