import { Stack, Box, Tab, Button, Grid } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../api/api";
import { getBingoInformationType } from "../../types";
import { useUserState } from "../../store/UserState";
import { NextPage } from "next";
import { ShowBingoModal } from "../../features/ShowModal";

const getKeepBingoInformation = async (
  userID: string,
  setKeepBingoId: Dispatch<
    SetStateAction<getBingoInformationType[] | undefined>
  >,
  setKeepBingoNumber: Dispatch<SetStateAction<number>>,
) => {
  try {
    const responseDataArray: getBingoInformationType[] =
      await api.getKeepBingoIdByUserId(userID);

    if (responseDataArray.length > 0) {
      if (typeof responseDataArray[0].body !== "object") {
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
  setDoneBingoId: Dispatch<
    SetStateAction<getBingoInformationType[] | undefined>
  >,
  setDoneBingoNumber: Dispatch<SetStateAction<number>>,
) => {
  try {
    const responseDataArray: getBingoInformationType[] =
      await api.getDoneBingoIdByUserId(userID);

    if (responseDataArray.length > 0) {
      if (typeof responseDataArray[0].body !== "object") {
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
  const [keepBingoId, setKeepBingoId] = useState<getBingoInformationType[]>();
  const [doneBingoId, setDoneBingoId] = useState<getBingoInformationType[]>();

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
          <TabList
            onChange={handleChange}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Tab
              label="保存したBINGO"
              value="1"
              sx={{ width: "calc(100% / 2)" }}
            />
            <Tab
              label="投稿したBINGO"
              value="2"
              sx={{ width: "calc(100% / 2)" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" style={{ color: "black", textAlign: "center" }}>
          {keepBingoId === undefined ? (
            <Box>保存したBINGOはありません</Box>
          ) : (
            <Box>{showBingoBox(keepBingoId)}</Box>
          )}
        </TabPanel>
        <TabPanel value="2" style={{ color: "black", textAlign: "center" }}>
          {doneBingoId === undefined ? (
            <Box>投稿したBINGOはありません</Box>
          ) : (
            <Box>{showBingoBox(doneBingoId)}</Box>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

const MyAccount: NextPage = () => {
  const { userID} = useUserState();
  const [keepBingoNumber, setKeepBingoNumber] = useState<number>(0);
  const [doneBingoNumber, setDoneBingoNumber] = useState<number>(0);

  const imageUrl =
    "https://rentry.jp/wp-content/uploads/2024/01/smartphone_happy_tereru_man.jpg"; // 画像のURLに置き換える

  
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
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "50%",
              }}
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
            <span style={{ fontSize: "1.5em" }}>{keepBingoNumber}</span> 　Keep
            BINGO
          </p>
          <p>
            <span style={{ fontSize: "1.5em" }}>{doneBingoNumber}</span>{" "}
            　Finished BINGO
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

const showBingoBox = (BingoInformation: getBingoInformationType[]) => {
  return BingoInformation.map((BingoInformation, index) => (
    <Grid key={index}>
      <ShowBingoModal BingoInformation={BingoInformation} />
    </Grid>
  ));
};

export default MyAccount;
