import "./App.css";
import Registrants from "./component/registrant/Registrants";
import Home from "./pages/Home";
import { RootState } from "./redux/store";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "./component/Loader";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./pages/Registration";
import Inspectorate from "./pages/Inspectorate";
import Institution from "./pages/Institution";
import Secretariate from "./pages/Secretariate";
import LogIn from "./component/Login";

function App() {
  const registrantsState = useSelector((state: RootState) => state.registrants);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrants" element={<Registrants />} />
        <Route path="/Institution" element={<Institution />} />
        <Route path="/Inspectorate" element={<Inspectorate />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Secretariate" element={<Secretariate />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>

      {registrantsState.loading && <Loader />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
