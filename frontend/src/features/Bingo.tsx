import { BingoSquareModalProps } from "../types";
import { BingoSquareShowModal } from "./ShowModal";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import {
  KeepBingoButton,
  LikeButton,
  SubmitBingoButton,
} from "../components/Button";
import { FC } from "react";
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
  scene,
  bingoInformation,
  userId,
  bingoId,
}: {
  scene: string;
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
              scene={scene}
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
              scene={"Home"}
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
      <Stack spacing={2} sx={{ width: '100%', margin: 'auto', alignItems: 'center' }}>
      <p style={{
        color: "black",
        fontSize: "2.0rem",
        fontWeight: "bold",
        textAlign: 'center' // 中央に配置
      }}>
        My BINGO
      </p>
      <Box sx={{ width: '100%', backgroundColor: "black" }}>
        <Bingo
          scene={"MyBingo"}
          bingoInformation={bingoInformation}
          userId={userId}
          bingoId={bingoId}
        />
      </Box>
    </Stack>
      <Stack>
        {checkBingo(bingoInformation) && (
          <SubmitBingoButton userId={userId} bingoId={bingoId} />
        )}
      </Stack>
    </>
  );
};
