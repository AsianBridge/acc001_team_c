import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AccountImage, FooterBingoImage, HomeImage } from "./ShowImage";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

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
      navigate("/");
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
}: {
  isReviewComplete: boolean;
}) => {
  return (
    <Button href="/MyBingo" disabled={!isReviewComplete}>
      投稿する
    </Button>
  );
};

export const ReviewButton = () => {
  return <Button href="/Review">確定ボタン</Button>;
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
    setTimerId(newTimerId);

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

// export const ImageUploader = () => {
//   const [base64Images, setBase64Images] = useState<string>();

//   const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) {
//       return;
//     }

//     const fileArray = Array.from(files);

//     fileArray.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const result = reader.result;
//         if (typeof result !== "string") {
//           return;
//         }
//         setBase64Images((prevImages) => [...prevImages, result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleImageClick = (index: number) => {
//     setBase64Images((prev) => prev.filter((_, idx) => idx !== index));
//   };

//   return (
//     <div className="relative border-2 border-red-200 bg-red-100 w-[600px] h-[600px] flex flex-col space-y-4">
//       <input
//         type="file"
//         accept="image/jpeg, image/png"
//         onChange={handleInputFile}
//       />
//       <div className="border-2 border-blue-300 bg-blue-200">
//         <p>画像プレビュー</p>
//         <div className="flex space-x-4 overflow-x-auto py-4">
//           <CropDemo src={base64Images}/>
//         </div>
//       </div>
//     </div>
//   );
// };
