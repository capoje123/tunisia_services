import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoutes from "./componants/ProtectedRoutes";
import Profile from "./pages/Profile";
import { getCurrentUser } from "./redux/Actions/userActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import CreateProfile from "./pages/CreateProfile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import InfoPersonel from "./componants/InfoPersonel";
import Layaout from "./componants/Layaout";
import Securité from "./componants/Securité";
import Help from "./componants/Help";
import { getUserService } from "./redux/Actions/serviceActions";
import Contact from "./pages/Contact";

function App() {
  const currentUser = useSelector((state) => state.serviceReducer.userService);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  useEffect(() => {
    dispatch(getUserService(currentUser._id));
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route element={<Layaout />} path="/settings">
          <Route element={<InfoPersonel />} index />
          <Route element={<Securité />} path="/settings/securité" />
          <Route element={<Help />} path="/settings/help" />
        </Route>
        <Route element={<Contact />} path="/contact" />
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />
        <Route
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
          path="/profile/:userid"
        />
        <Route element={<CreateProfile />} path="/createprofile" />
        <Route element={<Search />} path="/search" />
        <Route element={<Settings />} path="/settings" />
      </Routes>
    </div>
  );
}

export default App;
