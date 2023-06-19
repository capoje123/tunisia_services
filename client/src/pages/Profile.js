import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  follow,
  getFollowers,
  getFollowing,
  getUserService,
  rating,
  unfollow,
} from "../redux/Actions/serviceActions";
import { Navbar } from "../componants/Navbar";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillCamera } from "react-icons/ai";
import { LuHeartOff } from "react-icons/lu";
import FollowModal from "../componants/FollowModal";
import FollowCard from "../componants/FollowCard";
import WorkerListPics from "../componants/WorkerListPics";

const Profile = () => {
  const [rate, setRate] = useState(0);
  const [follower, setFollower] = useState(false);
  const [popRating, setPopRating] = useState(false);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const service = useSelector((state) => state.serviceReducer.userService);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const followersList = useSelector((state) => state.serviceReducer.followers);
  const followingList = useSelector((state) => state.serviceReducer.following);

  const handleRate = () => {
    dispatch(rating(service._id, rate, userid));
    setPopRating(false);
    setRate(0);
  };
  //profile image upload

  useEffect(() => {
    if (userid) {
      dispatch(getUserService(userid));
    }
  }, [userid, dispatch]);
  return (
    <>
      <Navbar />
      <div className=" relative w-full h-full">
        <div className="flex w-full flex-col items-center pt-24 ">
          <div className="w-full relative">
            {currentUser._id === userid ? null : (
              <>
                <div
                  onClick={() => setFollower(!follower)}
                  className="bg-blue-gray-600 cursor-pointer font-semibold text-sm text-white tracking-widest flex items-center justify-center gap-2 px-3 py-2 rounded-3xl absolute top-[-20px] right-3
                  sm: sm:px-8 sm:py-3 sm:top-0"
                >
                  {service?.followers?.indexOf(currentUser._id) !== -1 ? (
                    <div onClick={() => dispatch(unfollow(userid))}>
                      <p className="">Unfollow</p>
                      <LuHeartOff className="text-red-400" size={25} />
                    </div>
                  ) : (
                    <>
                      <div onClick={() => dispatch(follow(userid))}>
                        <p className="">Follow</p>
                        <AiOutlineHeart className="text-white " size={25} />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <h1 className=""> Profile</h1>
          <h2> {service?.profession}</h2>
        </div>
        <div className=" w-full flex flex-col  gap-6 items-center justify-around mt-10 sm:flex-row">
          <div className="relative group">
            <img
              className="rounded-full h-[250px] w-[250px]"
              src={service?.profile?.profileImg || avatar}
              alt=""
            />

            {currentUser._id === userid ? (
              <>
                <input className="hidden" id="profilePicture" type="file" />
                <label htmlFor="profilePicture">
                  <div className=" hidden group-hover:flex bg-black/50 text-white font-semibold text-lg tracking-wider cursor-pointer absolute top-0 left-0 w-full h-full rounded-full  items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <p>Change Picture</p>
                      <AiFillCamera size={30} />
                    </div>
                  </div>
                </label>
              </>
            ) : null}
          </div>
          <div className="  w-[70%] sm:w-[30%]">
            <p className="text-lg tracking-widest text-center text-black font-sans font-extrabold">
              Details
            </p>
            <div className="flex w-full justify-between py-1">
              <p className="text-lg tracking-widest text-gray-600  font-serif pt-2">
                Name:
              </p>
              <p className="text-lg tracking-widest text-black font-medium pt-2">
                {service?.user?.firstName}
                {service?.user?.lastName}
              </p>
            </div>
            <div className="flex  justify-between py-1">
              <p className="text-lg tracking-widest text-gray-600  font-serif pt-2">
                Phone Number:
              </p>
              <p className="text-lg tracking-widest text-black font-medium pt-2">
                {service?.profile?.phoneNumber}
              </p>
            </div>
            <div className="flex  justify-between py-1">
              <p className=" text-lg tracking-widest text-gray-600  font-serif pt-2">
                Adresse:
              </p>
              <p className="text-lg tracking-widest text-black font-medium ml-2 pt-2">
                {service?.profile?.city}
              </p>
            </div>
            <div className="flex items-center justify-between py-1 pt-2">
              <p className="text-lg tracking-widest text-gray-600  font-serif">
                Rating:
              </p>
              <Rating
                onChange={(e) => setRate(Number(e.target.value))}
                readOnly={true}
                value={service?.totalRating || 0}
                size="small"
                sx={{
                  fontSize: "1.5rem",
                }}
              />
            </div>
            <div></div>
            {currentUser._id === userid ? null : (
              <button onClick={() => setPopRating(true)}>
                rate this profile
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center py-6">
          <div className="flex justify-around border-2 rounded-2xl bg-gray-200 w-[80%] h-14 mb-5">
            <div className="flex items-center flex-col">
              <p>Publications</p>
              <p>10</p>
            </div>
            <div
              onClick={() => dispatch(getFollowers(service._id))}
              className="flex items-center flex-col"
            >
              <FollowModal List={followersList} type={"Followers"} />
              <p>{service?.followers?.length}</p>
            </div>
            <div
              onClick={() => dispatch(getFollowing(service._id))}
              className="flex items-center flex-col"
            >
              <FollowModal List={followingList} type={"following"} />
              <p>{service?.following?.length}</p>
            </div>
          </div>
          <div className="w-[80%] m-auto">
            <WorkerListPics />{" "}
          </div>
        </div>
        <div
          className={
            popRating
              ? "absolute h-screen w-full flex items-center justify-center bg-black top-0 left-0  bg-opacity-40 duration-700 "
              : "absolute h-screen w-full flex items-center justify-center bg-black top-[-200%] left-0  bg-opacity-40  "
          }
        >
          <div className="   py-6 flex flex-col justify-center sm:py-12  ">
            <div className="py-3 sm:max-w-xl sm:mx-auto">
              <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                <div className="px-12 py-5">
                  <h2 className="text-gray-800 text-3xl font-semibold">
                    Your opinion matters to us!
                  </h2>
                </div>
                <div className="bg-gray-200 w-full flex flex-col items-center">
                  <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-lg text-gray-800">
                      How was quality of my services?
                    </span>
                    <div className="flex space-x-3">
                      <Rating
                        onChange={(e) => setRate(Number(e.target.value))}
                        value={rate}
                        size="small"
                        sx={{
                          fontSize: "3.5rem",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-3/4 flex flex-col">
                    <button
                      onClick={() => handleRate()}
                      className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                    >
                      Rate now
                    </button>
                  </div>
                </div>
                <div className="h-20 flex items-center justify-center">
                  <p
                    onClick={() => setPopRating(false)}
                    className="text-gray-800 text-3xl font-semibold cursor-pointer"
                  >
                    Maybe later
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
