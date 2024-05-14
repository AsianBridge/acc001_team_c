import { TextField } from "@mui/material";
import { CaptionProps } from "../types";

export const CaptionField = ({ caption, setCaption }: CaptionProps) => {
  return (
    <>
      <TextField
        id="standard-basic"
        label="キャプション"
        variant="standard"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
    </>
  );
};
