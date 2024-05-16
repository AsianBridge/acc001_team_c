import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { ShowImage } from "../components/ShowImage";
import { ShowStoreReview } from "./StoreReview";
import { ShowCaption } from "../components/ShowText";
import { useAsync } from "react-use";
import api from "../api/api";
import {
  BingoSquareModalProps,
  getBingoInformationType,
  getReviewType,
  Reviewer,
  ReviewInformation,
} from "../types";
import { BingoOfProfile } from "./Bingo";
import ImageCrop from "./ImageCrop/ImageCrop";

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
  const handleOpen = () => {
    (lockModal === false || src !== undefined) && setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [reviewInformation, setReviewInformation] =
    useState<ReviewInformation>();
  try {
    useAsync(async () => {
      if (src) {
        const Reviewer: Reviewer = {
          userId: userId,
          bingoId: bingoId,
          storeNumber: `${storeNumber + 1}`,
        };
        const response: getReviewType = await api.getReview(Reviewer);
        const review: ReviewInformation = {
          userId: userId,
          bingoId: bingoId,
          caption: response.body.review ?? undefined,
          starTaste: parseInt(response.body.star_taste),
          starAtmosphere: parseInt(response.body.star_atmosphere),
          starCP: parseInt(response.body.star_cp),
          store_number: parseInt(storeNumber) + 1,
        };

        setReviewInformation(review);
      }
    }, []);
  } catch (e) {
    console.error(e);
  }

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
              {" "}
              {/* 中央揃えを追加 */}
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

export const ShowBingoModal = ({
  BingoInformation,
}: {
  BingoInformation: getBingoInformationType;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* BingoOfProfileを包含するdivにクリックイベントを適用 */}
      <div
        onClick={() => setOpen(true)}
        style={{
          transform: "scale(0.5)", // 50%に縮小
          cursor: "pointer", // カーソルをポインターに
          padding: 0, // パディングなし
          margin: 0, // マージンなし
          display: 'inline-block', // 適切なレイアウトのため
          border: 'none', // 枠線なし（必要に応じて追加）
        }}
      >
        <BingoOfProfile bingoInformation={BingoInformation} />
      </div>
      
      {/* モーダルウィンドウでビンゴカードを拡大して表示 */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <BingoOfProfile bingoInformation={BingoInformation} />
        </div>
      </Modal>
    </div>
  );
};
