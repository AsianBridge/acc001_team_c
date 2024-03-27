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
  const [color, setColor] = useState("white"); // 初期色を赤に設定

  const handleClick = () => {
    // 色を切り替えるロジック
    setColor(color === "white" ? "red" : "white");
  };

  return (
    <span className="likeButton" onClick={handleClick}>
      <p
        style={{
          color: color,
          fontSize: "2.0rem",
          display: "inline-block",
          textShadow: "0 0 10px black", // テキストの影を使用して縁取りの効果を模倣
          marginLeft: "4vw",
        }}
      >
        ♥
      </p>
    </span>
  );
}

export default Like;
