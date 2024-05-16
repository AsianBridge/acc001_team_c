import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./useDebounseEffect";
import { canvasPreview } from "./CanvasPreview";
import { convertImageToBase64 } from "./ImageConverter";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

//これは、％アスペクトクロップの作り方と中央にある方法を示すためです
//これは少し難しいです。いくつかのヘルパー関数を使用します。
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

interface ImageCropProps {
  bingoId: string;
  userId: string;
  storeNumber: string;
}

const ImageCrop: React.FC<ImageCropProps> = ({
  bingoId,
  userId,
  storeNumber,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  const [croppedImageSrc, setCroppedImageSrc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgSrc) {
      return;
    }

    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      if (previewCanvasRef.current) {
        canvasPreview(
          image,
          previewCanvasRef.current,
          completedCrop,
          1,
          0,
        ).then(() => {
          const canvas = previewCanvasRef.current;
          if (canvas) {
            const newCroppedImageSrc = canvas.toDataURL("image/jpeg");
            setCroppedImageSrc(newCroppedImageSrc); // Base64データを状態変数に格納
          }
        });
      }
    };
  }, [completedCrop, imgSrc]);

  async function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const file = e.target.files[0];
      try {
        const base64 = await convertImageToBase64(file);
        setImgSrc(base64);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current as string);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  async function onButtonClick() {
    setAspect(1 / 1);
    onDownloadCropClick();
    try {
      const response = await api.sendImageToServer(
        bingoId,
        userId,
        String(parseInt(storeNumber) + 1),
        croppedImageSrc,
      );

      const reviewProps = {
        src:response.body,
        bingoId:bingoId,
        userId:userId,
        storeNumber:parseInt(storeNumber) + 1
      }
      navigate("/Review", { state: reviewProps });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">スケール: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">回し: 　　</label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          circularCrop
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          minHeight={100}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button onClick={onButtonClick}>アップロードする</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCrop;
