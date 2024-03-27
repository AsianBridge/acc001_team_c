import React, { useState, useCallback } from "react";
import { Area, MediaSize } from "react-easy-crop";
import "../components/ImageCrop/styles.css";
import { Button, makeStyles } from "@material-ui/core";
import getCroppedImg from "../components/ImageCrop/GetCroppedImage";
import CropperModal from "../components/ImageCrop/CropperModal";
import { useCroppedImgSrcState } from "../store/CroppedImageState";
export const ASPECT_RATIO = 1;
export const CROP_WIDTH = 400;

const useStyles = makeStyles({
    root: {
        marginTop: 30,
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        flexFlow: "column",
        "& .file-upload-container": {
            width: 500,
            marginTop: 10,
            "& .button": {
                backgroundColor: "#00A0FF",
                color: "white",
                marginLeft: "50vw",
            },
        },
        "& .img-container": {
            marginTop: 40,
            width: `${CROP_WIDTH}px`,
            height: `${CROP_WIDTH / ASPECT_RATIO}px`,
            display: "flex",
            alignItems: "center",
            borderRadius: 5,
            border: "1px solid gray",
            overflow: "hidden",
            backgroundColor: "#EAEAEA",
            marginLeft: "50vw",
            "& .img": {
                width: "100%",
                objectFit: "contain",
                backgroundColor: "#EAEAEA",
            },
            "& .no-img": {
                backgroundColor: "#EAEAEA",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
            },
        },
    },
});

export const ImageUploadButton: React.FC = () => {
    const classes = useStyles();
    /** Cropモーダルの開閉 */
    const [isOpen, setIsOpen] = useState(false);

    /** アップロードした画像URL */
    const [imgSrc, setImgSrc] = useState("");

    /** 画像の拡大縮小倍率 */
    const [zoom, setZoom] = useState(1);
    /** 画像拡大縮小の最小値 */
    const [minZoom, setMinZoom] = useState(1);

    /** 切り取る領域の情報 */
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    /** 切り取る領域の情報 */
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const { setCroppedImgSrc } = useCroppedImgSrcState();

    // const setCroppedImgSrc = ({ NewCroppedImgSrc }: { NewCroppedImgSrc: string }) => {
    //     if (typeof NewCroppedImgSrc === "string") {
    //         setCroppedImgSrc(NewCroppedImgSrc);
    //     };
    // };

    /**
     * ファイルアップロード後
     * 画像ファイルのURLをセットしモーダルを表示する
     */
    const onFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    if (reader.result) {
                        setImgSrc(reader.result.toString() || "");
                        setIsOpen(true);
                    }
                });
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        [],
    );
    /**
     * Cropper側で画像データ読み込み完了
     * Zoomの最小値をセットしZoomの値も更新
     */
    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
        const { width, height } = mediaSize;
        const mediaAspectRadio = width / height;
        if (mediaAspectRadio > ASPECT_RATIO) {
            // 縦幅に合わせてZoomを指定
            const result = CROP_WIDTH / ASPECT_RATIO / height;
            setZoom(result);
            setMinZoom(result);
            return;
        }
        // 横幅に合わせてZoomを指定
        const result = CROP_WIDTH / width;
        setZoom(result);
        setMinZoom(result);
    }, []);

    /**
     * 切り取り完了後、切り取り領域の情報をセット
     */
    const onCropComplete = useCallback((croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    /**
     * 切り取り後の画像を生成し画面に表示
     */
    const showCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
            setCroppedImgSrc(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imgSrc]);

    return (
        <div className={classes.root}>
            <div className="file-upload-container">
                <Button variant="contained" component="label" className="button">
                    Upload File
                    <input type="file" hidden onChange={onFileChange} />
                </Button>
            </div>
            <CropperModal
                crop={crop}
                setCrop={setCrop}
                zoom={zoom}
                setZoom={setZoom}
                onCropComplete={onCropComplete}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                imgSrc={imgSrc}
                showCroppedImage={showCroppedImage}
                onMediaLoaded={onMediaLoaded}
                minZoom={minZoom}
            />
        </div>
    );
};
