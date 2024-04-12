import { ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";
import { BingoSquareModalProps } from "../../types";

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

const Home = () => {
  return (
    <>
      <ImageList sx={{ width: "100vw", height: "90vh" }} cols={1}>
        <ImageListItem>
          <BingoOfHome storeInformation={storeInformation} />
        </ImageListItem>
        <ImageListItem>
          <BingoOfHome storeInformation={storeInformation} />
        </ImageListItem>
        <ImageListItem>
          <BingoOfHome storeInformation={storeInformation} />
        </ImageListItem>
      </ImageList>
    </>
  );
};

export default Home;
