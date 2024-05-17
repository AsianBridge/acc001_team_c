import { useState } from "react";
import { BingoOfMyBingo } from "../../features/Bingo";
import { NextPage } from "next";
import { BingoSquareModalProps, getBingoInformationType } from "../../types";
import { useUserState } from "../../store/stateManager";
import { useAsync } from "react-use";
import api from "../../api/api";

const getBingoInformation = async (userID: string) => {
  try {
    const getMyBingoIdResponse: getBingoInformationType =
      await api.getMyBingoByUserId(userID);

    if (getMyBingoIdResponse && getMyBingoIdResponse.body) {
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

  useAsync(async () => {
    const result = await getBingoInformation(userID);
    if (result) {
      const { bingoSquares, userId, bingoId } = result;
      setBingoInformation(bingoSquares);
      setUserId(userId);
      setBingoId(bingoId);
    }
  }, []);
  return (
    <>
      <BingoOfMyBingo
        bingoInformation={bingoInformation}
        userId={userId}
        bingoId={bingoId}
      />
    </>
  );
};

export default MyBingo;
