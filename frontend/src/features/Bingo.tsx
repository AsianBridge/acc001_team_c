// import { useState } from "react";
import { BingoSquareShowModal } from "./ShowModal";
import { Grid } from "@mui/material";
// import { BingoSquareInformation } from "../types";

const Square = ({
    // index,
    storeName,
    src,
}: {
  storeName: string;
  src: string | undefined;
}) => {
  return <BingoSquareShowModal src={src} storeName={storeName} />;
};

const Bingo = () => {
    // const [bingoSquareInformationState, setBingoSquareInformationState] = useState<BingoSquareInformation[]>(Array(9).fill({ storeName: undefined, src: undefined }));

    // const squareUpdate = (value: number, storeName: string, src: string) => {
    //     const nextSquareInformationState = bingoSquareInformationState.slice();
    //     nextSquareInformationState[value] = { storeName, src };

    //     setBingoSquareInformationState(nextSquareInformationState);
    // }

  const storeInformation = [
    {
      storeName: "マック",
      src: "https://pbs.twimg.com/profile_images/1726395545974112256/3bTbEpwe_400x400.jpg",
    },
    {
      storeName: "一風堂",
      src: "https://ec-ippudo.com/img/usr/top/stores/pc/ippudo.jpg",
    },
    { storeName: "築地銀だこ", src: undefined },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
    },
    {
      storeName: "築地銀だこ",
      src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg",
    },
  ];

  return (
    <Grid container spacing={1}>
      {storeInformation.map((store, index) => (
        <Grid item xs={4} key={index}>
          <Square storeName={store.storeName} src={store.src} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Bingo;
