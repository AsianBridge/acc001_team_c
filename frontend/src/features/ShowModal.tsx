import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { ShowImage } from "../components/ShowImage";
import { ShowStoreEvaluation } from "./StoreEvaluation";
import { BingoSquareModalProps } from "../types";
import { ImageUploader } from "../components/Button";

export const BingoSquareShowModal = ({
  scene,
  src,
  storeName,
  taste,
  atmosphere,
  costPerformance,
}: {
  scene: string
} & BingoSquareModalProps
) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    (scene === "MyBingo" || src !== undefined) && (
      setOpen(true)
    )
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box>
        <div style={{ width: "32vw", height: "32vw", background: "gray" }}>
          <Button onClick={handleOpen}>
            {src === undefined ? (
              <Box>
                <h3 style={{ color: "black", marginLeft: "3vw" }}>
                  {storeName}へ<br></br>行こう
                </h3>
              </Box>
            ) : (
              <ShowImage src={src} width="120vw" height="120vh" />
            )}
          </Button>
        </div>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ bgcolor: "background.paper" }}>
          {src === undefined && (
            <Box width="50vw" height="40vh">
              <h3>{storeName}へ行こう</h3>
              <ImageUploader />
            </Box>
          )}
          {src !== undefined && (
            <>
              <ShowImage src={src} width="200vw" height="200vh" />
              <ShowStoreEvaluation
                taste={taste}
                atmosphere={atmosphere}
                costPerformance={costPerformance}
              />
              <h1>{storeName}</h1>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
