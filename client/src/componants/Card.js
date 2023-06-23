import React from "react";
import z5 from "../assets/images/z5.jpg";
import { Rating } from "@mui/material";
import avatar from "../assets/avatar.png";

const Card = ({ el }) => {
  return (
    <div className="relative w-[190px] h-[300px] rounded-xl overflow-hidden shadow-lg shadow-gray-600">
      <img className="w-full h-[150px]  " src={z5} alt="" />
      <p className="absolute top-1/3 text-base text-white tracking-wider text-center bg-gray-600 bg-opacity-60 w-full h-12">
        {el.profession}
      </p>
      <div className="text-black flex items-center flex-col gap-3 pt-2 bg-gray-300">
        <div className="w-full h-[150px] flex flex-col items-center">
          <img
            className="w-16 h-16 rounded-full border-2 border-black/30"
            src={el.profile.profileImg || avatar}
            alt=""
          />
          <p>
            {el.user.firstName || ""}
            {el.user.lastName || ""}
          </p>

          <Rating
            readOnly={true}
            value={el.totalRating || ""}
            size="small"
            sx={{
              fontSize: "1.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
