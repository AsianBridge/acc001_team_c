import { Box, Button, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { ShowImage } from "../components/ShowImage";
import { ShowStoreReview } from "./StoreReview";
import { ShowCaption } from "../components/ShowText";
import api from "../api/api";
import {
  BingoSquareModalProps,
  getBingoInformationType,
  getReviewType,
  Reviewer,
  ReviewInformation,
} from "../types";
import ImageCrop from "./ImageCrop/ImageCrop";
import { BingoOfProfile } from "./Bingo";

export const BingoSquareShowModal = ({
  lockModal,
  src,
  storeName,
  userId,
  bingoId,
  storeNumber,
}: {
  lockModal: boolean;
} & BingoSquareModalProps &
  Reviewer) => {
  const [open, setOpen] = useState(false);
  const [reviewInformation, setReviewInformation] = useState<ReviewInformation>(
    {
      userId: userId,
      bingoId: bingoId,
      caption: "",
      starTaste: undefined,
      starAtmosphere: undefined,
      starCP: undefined,
      store_number: parseInt(storeNumber) + 1,
    },
  );

  const handleOpen = () => {
    if (lockModal === false || src !== undefined) {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const reviewer: Reviewer = {
          userId: userId,
          bingoId: bingoId,
          storeNumber: String(parseInt(storeNumber) + 1),
        };
        const response: getReviewType = await api.getReview(reviewer);
        const review: ReviewInformation = {
          userId: userId,
          bingoId: bingoId,
          caption: response.body.review ?? "",
          starTaste: parseInt(response.body.star_taste),
          starAtmosphere: parseInt(response.body.star_atmosphere),
          starCP: parseInt(response.body.star_cp),
          store_number: parseInt(storeNumber) + 1,
        };
        setReviewInformation(review);
      } catch (e) {
        console.error(e);
      }
    };

    if (open) {
      fetchReview();
    }
  }, [open, userId, bingoId, storeNumber]);

  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          height: "32vw",
          background: "#c0c0c0",
        }}
      >
        <Button onClick={handleOpen}>
          {src === undefined ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "black", fontSize: "2vw", margin: "0 3vw" }}>
                {storeName}へ<br />
                行こう
              </p>
            </div>
          ) : (
            <ShowImage src={src} width="100%" height="auto" />
          )}
        </Button>
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
              <ImageCrop
                bingoId={String(bingoId)}
                userId={userId}
                storeNumber={String(storeNumber)}
              />
            </Box>
          )}
          {src !== undefined && (
            <>
              <ShowImage src={src} width="100vh" height="auto" />
              <h1>{storeName}</h1>
              <ShowStoreReview
                taste={reviewInformation.starTaste}
                atmosphere={reviewInformation.starAtmosphere}
                costPerformance={reviewInformation.starCP}
              />
              <ShowCaption caption={reviewInformation?.caption} />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export const ShowBingoModal = ({
  BingoInformation,
}: {
  BingoInformation: getBingoInformationType;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        style={{
          transform: "scale(0.5)",
          border: "none",
          cursor: "pointer",
          padding: 0,
          margin: 0,
        }}
      >
        開きます
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <BingoOfProfile bingoInformation={BingoInformation} />
        </div>
      </Modal>
    </div>
  );
};
