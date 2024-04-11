import { BingoSquareModalProps } from "../types";
import { BingoSquareShowModal } from "./ShowModal";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import Like from "./like";
import { SubmitBingo } from "../components/Button";

const storeInformation: BingoSquareModalProps[] = [
  {
    storeName: "マック",
    src: undefined,
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
    storeName: "金沢麺屋大河",
    src: "https://tshop.r10s.jp/nipponselect/cabinet/item/t03/t03710005.jpg?esh1dplf7cn",
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
  {
    storeName: "麺屋 達",
    src: "https://cdn-ak.f.st-hatena.com/images/fotolife/n/ninomiya-shinta/20190912/20190912190215.jpg",
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
  {
    storeName: "麺屋 吉宗",
    src: "https://lh6.googleusercontent.com/proxy/VYcf3XKKpSOyQ_hPUIZ5gecrHmE_UZqMIQ821K41zyvCtnPbYuBIJOj7PkT_htw_mVIN3fxF8OhnSc8s_Ygt8LVqxYv_bMaTtBX09hI94w",
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
  {
    storeName: "築地銀だこ",
    src: undefined,
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
  {
    storeName: "築地銀だこ",
    src: undefined,
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
  {
    storeName: "築地銀だこ",
    src: undefined,
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
  {
    storeName: "ラーメン太る",
    src: "https://tblg.k-img.com/restaurant/images/Rvw/223211/640x640_rect_30d622011b39cdd47d317beeba8a732f.jpg",
    taste: 3,
    atmosphere: 4,
    costPerformance: 2,
  },
];

const checkBingo = (storeInformation: BingoSquareModalProps[]) => {
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

  for (let i = 0; i < BingoLines.length; i++) {
    const [a, b, c] = BingoLines[i];
    if (
      storeInformation[a].src != undefined &&
      storeInformation[b].src != undefined &&
      storeInformation[c].src != undefined
    ) {
      return true;
    }
  }
  return false;
};

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
          <Bingo scene={"Home"} storeInformation={storeInformation} />
        </Box>
        <Like />
      </Stack>
    </>
  );
};

export const BingoOfMyBingo = () => {
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
        <Bingo scene={"MyBingo"} storeInformation={storeInformation} />
      </Box>
      <Stack>{checkBingo(storeInformation) && <SubmitBingo />}</Stack>
    </>
  );
};
