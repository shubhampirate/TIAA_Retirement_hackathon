import Hero from "./Pages/Hero/Hero";
import SignIn from "./Pages/Sign_In";
import Dashboard from "./Pages/Dahboard/Dashboard";
import Education from "./Pages/Education/Education";
import Health from "./Pages/Health/Health";
import Questions from "./Pages/FAQ/Questions";
import { Route, Routes } from "react-router-dom";
import Finance from "./Pages/Finance/Finance";
import Profile from "./Pages/Profile";
import GoogleTranslateComponent from "./Components/GoogleTranslateComponent";

function App() {
  return (
    <>
      {/* <GoogleTranslateComponent /> */}
      <Routes>
        <Route path="/signin" element={<><SignIn /></>} />
        <Route path="/dashboard" element={<><Dashboard /></>} />
        <Route path="/education" element={<><Education /></>} />
        <Route path="/health" element={<><Health /></>} />
        <Route path="/settings" element={<><Profile /></>} />
        <Route path="/finance" element={<><Finance /></>} />
        <Route path="/questions" element={<><Questions /></>} />
        <Route path="/" element={<><Hero /></>} />
      </Routes>
    </>
  );
}

export default App;
