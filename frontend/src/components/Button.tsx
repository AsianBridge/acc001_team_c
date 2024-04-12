import { Button } from "@mui/material";
import { AccountImage, FooterBingoImage, HomeImage } from "./ShowImage";
import { useState } from "react";

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

export const SubmitBingoButton = () => {
  return <Button>投稿する</Button>;
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

export const LikeButton = () => {
  const [color, setColor] = useState("white");
  const [timerId, setTimerId] = useState<number | undefined>(undefined);
  const [likeCounter, setLikeCounter] = useState<number>(0);

  const handleClick = () => {
    const ResetTimeout = () => {
      clearTimeout(timerId);
    };

    const newTimerId = setTimeout(() => {
      console.log("時間が経過しました。");
    }, 2000);
    setTimerId(newTimerId);

    setColor("red"); // 赤に設定

    ResetTimeout();

    setTimeout(() => {
      setColor("white"); // 1秒後に白に戻す
      setLikeCounter(likeCounter + 1);
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
        <span>×{likeCounter}</span>
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
