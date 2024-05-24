import { useState } from "react";
import { BingoOfMyBingo } from "../../features/Bingo";
import { NextPage } from "next";
import {
  BingoSquareModalProps,
  bingoStoreIds,
  getBingoInformationType,
} from "../../types";
import { useUserState } from "../../store/stateManager";
import { useAsync } from "react-use";
import api from "../../api/api";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const getBingoInformation = async (userID: string) => {
  try {
    const getMyBingoIdResponse: getBingoInformationType =
      await api.getMyBingoByUserId(userID);

    if (getMyBingoIdResponse && getMyBingoIdResponse.body !== '"No Bingo"') {
      const bingoSquares: BingoSquareModalProps[] = [];
      const bodyObject = JSON.parse(getMyBingoIdResponse.body);

      for (let i = 1; i <= 9; i++) {
        bingoSquares.push({
          src: bodyObject[`pi_${i}`],
          storeName: bodyObject[`store_name_${i}`],
        });
      }

      if (bingoSquares)
        return {
          bingoSquares,
          userId: bodyObject[`user_id`],
          bingoId: bodyObject[`bingo_id`],
        };
    } else {
      return "No Bingo";
    }
  } catch (e) {
    console.error(e);
  }
};

const MyBingo: NextPage = () => {
  const [bingoInformation, setBingoInformation] =
    useState<BingoSquareModalProps[]>();
  const { userID } = useUserState();
  const [userId, setUserId] = useState("");
  const [bingoId, setBingoId] = useState("");
  const [bingoStatus, setBingoStatus] = useState(true);
  const [bingoStoreIds, setBingoStoreIds] = useState<bingoStoreIds>();
  const navigate = useNavigate();
  useAsync(async () => {
    const result = await getBingoInformation(userID);
    if (result == "No Bingo") {
      setBingoStatus(false);
    } else {
      if (result) {
        const { bingoSquares, userId, bingoId } = result;
        setBingoInformation(bingoSquares);
        setUserId(userId);
        setBingoId(bingoId);
        const response = await api.getStoreIdByBingoId(bingoId);
        setBingoStoreIds(response.body);
      }
    }
  }, []);
  return (
    <>
      {bingoStatus && bingoStoreIds ? (
        <BingoOfMyBingo
          bingoInformation={bingoInformation}
          userId={userId}
          bingoId={bingoId}
          bingoStoreIds={bingoStoreIds}
        />
      ) : (
        <Typography style={{ color: "black" }}>
          ホームでBINGOを選択してこよう!!
        </Typography>
      )}
      <Button onClick={() => navigate("/CreateBingoTable")}>Bingoを作る</Button>
    </>
  );
};

export default MyBingo;
