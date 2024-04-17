import { Stack, Box, Avatar, Tab, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "../../api/api";
import { getDoneBingoIdType } from "../../types";
import { useUserState } from "../../store/UserState";

const getDoneBingoInformation = async (
  userID: string,
  setDoneBingoId: Dispatch<SetStateAction<getDoneBingoIdType[] | undefined>>,
  setDoneBingoNumber: Dispatch<SetStateAction<number>>,
) => {
  try {
    const responseDataArray: getDoneBingoIdType[] =
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
  setDoneBingoNumber: Dispatch<SetStateAction<number>>;
};

const BingoTab = ({ userID, setDoneBingoNumber }: BingoTabProps) => {
  const [value, setValue] = useState("1");
  const [doneBingoId, setDoneBingoId] = useState<getDoneBingoIdType[]>();

  useEffect(() => {
    getDoneBingoInformation(userID, setDoneBingoId, setDoneBingoNumber);
    console.log(userID);
  }, [userID]);

  useEffect(() => {
    console.log(doneBingoId);
  }, [doneBingoId]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="保存したBINGO" value="1" />
            <Tab label="作成したBINGO" value="2" />
            <Tab label="投稿したBINGO" value="3" />
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

const MyAccount = () => {
  const { userID, setUserID } = useUserState();
  const [doneBingoNumber, setDoneBingoNumber] = useState<number>(0);

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
        <Avatar sx={{ width: "26vw", height: "12vh" }}>BK</Avatar>
        <Stack spacing={1} style={{ fontWeight: "bold" }}>
          <p style={{ color: "black" }}>UserID: {userID}</p>
          <p style={{ color: "black" }}>📍Kanazawa</p>
          <p style={{ color: "black" }}>🔰BeInGo Beginner</p>
        </Stack>
        <Stack direction="row">
          <p
            style={{
              position: "absolute",
              top: "26vh",
              left: "38vw",
              color: "black",
              fontSize: "0.6rem",
              fontWeight: "bold",
            }}
          >
            Create BINGO
          </p>
          <p
            style={{
              position: "absolute",
              top: "26vh",
              left: "69vw",
              color: "black",
              fontSize: "0.6rem",
              fontWeight: "bold",
            }}
          >
            Finished BINGO
          </p>
          <p
            style={{
              position: "absolute",
              top: "27vh",
              left: "44vw",
              color: "black",
              fontSize: "2.0rem",
            }}
          >
            0
          </p>
          <p
            style={{
              position: "absolute",
              top: "27vh",
              left: "76vw",
              color: "black",
              fontSize: "2.0rem",
            }}
          >
            {doneBingoNumber}
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
      <BingoTab userID={userID} setDoneBingoNumber={setDoneBingoNumber} />
    </Box>
  );
};

export default MyAccount;
