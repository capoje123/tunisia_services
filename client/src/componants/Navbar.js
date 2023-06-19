import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchDropdown from "./SearchDropdown";
import Dropdown from "./Dropdown";
import service_header from "../assets/service_header.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/Actions/userActions";
import SearchMenu from "./SearchMenu";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const profile = useSelector((state) => state?.profileReducer?.currentProfile);

  const handleClose = () => {
    setOpenMenu(false);
    setSearchMenu(false);
  };
  const handleLogout = () => {
    dispatch(logOut());
    setOpenMenu(false);
  };
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [tokenState, setTokenState] = useState(token);

  return (
    <div className="fixed flex items-center  w-full h-16 shadow-xl z-50 bg-gradient-to-r from-gray-400 to-gray-200 ">
      <div className=" relative flex items-center justify-between h-full w-full px-2 xl:px-12">
        <div
          className={
            !search
              ? "w-full h-screen absolute top-[-1500%] left-0 pt-2 px-8 ease-in duration-300"
              : "w-full h-screen absolute top-16 left-0 pt-2 px-8 ease-in duration-300"
          }
        >
          <div className="hidden md:block w-full h-screen bg-gray-800 opacity-95 rounded-2xl relative ">
            <div className="absolute top-[-16px] right-[50%] translate-x-[5px] rotate-45 bg-gray-800 opacity-95 w-8 h-8"></div>
            <SearchDropdown setSearch={setSearch} />
          </div>
        </div>

        <Link to="/">
          <img className="h-10 w-50" src={service_header} alt="" />
        </Link>
        <div className="hidden md:flex">
          <ul className="flex gap-12 text-xl tracking-widest font-bold px-6 py-3 ">
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black">
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={() => setSearch(true)}
              className="h-full cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Search
            </li>
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black">
              About
            </li>
            <li className="h-full cursor-pointer border-b-2 border-transparent hover:border-black">
              Contact
            </li>
          </ul>
        </div>
        {!openMenu ? (
          <div
            onClick={() => setOpenMenu(true)}
            className="block cursor-pointer md:hidden"
          >
            <GiHamburgerMenu size={25} />
          </div>
        ) : null}
        <div className="hidden md:flex items-center justify-center">
          {token ? (
            <Dropdown setTokenState={setTokenState} />
          ) : (
            <div className="flex flex-col items-center">
              <p>welcome</p>
              <div className="flex gap-4">
                <Link to="/signin">
                  <p>SignIn</p>
                </Link>
                <Link to="/signup">
                  <p>SignUp</p>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/*menu overlay*/}
        <div
          className={
            openMenu
              ? "absolute  top-0 left-0 w-full h-screen bg-black bg-opacity-[85%] ease-in duration-500 md:hidden "
              : "absolute  top-0 left-[-120%] w-full h-screen bg-black bg-opacity-[85%] ease-in duration-500 md:hidden "
          }
        >
          <div className="flex flex-col items-center text-4xl tracking-widest font-medium  justify-center gap-14 w-full text-white h-full bg-black text bg-opacity-[5%] px-4 relative">
            {searchMenu ? (
              <div
                onClick={() => setSearchMenu(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                X
              </div>
            ) : (
              <div
                onClick={() => setOpenMenu(false)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                X
              </div>
            )}
            {!searchMenu ? (
              <>
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  <Link to={"/"}>Home</Link>
                </h2>
                <h2
                  className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2 "
                  onClick={() => setSearchMenu(!searchMenu)}
                >
                  Search
                </h2>
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  <Link to={`/profile/${profile.user && profile.user._id}`}>
                    Profile
                  </Link>
                </h2>
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  Settings
                </h2>
                <h2 className="w-[90%] text-center bg-white/5  cursor-pointer rounded-lg py-2">
                  Help
                </h2>
                {token ? (
                  <h2
                    className="w-[90%] text-center bg-white/5 cursor-pointer rounded-lg py-2 "
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </h2>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center gap-8">
                    <h2 className="w-[90%] text-center bg-white/5 cursor-pointer rounded-lg py-2">
                      <Link to="/signin">SignIn</Link>
                    </h2>

                    <h2 className="w-[90%] text-center bg-white/5 cursor-pointer rounded-lg py-2">
                      <Link to="/signup">SignUp</Link>
                    </h2>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full px-12">
                <SearchMenu setSearchMenu={setSearchMenu} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
