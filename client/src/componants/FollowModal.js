import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FollowCard from "./FollowCard";

export default function FollowModal({ List, type, number }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
        {" "}
        <Button onClick={handleOpen}>{type}</Button>
        <p className="text-center">{number}</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute flex flex-col gap-3 h-[450px] top-[50%] left-[47%] translate-x-[-50%] translate-y-[-50%]  bg-gray-500 w-full overflow-y-scr300l overflow-x-hidden sm:w-[800px] sm:flex-row pt-4">
          {List?.map((el) => (
            <FollowCard el={el} />
          ))}
        </div>
      </Modal>
    </div>
  );
}
