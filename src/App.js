import { Header, Account, CreateNews } from "./components/Components";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/add-News" element={<CreateNews />} />
      </Routes>
    </div>
  );
}

export default App;
