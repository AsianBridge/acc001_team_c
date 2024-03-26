import { ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";

const Home = () => {
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

export default Home;