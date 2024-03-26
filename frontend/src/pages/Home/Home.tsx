import { ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";

export default function Home() {
  return (
    <>
      <ImageList sx={{ width: "100vw", height: "90vh" }} cols={1}>
        <ImageListItem>
          <BingoOfHome />
        </ImageListItem>
        <ImageListItem>
          <BingoOfHome />
        </ImageListItem>
        <ImageListItem>
          <BingoOfHome />
        </ImageListItem>
      </ImageList>
    </>
  );
}
