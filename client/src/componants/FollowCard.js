import React from "react";
import avatar from "../assets/images/avatar.webp";

const FollowCard = ({ el }) => {
  return (
    <div className=" h-24 w-[320px] flex items-center justify-between border-2 rounded-2xl cursor-pointer mx-auto p-4 duration-300  hover:bg-[#f6f8f9]">
      <div className="flex flex-grow items-center justify-around text-center sm:flex-row sm:text-left">
        <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
          <img
            className="avatar w-16 h-16 rounded-full"
            src={el?.profile?.profileImg || avatar}
            alt=""
          />
        </div>
        {console.log("el", el)}
        <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4">
          <p className=" font-medium no-underline">{el?.user?.firstName}</p>
          <div>
            <span className=" text-slate-500">{el?.profession}</span>
          </div>
        </div>
      </div>

      <div className=" mx-auto sm:ml-auto sm:mr-0">
        <button
          className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
          type="button"
        >
          Follow
        </button>
      </div>
    </div>
  );
};
export default FollowCard;
