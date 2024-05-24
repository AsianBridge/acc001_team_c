import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
type CaptionProps = {
  caption: string;
  setCaption: Dispatch<SetStateAction<string>>;
}

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
