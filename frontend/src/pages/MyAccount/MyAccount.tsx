import { Stack, Box, Avatar, Tab, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { ShowUserId } from "../../store/stateManager";

const MyAccount = () => {
  const [finishedBingoNumber, setFinishedBingoNumber] = useState<
    undefined | number
  >(undefined);
  const [finishedBingosID] = useState(["ID_1", "ID_2"]);

  useEffect(() => {
    setFinishedBingoNumber(finishedBingosID.length);
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
          <p style={{ color: "black" }}>
            UserID: <ShowUserId />
          </p>
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
            {finishedBingoNumber}
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
      <BingoTab />
    </Box>
  );
};

const BingoTab = () => {
  const [value, setValue] = useState("1");

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

export default MyAccount;
