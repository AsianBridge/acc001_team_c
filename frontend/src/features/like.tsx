import { useState } from "react";

function Like() {
  return (
    <div className="Like">
      <header className="Like-header">
        <LikeButton />
      </header>
    </div>
  );
}

function LikeButton() {
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
      <span>
      ×{likeCounter}
      </span>
    </p>
  );
}

export default Like;
