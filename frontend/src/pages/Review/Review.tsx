import { useState } from "react";
import { SetStoreEvaluation } from "../../features/StoreEvaluation";
import { CaptionField } from "../../features/TextField";
import { ShowImage } from "../../components/ShowImage";
import { Stack } from "@mui/material";

const Review = () => {
  const [imageSrc] = useState(
    "https://yt3.googleusercontent.com/ytc/AIdro_nLCSTJbAHIDI3z-KlBg4YEhIEFk6Pw9ICFx-3C=s900-c-k-c0x00ffffff-no-rj",
  );
  const [taste, setTaste] = useState(0);
  const [atmosphere, setAtmosphere] = useState(0);
  const [costPerformance, setCostPerformance] = useState(0);
  const [caption, setCaption] = useState("");

  return (
    <>
      <Stack style={{marginTop:"10vh"}}>
      <ShowImage src={imageSrc} width="100vw" height="100vh"/>
      </Stack>
      <Stack style={{height:"82vh"}}>
      <SetStoreEvaluation
        taste={taste}
        atmosphere={atmosphere}
        costPerformance={costPerformance}
        setTaste={setTaste}
        setAtmosphere={setAtmosphere}
        setCostPerformance={setCostPerformance}
      />
      <CaptionField caption={caption} setCaption={setCaption} />
      </Stack>
    </>
  );
};

export default Review;
