import { Box, ImageList, ImageListItem } from "@mui/material";
import { BingoOfHome } from "../../features/Bingo";
import ImageCrop from "../../features/ImageCrop/ImageCrop";

const Home = () => {
  return (
    <>
      <Box padding={30}></Box>
      <ImageCrop/>
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
};

export default Home;
