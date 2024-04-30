import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { ShowImage } from "../components/ShowImage";
import { ShowStoreReview } from "./StoreReview";
import {
  BingoSquareModalProps,
  getReviewType,
  Reviewer,
  ReviewInformation,
} from "../types";
import { ShowCaption } from "../components/ShowText";
import { ReviewButton } from "../components/Button";
import { useAsync } from "react-use";
import api from "../api/api";
import { useUserState } from "../store/UserState";

export const BingoSquareShowModal = ({
  scene,
  src,
  storeName,
  userId,
  bingoId,
  storeNumber,
}: {
  scene: string;
} & BingoSquareModalProps &
  Reviewer) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    (scene === "MyBingo" || src !== undefined) && setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [reviewInformation, setReviewInformation] =
    useState<ReviewInformation>();

  const { setUserID } = useUserState();
  try {
    useAsync(async () => {
      if (src) {
        const Reviewer: Reviewer = {
          userId: userId,
          bingoId: bingoId,
          storeNumber: `${storeNumber + 1}`,
        };
        setUserID("kamide2");

        const response: getReviewType = await api.getReview(Reviewer);
        const review: ReviewInformation = {
          caption: response.body.review ?? undefined,
          starTaste: parseInt(response.body.star_taste),
          starAtmosphere: parseInt(response.body.star_atmosphere),
          starCP: parseInt(response.body.star_cp),
        };

        setReviewInformation(review);
      }
    }, []);
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <Box>
        <div style={{ width: "3vw", height: "32vw", background: "gray" }}>
          <Button onClick={handleOpen}>
            {src === undefined ? (
              <Box>
                <h3 style={{ color: "black", marginLeft: "3vw" }}>
                  {storeName}へ<br></br>行こう
                </h3>
              </Box>
            ) : (
              <ShowImage src={src} width="100%" height="auto" />
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
              <ReviewButton />
            </Box>
          )}
          {src !== undefined && (
            <>
              <ShowImage src={src} width="auto" height="auto" />
              <h1>{storeName}</h1>
              <ShowStoreReview
                taste={reviewInformation?.starTaste}
                atmosphere={reviewInformation?.starAtmosphere}
                costPerformance={reviewInformation?.starCP}
              />
              <ShowCaption caption={reviewInformation?.caption} />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
