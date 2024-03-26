import { SetBingoID, SetStoreID, ShowBingoID, ShowStoreID } from "../../components/BingoInformationOfMyBingo";

const Review = () => {
  return <>
    <ShowBingoID />
    <SetBingoID newBingoID={"新しいIDです"} />
    <ShowStoreID />
    <SetStoreID newStoreID="新しいよ" />
  </>;
};

export default Review;