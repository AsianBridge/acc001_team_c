import { ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";
import { BingoSquareModalProps } from "../../types";
import api from "../../api/api";
import { useState } from "react";
import { useAsync } from "react-use";
import { useUserState } from "../../store/UserState";

type bingoInformationArray = {
  userId: string;
  bingoId: string;
  goodNum: number;
};

const getBingoInformation = async (userID: string) => {
  const bingoSquares: BingoSquareModalProps[][] = [];
  const bingoInformation: bingoInformationArray[] = [];
  try {
    const getBingoResponse = await api.getBingo(userID);
    if (getBingoResponse && getBingoResponse.body) {
      for (let j = 0; j < getBingoResponse.body.length; j++) {
        bingoSquares[j] = [];
        for (let k = 1; k <= 9; k++) {
          bingoSquares[j].push({
            src: getBingoResponse.body[j][`pi_${k}`],
            storeName: getBingoResponse.body[j][`store_name_${k}`],
          });
        }
        const getGoodResult = await api.getGoodByBingoId(
          String(getBingoResponse.body[j][`bingo_id`]),
        );
        bingoInformation.push({
          userId: getBingoResponse.body[j][`user_id`],
          bingoId: String(getBingoResponse.body[j][`bingo_id`]),
          goodNum: getGoodResult.body,
        });
      }
      return {
        bingoSquares,
        bingoInformation,
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const Home = () => {
  const [bingoSquares, setBingoSquares] = useState<BingoSquareModalProps[][]>();
  const [bingoInformation, setBingoInformation] =
    useState<bingoInformationArray[]>();
  const { userID } = useUserState();

  useAsync(async () => {
    const result = await getBingoInformation(userID);
    if (result) {
      const { bingoSquares, bingoInformation } = result;
      setBingoSquares(bingoSquares);
      setBingoInformation(bingoInformation);
    }
  }, []);

  return (
    <>
      <ImageList sx={{ width: "100vw", height: "90vh" }} cols={1}>
        {bingoSquares && bingoInformation && bingoSquares.length > 0 ? (
          bingoSquares.map((bingoSquare, index) => (
            <ImageListItem key={index}>
              <BingoOfHome
                bingoInformation={bingoSquare}
                userId={bingoInformation[index].userId}
                bingoId={bingoInformation[index].bingoId}
                goodNum={bingoInformation[index].goodNum}
              />
            </ImageListItem>
          ))
        ) : (
          <ImageListItem>ビンゴ情報がありません。</ImageListItem>
        )}
      </ImageList>
    </>
  );
};

export default Home;
