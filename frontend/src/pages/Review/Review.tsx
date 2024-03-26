import { useState } from "react";
import {
  SetBingoID,
  SetStoreID,
  ShowBingoID,
  ShowStoreID,
} from "../../components/BingoInformationOfMyBingo";
import { SetStoreEvaluation } from "../../features/StoreEvaluation";

const Review = () => {
  const [taste, setTaste] = useState(1);
  const [atmosphere, setAtmosphere] = useState(1);
  const [costPerformance, setCostPerformance] = useState(1);

  return (
    <>
      <ShowBingoID />
      <SetBingoID newBingoID={"新しいIDです"} />
      <ShowStoreID />
      <SetStoreID newStoreID="新しいよ" />
      <SetStoreEvaluation
        taste={taste}
        atmosphere={atmosphere}
        costPerformance={costPerformance}
        setTaste={setTaste}
        setAtmosphere={setAtmosphere}
        setCostPerformance={setCostPerformance}
      />
    </>
  );
};

export default Review;
