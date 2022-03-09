import {
  Header,
  Account,
  CreateNews,
  EditNews,
  NewsList,
  ViewNews,
} from "./components/Components";
import "./App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/view-news" element={<NewsList />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="/edit-news/:id" element={<CreateNews />} />
        <Route path="/view-news/:id" element={<ViewNews />} />
      </Routes>
    </div>
  );
}

export default App;
