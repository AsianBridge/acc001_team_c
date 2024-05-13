import { Box, ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";
import { BingoSquareModalProps } from "../../types";
import api from "../../api/api";
import { useState } from "react";
import { useAsync } from "react-use";

const getBingoInformation = async () => {
  const bingoSquares: BingoSquareModalProps[] = [];
  try {
    const getBingoResponse = await api.getBingo();

    if (getBingoResponse && getBingoResponse.body) {
      for (let i = 1; i <= 9; i++) {
        bingoSquares.push({
          src: getBingoResponse.body[`pi_${i}`],
          storeName: getBingoResponse.body[`store_name_${i}`],
        });
      }
      const getGoodResult = await api.getGoodByBingoId(
        getBingoResponse.body[`bingo_id`],
      );

      if (bingoSquares && getGoodResult)
        return {
          bingoSquares,
          userId: getBingoResponse.body[`user_id`],
          bingoId: getBingoResponse.body[`bingo_id`],
          goodNum: getGoodResult.body,
        };
    }
  } catch (e) {
    console.error(e);
  }
};

const Home = () => {
  const [bingoInformation, setBingoInformation] =
    useState<BingoSquareModalProps[]>();
  const [userId, setUserId] = useState("");
  const [bingoId, setBingoId] = useState("");
  const [goodNum, setGoodNum] = useState(0);

  useAsync(async () => {
    const result = await getBingoInformation();
    if (result) {
      const { bingoSquares, userId, bingoId, goodNum } = result;
      setBingoInformation(bingoSquares);
      setUserId(userId);
      setBingoId(bingoId);
      setGoodNum(goodNum);
    }
  }, []);

  return (
    <>
      <ImageList sx={{ width: "100vw", height: "90vh" }} cols={1}>
        <ImageListItem>
          <BingoOfHome
            bingoInformation={bingoInformation}
            userId={userId}
            bingoId={bingoId}
            goodNum={goodNum}
          />
        </ImageListItem>
      </ImageList>
    </>
  );
};

export default Home;
