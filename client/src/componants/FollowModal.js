import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FollowCard from "./FollowCard";

export default function FollowModal({ List, type }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{type}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute flex flex-col h-[550px] top-[50%] left-[47%] translate-x-[-50%] translate-y-[-50%] max-w-[940px]  bg-white p-4 flex gap-4 flex-wrap overflow-y-scroll sm:justify-center">
          {List?.map((el) => (
            <FollowCard el={el} />
          ))}
        </div>
      </Modal>
    </div>
  );
}
