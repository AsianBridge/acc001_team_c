import { useEffect, useState } from "react";
import { SetStoreReview } from "../../features/StoreReview";
import { CaptionField } from "../../features/TextField";
import { ShowImage } from "../../components/ShowImage";
import { Stack } from "@mui/material";
import { SubmitReviewButton } from "../../components/Button";
import { useLocation } from "react-router-dom";
import { ReviewInformation } from "../../types";

interface response {
  src: string;
  bingoId: string;
  userId: string;
  storeNumber: number;
}
const Review = () => {
  const location = useLocation();
  const responseData: response = location.state;
  const bodyObject = JSON.parse(responseData.src);
  const [imageSrc] = useState(bodyObject.imageUrl);
  const [taste, setTaste] = useState(0);
  const [atmosphere, setAtmosphere] = useState(0);
  const [costPerformance, setCostPerformance] = useState(0);
  const [caption, setCaption] = useState("");
  const [isReviewComplete, setIsReviewComplete] = useState(false);
  const reviewInformation: ReviewInformation = {
    bingoId: responseData.bingoId,
    userId: responseData.userId,
    caption: caption,
    starTaste: taste,
    starAtmosphere: atmosphere,
    starCP: costPerformance,
    store_number: responseData.storeNumber,
  };

  useEffect(() => {
    if (taste != 0 && atmosphere != 0 && costPerformance != 0) {
      setIsReviewComplete(true);
    }
  }, [taste, atmosphere, costPerformance]);
  return (
    <>
      <Stack style={{ marginTop: "10vh" }}>
        <ShowImage src={imageSrc} width="100vw" height="100vh" />
      </Stack>
      <Stack style={{ height: "25vh" }}>
        <SetStoreReview
          taste={taste}
          atmosphere={atmosphere}
          costPerformance={costPerformance}
          setTaste={setTaste}
          setAtmosphere={setAtmosphere}
          setCostPerformance={setCostPerformance}
        />
        <CaptionField caption={caption} setCaption={setCaption} />
      </Stack>
      <Stack style={{ height: "60vh" }}>
        <SubmitReviewButton
          isReviewComplete={isReviewComplete}
          reviewInformation={reviewInformation}
        />
      </Stack>
    </>
  );
};

export default Review;
