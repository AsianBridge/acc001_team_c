import { BingoSquareModalProps } from "../types";
import { BingoSquareShowModal } from "./ShowModal";
import { Avatar, Box, Button, Grid, Stack } from "@mui/material";
import  Like  from "./like";

const Bingo = ({
  scene,
  storeInformation,
}: {
  scene: string;
  storeInformation: BingoSquareModalProps[];
}) => {
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
    <Stack spacing={-3}>
    <Box sx={{ color: "black", fontSize: "2rem", display: "flex", alignItems: "center" }}>
      <Avatar />
      <p style={{ display: "inline-block", marginLeft: "10px" }}>{UserId}</p>
    </Box>
      <Box sx={{ backgroundColor: "black" }}>
        <Bingo scene={"Home"} storeInformation={storeInformation} />
      </Box>
      <Like/>
      </Stack>
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
    <p style={{color:"black",position:"absolute", top:"10vh", left:"33vw", fontSize:"2.0rem", fontWeight: "bold"}}>My BINGO</p>
      <Box sx={{ backgroundColor: "black" }}>
        <Bingo scene={"MyBingo"} storeInformation={storeInformation} />
      </Box>
      <Stack><Button>投稿する</Button></Stack>
    </>
  );
};
