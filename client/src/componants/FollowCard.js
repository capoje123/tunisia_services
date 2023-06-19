import React from "react";
import avatar from "../assets/avatar.png";

const FollowCard = ({ el }) => {
  return (
    <div>
      <div className="h-24 w-full border-2 rounded-2xl flex items-center gap-5 px-2  sm:m-auto">
        <div className=" flex items-center w-20 h-20 rounded-full">
          <img className="rounded-full" src={el.profile.profileImg || avatar} />
        </div>
        <div className="">{el.user.firstName}</div>
        <div>
          <button
            class="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300"
            type="button"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
export default FollowCard;
