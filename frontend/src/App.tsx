import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyAppPage from "./components/MyAppPage";
import AddFlow from "./components/AddFlow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-apps" element={<MyAppPage/>}/>
        <Route path="/add-flow" element={<AddFlow/>}/>
      </Routes>
    </Router>
  );
}

export default App;
