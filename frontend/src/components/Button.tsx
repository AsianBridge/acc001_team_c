import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AccountImage, FooterBingoImage, HomeImage } from "./ShowImage";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ReviewInformation } from "../types";

export const HomeButton = () => {
  return (
    <Button href="/">
      <HomeImage />
    </Button>
  );
};

export const MyAccountButton = () => {
  return (
    <Button href="/MyAccount">
      <AccountImage />
    </Button>
  );
};

export const MyBingoButton = () => {
  return (
    <Button href="/MyBingo">
      <FooterBingoImage />
    </Button>
  );
};

export const SubmitBingoButton = ({
  userId,
  bingoId,
}: {
  userId: string;
  bingoId: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const AlertDialog = ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    const navigate = useNavigate();

    const PostMyBingo = async () => {
      await api.postMyBingo(userId, bingoId);
      navigate("/MyAccount");
    };
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"最終確認"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              完了したビンゴを投稿してもいいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>投稿しない</Button>
            <Button onClick={PostMyBingo} autoFocus>
              投稿する
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  };
  return (
    <>
      <AlertDialog open={open} setOpen={setOpen} />
      <Button onClick={handleClickOpen}>投稿する</Button>;
    </>
  );
};

export const KeepBingoButton = ({
  userId,
  bingoId,
  contributorId,
}: {
  userId: string;
  bingoId: string;
  contributorId: string;
}) => {
  const handleClick = async () => {
    await api.postKeepByUserId(userId, bingoId, contributorId);
  };
  return <Button onClick={handleClick}>保存</Button>;
};

export const SubmitReviewButton = ({
  isReviewComplete,
  reviewInformation,
}: {
  isReviewComplete: boolean;
  reviewInformation: ReviewInformation;
}) => {
  const [buttonState, setButtonState] = useState(false); //押された時にtrue
  const navigate = useNavigate();
  const postReview = useCallback(async () => {
    if (buttonState) {
      await api.postReview(reviewInformation);
      setButtonState(false);
      navigate("/MyBingo");
    }
  }, [buttonState, reviewInformation, navigate]);

  useEffect(() => {
    postReview();
  }, [postReview]);
  return (
    <Button disabled={!isReviewComplete} onClick={() => setButtonState(true)}>
      投稿する
    </Button>
  );
};

export const LikeButton = ({
  bingoId,
  goodNum,
}: {
  bingoId: string;
  goodNum: number;
}) => {
  const [color, setColor] = useState("white");
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const [goodCounter, setGoodCounter] = useState<number>(0);

  const handleClick = () => {
    const ResetTimeout = () => {
      clearTimeout(timerId);
    };

    const newTimerId = setTimeout(async () => {
      await api.postGoodByBingoId(goodCounter + 1, bingoId);
    }, 1000);
    setTimerId(newTimerId as unknown as number);

    setColor("red"); // 赤に設定

    ResetTimeout();

    setTimeout(() => {
      setColor("white"); // 1秒後に白に戻す
      setGoodCounter(goodCounter + 1);
    }, 100);
  };

  return (
    <header className="Like-header">
      <p
        style={{
          fontSize: "2.0rem",
          display: "inline-block",
          marginLeft: "4vw",
        }}
      >
        <span className="likeButton" onClick={handleClick}>
          <span
            style={{
              color: color,
              textShadow: "0 0 10px black",
              transition: color === "white" ? "color 0.3s" : "none", // 色が白の場合のみアニメーションを適用
            }}
          >
            ♥
          </span>
        </span>
        <span>×{goodNum + goodCounter}</span>
      </p>
    </header>
  );
};

export const PlayBingoButton = ({
  userID,
  bingoId,
  ContributorId,
}: {
  userID: string;
  bingoId: string;
  ContributorId: string;
}) => {
  const [cannotPlayOpen, setCannotPlayOpen] = useState(false);
  const [canPlayOpen, setCanPlayOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPlayingBingo = useCallback(async () => {
    const myBingoStatus = await api.getMyBingoByUserId(userID);
    if (myBingoStatus.body === '"No Bingo"') {
      setCanPlayOpen(true);
    } else {
      setCannotPlayOpen(true);
    }
  }, [userID]);

  const postPlayBingo = async () => {
    await api.postPlayBingo(userID, bingoId, ContributorId);
    setCanPlayOpen(false);
    navigate("/MyBingo");
  };

  return (
    <>
      <Button onClick={() => fetchPlayingBingo()}>このビンゴをPLAYする</Button>
      <Fragment>
        <Dialog
          open={canPlayOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogTitle id="alert-dialog-title">{"最終確認"}</DialogTitle>
            <DialogContentText id="alert-dialog-description">
              このビンゴをプレイしますか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCanPlayOpen(false)}>いいえ</Button>
            <Button onClick={postPlayBingo}>はい</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
      <Fragment>
        <Dialog
          open={cannotPlayOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              別のビンゴをプレイ中です
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCannotPlayOpen(false)}>かしこまり</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
  );
};
