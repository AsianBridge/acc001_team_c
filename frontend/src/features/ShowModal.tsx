import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { ShowImage } from "../components/ShowImage";
import { StoreEvaluation } from "./StoreEvaluation";

export const BingoSquareShowModal = ({
  src,
  storeName,
}: {
  src: string | undefined;
  storeName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const boxStyle = {
    bgcolor: "background.paper",
  };

  return (
    <>
      <Button onClick={handleOpen}>
        {src === undefined ? (
          <Box>
            <h3>{storeName}へ行こう</h3>
          </Box>
        ) : (
          <ShowImage src={src} width="120vw" height="120vh" />
        )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          {src === undefined ? (
            <Box width="50vw" height="10vh">
              <h3>{storeName}へ行こう</h3>
            </Box>
          ) : (
            <>
              <ShowImage src={src} width="200vw" height="200vh"></ShowImage>
              <StoreEvaluation taste={3} atmosphere={4} costPerformance={2} />
              <h1>{storeName}</h1>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};