import { TextField } from "@mui/material";
import { useState } from "react";
import { SetUserId } from "../components/UserInformation";
import { CaptionProps } from "../types";

export const UserIdField = () => {
  const [inputText, setInputText] = useState("");
  return (
    <>
      <TextField
        id="standard-basic"
        label="UserID"
        variant="standard"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <SetUserId NewID={inputText} />
    </>
  );
};

export const CaptionField = ({
  caption,
  setCaption
}: CaptionProps
) => {
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
