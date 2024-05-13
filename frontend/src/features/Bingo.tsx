import { BingoSquareModalProps, getBingoInformationType } from "../types";
import { BingoSquareShowModal } from "./ShowModal";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import {
  KeepBingoButton,
  LikeButton,
  SubmitBingoButton,
} from "../components/Button";
import { FC, useEffect, useState } from "react";
import { useUserState } from "../store/UserState";

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

const Bingo = ({
  lockModal,
  bingoInformation,
  userId,
  bingoId,
}: {
  lockModal: boolean;
  bingoInformation?: BingoSquareModalProps[];
  userId: string;
  bingoId: string;
}) => {
  return (
    <Grid container spacing={1}>
      {bingoInformation &&
        bingoInformation.map((store, index) => (
          <Grid item xs={4} sm={4} key={index}>
            <BingoSquareShowModal
              lockModal={lockModal}
              storeName={store.storeName}
              src={store.src ?? undefined}
              userId={userId}
              bingoId={bingoId}
              storeNumber={index as unknown as string}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export const BingoOfHome: FC<{
  bingoInformation: BingoSquareModalProps[] | undefined;
  userId: string;
  bingoId: string;
  goodNum: number;
}> = ({ bingoInformation, userId, bingoId, goodNum }) => {
  const { userID } = useUserState();

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
            {userId}
          </p>
        </Box>
        <Box sx={{ backgroundColor: "black", width: "100vw", height: "auto" }}>
          {
            <Bingo
              lockModal={true}
              bingoInformation={bingoInformation}
              userId={userId}
              bingoId={bingoId}
            />
          }
        </Box>
        <Box>
          <LikeButton bingoId={bingoId} goodNum={goodNum} />
          <KeepBingoButton
            userId={userID}
            bingoId={bingoId}
            contributorId={userId}
          />
        </Box>
      </Stack>
    </>
  );
};

export const BingoOfMyBingo: FC<{
  bingoInformation: BingoSquareModalProps[] | undefined;
  userId: string;
  bingoId: string;
}> = ({ bingoInformation, userId, bingoId }) => {
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
          lockModal={false}
          bingoInformation={bingoInformation}
          userId={userId}
          bingoId={bingoId}
        />
      </Box>
      <Stack>
        {checkBingo(bingoInformation) && (
          <SubmitBingoButton userId={userId} bingoId={bingoId} />
        )}
      </Stack>
    </>
  );
};

export const BingoOfProfile: FC<{
  bingoInformation: getBingoInformationType;
}> = ({ bingoInformation }) => {
  const [userId, setUserId] = useState("");
  const [bingoId, setBingoId] = useState("");

  useEffect(() => {
    if (bingoInformation) {
      const bodyObject = JSON.parse(bingoInformation.body);
      setUserId(bodyObject.user_id);
      setBingoId(bodyObject.bingo_id);
    }
  }, [bingoInformation]);

  const bingoSquares: BingoSquareModalProps[] = [];
  if (bingoInformation) {
    const bodyObject = JSON.parse(bingoInformation.body);
    for (let i = 1; i <= 9; i++) {
      bingoSquares.push({
        src: bodyObject[`pi_${i}`],
        storeName: bodyObject[`store_name_${i}`],
      });
    }
  }
  return (
    <>
        <Box sx={{ backgroundColor: "black", width: "100vw", height: "auto" }}>
          {
            <Bingo
              lockModal={true}
              bingoInformation={bingoSquares}
              userId={userId}
              bingoId={bingoId}
            />
          }
        </Box>
    </>
  );
};
