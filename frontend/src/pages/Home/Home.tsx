import { ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";
import { BingoSquareModalProps } from "../../types";
import api from "../../api/api";
import { useState } from "react";
import { useAsync } from "react-use";

const getBingoInformation = async () => {
  const bingoSquares: BingoSquareModalProps[] = [];
  try {
    const getBingoResponse = await api.getBingo();

    console.log(getBingoResponse);

    if (getBingoResponse && getBingoResponse.body) {
      for (let i = 1; i <= 9; i++) {
        bingoSquares.push({
          src: getBingoResponse.body[`pi_${i}`],
          storeName: getBingoResponse.body[`store_name_${i}`],
        });
      }

      if (bingoSquares)
        return {
          bingoSquares,
          userId: getBingoResponse.body[`user_id`],
          bingoId: getBingoResponse.body[`bingo_id`],
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

  useAsync(async () => {
    const result = await getBingoInformation();
    if (result) {
      const { bingoSquares, userId, bingoId } = result;
      setBingoInformation(bingoSquares);
      setUserId(userId);
      setBingoId(bingoId);
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
          />
        </ImageListItem>
      </ImageList>
    </>
  );
};

export default Home;
