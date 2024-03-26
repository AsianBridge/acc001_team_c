import { Stack, Box, Avatar, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { ShowUserId } from "../../components/UserInformation";

const MyAccount = () => {
  return (
    <Box height="90vh" width="100vw">
      <Stack direction="row" spacing={2}>
        <Avatar>BK</Avatar>
        <Stack spacing={1}>
          <ShowUserId/>
          <p>📍Kanazawa</p>
          <p>🔰BeInGo Beginner</p>
        </Stack>
        <button>編集</button>
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
        <TabPanel value="1">保存したBINGOはありません</TabPanel>
        <TabPanel value="2">作成したBINGOはありません</TabPanel>
        <TabPanel value="3">投稿したBINGOはありません</TabPanel>
      </TabContext>
    </Box>
  );
};

export default MyAccount;
