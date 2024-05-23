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
import GoogleMapComponent from "../components/GoogleMap";

export const BingoSquareShowModal = ({
  lockModal,
  src,
  storeName,
  userId,
  bingoId,
  storeNumber,
  storeId,
}: {
  lockModal: boolean;
  storeId: string;
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
              <Button onClick={handleClose}>閉じる</Button>
              <h3>{storeName}へ行こう</h3>
              <ImageCrop
                bingoId={String(bingoId)}
                userId={userId}
                storeNumber={String(storeNumber)}
              />
              <GoogleMapComponent storeId={storeId} />
            </Box>
          )}
          {src !== undefined && (
            <>
              <ShowImage src={src} width="100vh" height="auto" />
              <Button onClick={handleClose}>閉じる</Button>
              <h1>{storeName}</h1>
              <GoogleMapComponent storeId={storeId} />
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
      {/* BingoOfProfileを包含するdivにクリックイベントを適用 */}
      <div
        onClick={() => setOpen(true)}
        style={{
          transform: "scale(0.5)", // 50%に縮小
          cursor: "pointer", // カーソルをポインターに
          padding: 0, // パディングなし
          margin: 0, // マージンなし
          display: "inline-block", // 適切なレイアウトのため
          border: "none", // 枠線なし（必要に応じて追加）
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

export const CreatingBingoSquareShowModal = ({
  storeName,
  storeId,
}: {
  storeName: string;
  storeId: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (storeName && storeId) setOpen(true);
  };

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
          <p
            style={{
              color: "black",
              fontSize: "2vw",
              textAlign: "center",
              margin: "0 3vw",
            }}
          >
            {storeName}
          </p>
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ bgcolor: "background.paper" }}>
          <Box width="50vw" height="40vh" style={{ position: "relative" }}>
            <Button onClick={() => setOpen(false)}>閉じる</Button>
            <h3>{storeName}</h3>
            <GoogleMapComponent storeId={storeId} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
