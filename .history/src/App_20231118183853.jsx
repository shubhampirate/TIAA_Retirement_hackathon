import Hero from "./Components/Hero";
import SignIn from "./pages/Sign_In";
import Dashboard from "./Components/Dashboard";
import Education from "./Components/Education";
import Health from "./Components/Health";
import Settings from "./Components/Settings";
import Questions from "./Components/Questions";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/SignIn" element={<><SignIn /></>} />
        <Route path="/dashboard" element={<><Dashboard /></>} />
        <Route path="/education" element={<><Education /></>} />
        <Route path="/health" element={<><Health /></>} />
        <Route path="/settings" element={<><Settings /></>} />
        <Route path="/questions" element={<><Questions /></>} />
        <Route path="/" element={<><Hero /></>} />
      </Routes>
 
    </>
  );
}

export default App;
