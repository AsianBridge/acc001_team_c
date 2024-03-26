import { TextField } from "@mui/material";
import { useState } from "react";
import { SetUserId } from "../components/UserInformation";

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
