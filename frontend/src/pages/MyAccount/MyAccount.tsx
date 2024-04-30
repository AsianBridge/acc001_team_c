import { Stack, Box, Tab, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../api/api";
import { getBingoIdType } from "../../types";
import { useUserState } from "../../store/UserState";
import { NextPage } from "next";

const getKeepBingoInformation = async (
  userID: string,
  setKeepBingoId: Dispatch<SetStateAction<getBingoIdType[] | undefined>>,
  setKeepBingoNumber: Dispatch<SetStateAction<number>>,
) => {
  try {
    const responseDataArray: getBingoIdType[] =
      await api.getKeepBingoIdByUserId(userID);

    if (responseDataArray.length > 0) {
      if (typeof responseDataArray[0].body !== "object") {
        return responseDataArray.length, responseDataArray;
        setKeepBingoNumber(responseDataArray.length);
        setKeepBingoId(responseDataArray);
      }
    } else {
      setKeepBingoNumber(0);
    }
  } catch (error) {
    console.error("Error fetching DoneBingoId:", error);
  }
};

const getDoneBingoInformation = async (
  userID: string,
  setDoneBingoId: Dispatch<SetStateAction<getBingoIdType[] | undefined>>,
  setDoneBingoNumber: Dispatch<SetStateAction<number>>,
) => {
  try {
    const responseDataArray: getBingoIdType[] =
      await api.getDoneBingoIdByUserId(userID);

    if (responseDataArray.length > 0) {
      if (typeof responseDataArray[0].body !== "object") {
        return responseDataArray.length, responseDataArray;
        setDoneBingoNumber(responseDataArray.length);
        setDoneBingoId(responseDataArray);
      }
    } else {
      setDoneBingoNumber(0);
    }
  } catch (error) {
    console.error("Error fetching DoneBingoId:", error);
  }
};

type BingoTabProps = {
  userID: string;
  setKeepBingoNumber: Dispatch<SetStateAction<number>>;
  setDoneBingoNumber: Dispatch<SetStateAction<number>>;
};

const BingoTab = ({
  userID,
  setKeepBingoNumber,
  setDoneBingoNumber,
}: BingoTabProps) => {
  const [value, setValue] = useState("1");
  const [keepBingoId, setKeepBingoId] = useState<getBingoIdType[]>();
  const [doneBingoId, setDoneBingoId] = useState<getBingoIdType[]>();

  useEffect(() => {
    getKeepBingoInformation(userID, setKeepBingoId, setKeepBingoNumber);
    getDoneBingoInformation(userID, setDoneBingoId, setDoneBingoNumber);
  }, [userID]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Tab label="保存したBINGO" value="1" sx={{ width: 'calc(100% / 3)' }} />
            <Tab label="作成したBINGO" value="2" sx={{ width: 'calc(100% / 3)' }} />
            <Tab label="投稿したBINGO" value="3" sx={{ width: 'calc(100% / 3)' }} />
          </TabList>
        </Box>
        <TabPanel value="1" style={{ color: "black", textAlign: "center" }}>
          保存したBINGOはありません
        </TabPanel>
        <TabPanel value="2" style={{ color: "black", textAlign: "center" }}>
          作成したBINGOはありません
        </TabPanel>
        <TabPanel value="3" style={{ color: "black", textAlign: "center" }}>
          投稿したBINGOはありません
        </TabPanel>
      </TabContext>
    </Box>
  );
};

const MyAccount: NextPage = () => {
  const { userID, setUserID } = useUserState();
  const [keepBingoNumber, setKeepBingoNumber] = useState<number>(0);
  const [doneBingoNumber, setDoneBingoNumber] = useState<number>(0);

  const imageUrl = "https://rentry.jp/wp-content/uploads/2024/01/smartphone_happy_tereru_man.jpg"; // 画像のURLに置き換える

  useEffect(() => {
    setUserID("kamide2");
  }, []);
  return (
    <Box height="90vh" width="100vw">
      <Stack
        direction="row"
        spacing={2}
        height="30vh"
        marginLeft="4vw"
        marginTop="10vh"
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "lightgray", // 代替の背景色
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="No Image"
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "50%" }}
            />
          ) : (
            "No Image"
          )}
        </div>
        <Stack spacing={1} style={{ fontWeight: "bold" }}>
          <p style={{ color: "black" }}>UserID: {userID}</p>
          <p style={{ color: "black" }}>📍Kanazawa</p>
          <p style={{ color: "black" }}>🔰BeInGo Beginner</p>
          <p>
            <span style={{ fontSize: '1.5em' }}>{keepBingoNumber}</span> 　Keep BINGO
          </p>
          <p>
            <span style={{ fontSize: '1.5em' }}>{doneBingoNumber}</span> 　Finished BINGO
          </p>
        </Stack>
        <Button
          style={{
            position: "absolute",
            top: "10vh",
            left: "74vw",
            color: "black",
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
          編集
        </Button>
      </Stack>
      <BingoTab
        userID={userID}
        setKeepBingoNumber={setKeepBingoNumber}
        setDoneBingoNumber={setDoneBingoNumber}
      />
    </Box>
  );
};

export default MyAccount;
