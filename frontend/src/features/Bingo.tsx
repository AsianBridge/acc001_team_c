import { BingoSquareModalProps, getMyBingoIdType } from "../types";
import { BingoSquareShowModal } from "./ShowModal";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import { LikeButton, SubmitBingoButton } from "../components/Button";
import { FC, useEffect, useState } from "react";
import { useUserState } from "../store/UserState";
import { useAsync } from "react-use";
import api from "../api/api";

const checkBingo = (bingoInformation: BingoSquareModalProps[] | undefined) => {
  const BingoLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  if (bingoInformation) {
    for (let i = 0; i < BingoLines.length; i++) {
      const [a, b, c] = BingoLines[i];
      if (
        bingoInformation[a].src != undefined &&
        bingoInformation[b].src != undefined &&
        bingoInformation[c].src != undefined
      ) {
        return true;
      }
    }
    return false;
  }
};

const getBingoInformation = async (userID: string) => {
  try {
    const getMyBingoIdResponse: getMyBingoIdType =
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

const Bingo = ({
  scene,
  storeInformation,
  userId,
  bingoId,
}: {
  scene: string;
  storeInformation?: BingoSquareModalProps[];
  userId: string;
  bingoId: string;
}) => {
  return (
    <Grid container spacing={1}>
      {storeInformation &&
        storeInformation.map((store, index) => (
          <Grid item xs={4} sm={4} key={index}>
            <BingoSquareShowModal
              scene={scene}
              storeName={store.storeName}
              src={store.src}
              userId={userId}
              bingoId={bingoId}
              storeNumber={index as unknown as string}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export const BingoOfHome: FC<{ storeInformation: BingoSquareModalProps[] }> = ({
  storeInformation,
}) => {
  const UserId = "User1";

  return (
    <>
      <Stack spacing={-3}>
        <Box
          sx={{
            color: "black",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar />
          <p style={{ display: "inline-block", marginLeft: "10px" }}>
            {UserId}
          </p>
        </Box>
        <Box sx={{ backgroundColor: "black" }}>
          {/* <Bingo scene={"Home"} storeInformation={storeInformation} /> */}
        </Box>
        <Box>
          <LikeButton />
        </Box>
      </Stack>
    </>
  );
};

export const BingoOfMyBingo = () => {
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
  });

  useEffect(()=>{
    
  })

  return (
    <>
      <p
        style={{
          color: "black",
          position: "absolute",
          top: "10vh",
          left: "33vw",
          fontSize: "2.0rem",
          fontWeight: "bold",
        }}
      >
        My BINGO
      </p>
      <Box sx={{ backgroundColor: "black" }}>
        <Bingo
          scene={"MyBingo"}
          storeInformation={bingoInformation}
          userId={userId}
          bingoId={bingoId}
        />
      </Box>
      <Stack>{checkBingo(bingoInformation) && <SubmitBingoButton />}</Stack>
    </>
  );
};
