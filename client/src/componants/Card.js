import React from "react";
import z5 from "../assets/images/z5.jpg";
import { Rating } from "@mui/material";
import avatar from "../assets/avatar.png";

const Card = ({ el }) => {
  return (
    <div className="w-[190px] h-[300px] rounded-xl overflow-hidden shadow-lg shadow-gray-600">
      <img className="w-full h-[150px]" src={z5} alt="" />
      <div className="text-black flex items-center flex-col gap-3 pt-2 bg-gray-300">
        <p>
          {el.user.firstName || ""}
          {el.user.lastName || ""}
        </p>
        <div className="w-full h-[150px] flex flex-col items-center">
          <img
            className="w-16 h-16 rounded-full border-2 border-black/30"
            src={el.profile.profileImg || avatar}
            alt=""
          />
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
