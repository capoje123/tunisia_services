import React, { useState } from "react";
import { useSelector } from "react-redux";

const Securité = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  return (
    <div className="px-4 pt-3 md:flex flex-col justify-center items-center">
      <div>
        <h1 className="text-black tracking-wider text-center text-2xl pb-3 ">
          Changer l'email ou mot de passe
        </h1>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <label
              htmlFor="first-name"
              className="block mb-2 text-base font-semibold text-gray-900  "
            >
              Email
            </label>
            <p>{currentUser.email}</p>
          </div>

          <button
            onClick={() => setShowEmail(!showEmail)}
            type="button"
            className="text-white tracking-wider  bg-gray-600 hover:bg-black focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none md:w-[250px]"
          >
            Edit email
          </button>
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="text-white tracking-wider  bg-gray-600 hover:bg-black focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none md:w-[250px]"
          >
            Modifier le mot de passe
          </button>
        </div>
      </div>
      <div>
        {showEmail ? (
          <div>
            <div>
              <label
                htmlFor="small-input"
                className="block mb-2 text-base font-semibold text-gray-900 "
              >
                Email
              </label>
              <p></p>
              <input
                placeholder={currentUser.email}
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
              />
            </div>
            <div className="pt-2">
              <label
                htmlFor="small-input"
                className="block mb-2 text-base font-semibold text-gray-900 "
              >
                Password
              </label>
              <input
                type="text"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
              />
            </div>
          </div>
        ) : null}
        {showPassword
          ? setShowEmail(false) && (
              <div>
                <div className="pt-2">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-base font-semibold text-gray-900 "
                  >
                    Current Password
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
                  />
                </div>
                <div className="pt-2">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-base font-semibold text-gray-900  "
                  >
                    New Password
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
                  />
                </div>
                <div className="pt-2">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-base font-semibold text-gray-900 "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
                  />
                </div>
              </div>
            )
          : null}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-black focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            Save
          </button>
          <button
            type="button"
            className="text-white bg-gray-600 hover:bg-black focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Securité;
