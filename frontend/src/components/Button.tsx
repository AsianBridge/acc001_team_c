import React, { useState } from "react";
import { Button } from "@mui/base/Button";
import { AccountImage, FooterBingoImage, HomeImage } from "./ShowImage";

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

export const ImageUploader = () => {
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    // FileListのままだとforEachが使えないので配列に変換する
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      // ファイルを読み込むためにFileReaderを利用する
      const reader = new FileReader();
      // ファイルの読み込みが完了したら、画像の配列に加える
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result !== "string") {
          return;
        }
        setBase64Images((prevImages) => [...prevImages, result]);
      };
      // 画像ファイルをbase64形式で読み込む
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = (index: number) => {
    setBase64Images((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="relative border-2 border-red-200 bg-red-100 w-[600px] h-[600px] flex flex-col space-y-4">
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleInputFile}
      />
      <div className="border-2 border-blue-300 bg-blue-200">
        <p>画像プレビュー</p>
        <div className="flex space-x-4 overflow-x-auto py-4">
          {base64Images.length !== 0 &&
            base64Images.map((image, idx) => (
              <div key={idx} className="flex-shrink-0">
                <img
                  src={image}
                  className="w-32 h-32 "
                  onClick={() => handleImageClick(idx)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
