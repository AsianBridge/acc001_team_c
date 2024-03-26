// import { useState } from "react";
import { BingoSquareModalProps } from "../types";
import { BingoSquareShowModal } from "./ShowModal";
import { Box, Grid } from "@mui/material";
// import { BingoSquareInformation } from "../types";

const Bingo = ({
  scene,
  storeInformation,
}: {
  scene: string
  storeInformation: BingoSquareModalProps[]
}) => {
  // const [bingoSquareInformationState, setBingoSquareInformationState] = useState<BingoSquareInformation[]>(Array(9).fill({ storeName: undefined, src: undefined }));

  // const squareUpdate = (value: number, storeName: string, src: string) => {
  //     const nextSquareInformationState = bingoSquareInformationState.slice();
  //     nextSquareInformationState[value] = { storeName, src };

  //     setBingoSquareInformationState(nextSquareInformationState);
  // }

  return (
    <Grid container spacing={1}>
      {storeInformation.map((store, index) => (
        <Grid item xs={4} sm={4} key={index}>
          <BingoSquareShowModal
            scene={scene}
            storeName={store.storeName}
            src={store.src}
            taste={store.taste}
            atmosphere={store.atmosphere}
            costPerformance={store.costPerformance}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export const BingoOfHome = () => {
  const storeInformation: BingoSquareModalProps[] = [
    {
      storeName: "マック",
      src: "https://pbs.twimg.com/profile_images/1726395545974112256/3bTbEpwe_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "一風堂",
      src: "https://ec-ippudo.com/img/usr/top/stores/pc/ippudo.jpg",
      taste: 5,
      atmosphere: 5,
      costPerformance: 3,
    },
    {
      storeName: "築地銀だこ",
      src: undefined,
      taste: undefined,
      atmosphere: undefined,
      costPerformance: undefined,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
  ];

  const UserId = "User1";

  return (
    <>
      <Box sx={{ color: "black", fontSize: "2rem" }}>
        <p>ID名:{UserId}</p>
      </Box>
      <Box sx={{ backgroundColor: "black" }}>
        <Bingo scene={"Home"} storeInformation={storeInformation} />
      </Box>
    </>
  );
};

export const BingoOfMyBingo = () => {
  const storeInformation: BingoSquareModalProps[] = [
    {
      storeName: "マック",
      src: "https://pbs.twimg.com/profile_images/1726395545974112256/3bTbEpwe_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "一風堂",
      src: "https://ec-ippudo.com/img/usr/top/stores/pc/ippudo.jpg",
      taste: 5,
      atmosphere: 5,
      costPerformance: 3,
    },
    {
      storeName: "築地銀だこ",
      src: undefined,
      taste: undefined,
      atmosphere: undefined,
      costPerformance: undefined,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
      taste: 3,
      atmosphere: 4,
      costPerformance: 2,
    },
  ];

  return (
    <>
      <Box sx={{ backgroundColor: "black" }}>
        <Bingo scene={"MyBingo"} storeInformation={storeInformation} />
      </Box>
    </>
  );
};
