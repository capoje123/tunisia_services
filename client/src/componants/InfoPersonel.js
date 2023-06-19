import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserService } from "../redux/Actions/serviceActions";
import { getCurrentUser } from "../redux/Actions/userActions";
import { cities } from "../consts/consts";
const InfoPersonel = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentService = useSelector(
    (state) => state.serviceReducer.userService
  );
  const [showForm, setShowForm] = useState(false);
  const [editProfile, SetEditProfile] = useState({});
  const [firstName, setFirstName] = useState(currentService?.user?.firstName);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  useEffect(() => {
    dispatch(getUserService(currentUser._id));
  }, [currentUser, dispatch]);

  return (
    <div className="px-6 pt-3  sm:w-full md:flex gap-4">
      <div className=" flex flex-col mt-12">
        <h1 className="text-black tracking-wider text-center text-2xl pb-3 ">
          Éditer les informations du compte
        </h1>
        <div className="flex gap-4">
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <label
                htmlFor="first-name"
                className="block mb-2 text-base font-semibold text-gray-900  "
              >
                First Name
              </label>
              <p>{currentService?.user?.firstName}</p>
            </div>
            <div className="flex gap-4">
              <label
                htmlFor="first-name"
                className="block mb-2 text-base font-semibold text-gray-900  "
              >
                Last Name
              </label>
              <p>{currentService?.user?.lastName}</p>
            </div>
            <div className="flex gap-4">
              <label
                htmlFor="first-name"
                className="block mb-2 text-base font-semibold text-gray-900  "
              >
                Phone Number
              </label>
              <p>{currentService?.profile?.phoneNumber}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <label
                htmlFor="first-name"
                className="block mb-2 text-base font-semibold text-gray-900  "
              >
                Adresse
              </label>
              <p>{currentService?.profile?.adress}</p>
            </div>
            <div className="flex gap-4">
              <label
                htmlFor="first-name"
                className="block mb-2 text-base font-semibold text-gray-900  "
              >
                City
              </label>
              <p>{currentService?.profile?.city}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          type="button"
          className="text-white tracking-wider  bg-gray-600 hover:bg-black focus:ring-4 focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none md:w-[250px]"
        >
          Modifier votre informations
        </button>
      </div>
      {showForm ? (
        <div className="mt-4 h-[600px]">
          <div>
            <label
              htmlFor="first-name"
              className="block mb-2 text-base font-semibold text-gray-900  "
            >
              First Name
            </label>
            <input
              placeholder={currentService?.user?.firstName}
              type="text"
              id="first-name"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
            />
          </div>
          <div className="pt-2">
            <label
              htmlFor="small-input"
              className="block mb-2 text-base font-semibold text-gray-900"
            >
              Last Name
            </label>
            <input
              value={currentService?.user?.lastName}
              type="text"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 md:w-[400px]"
            />
          </div>
          <div className="pt-2">
            <label
              htmlFor="small-input"
              className="block mb-2 text-base font-semibold text-gray-900"
            >
              Phone Number
            </label>
            <input
              placeholder={currentService?.profile?.phoneNumber}
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
              Adresse
            </label>
            <input
              placeholder={currentService?.profile?.adress}
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
              City
            </label>
            <select
              placeholder={currentService?.profile?.city}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:w-[400px]"
            >
              <option selected>Choose a city</option>
              {cities.map((el) => (
                <option value="">{el}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-start">
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
      ) : null}
    </div>
  );
};

export default InfoPersonel;
