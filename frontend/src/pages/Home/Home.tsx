import { ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";
import { BingoSquareModalProps } from "../../types";
import api from "../../api/api";
import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import { useAuthState, useUserState } from "../../store/stateManager";
import { NextPage } from "next";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

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

const Home: NextPage = () => {
  const [bingoSquares, setBingoSquares] = useState<BingoSquareModalProps[][]>();
  const [bingoInformation, setBingoInformation] =
    useState<bingoInformationArray[]>();
  const { setUserID, userID } = useUserState();
  const { authState, setAuthState } = useAuthState();
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthState = async () => {
      if (user) {
        setAuthState(user);
        try {
          const result = await api.confirmationIdByUserId(user.userId);
          if (result.body === '"You can use this id"') {
            navigate("/SignUpForm");
          } else {
            if (authState) {
              setUserID(authState.userId);
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setAuthState(undefined);
        setUserID("Guest");
      }
    };
    fetchAuthState();
    console.log(userID);
  }, [user, authState]);

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
