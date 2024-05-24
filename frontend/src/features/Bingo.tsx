import {
  BingoSquareModalProps,
  bingoStoreIds,
  getBingoInformationType,
  postBingoProps,
  searchStoreResponse,
  storeNames,
} from "../types";
import {
  BingoSquareShowModal,
  CreatingBingoSquareShowModal,
} from "./ShowModal";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import {
  KeepBingoButton,
  LikeButton,
  PlayBingoButton,
  SubmitBingoButton,
} from "../components/Button";
import { FC, useCallback, useEffect, useState } from "react";
import { useAuthState, useUserState } from "../store/stateManager";
import api from "../api/api";

const checkBingo = (bingoInformation: BingoSquareModalProps[] | undefined) => {
  const BingoLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  if (bingoInformation) {
    for (let i = 0; i < BingoLines.length; i++) {
      const [a, b, c] = BingoLines[i];
      if (
        bingoInformation[a].src != undefined &&
        bingoInformation[b].src != undefined &&
        bingoInformation[c].src != undefined
      ) {
        return true;
      }
    }
    return false;
  }
};

const Bingo = ({
  lockModal,
  bingoInformation,
  userId,
  bingoId,
  bingoStoreIds,
}: {
  lockModal: boolean;
  bingoInformation?: BingoSquareModalProps[];
  userId: string;
  bingoId: string;
  bingoStoreIds: bingoStoreIds;
}) => {
  return (
    <Grid container spacing={1}>
      {bingoInformation &&
        bingoStoreIds &&
        bingoInformation.map((store, index) => (
          <Grid item xs={4} sm={4} key={index}>
            <BingoSquareShowModal
              lockModal={lockModal}
              storeName={store.storeName}
              src={store.src ?? undefined}
              userId={userId}
              bingoId={bingoId}
              storeNumber={String(index)}
              storeId={bingoStoreIds[`store_id_${index + 1}`]}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export const BingoOfHome: FC<{
  bingoInformation: BingoSquareModalProps[] | undefined;
  userId: string;
  bingoId: string;
  goodNum: number;
  bingoStoreIds: bingoStoreIds;
}> = ({ bingoInformation, userId, bingoId, goodNum, bingoStoreIds }) => {
  const { userID } = useUserState();
  const { authState } = useAuthState();

  return (
    <>
      <Stack spacing={-3}>
        <Box
          sx={{
            color: "black",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar />
          <p style={{ display: "inline-block", marginLeft: "10px" }}>
            {userId}
          </p>
        </Box>
        <Box sx={{ backgroundColor: "black", width: "100vw", height: "auto" }}>
          <Bingo
            lockModal={true}
            bingoInformation={bingoInformation}
            userId={userId}
            bingoId={bingoId}
            bingoStoreIds={bingoStoreIds}
          />
          <LikeButton bingoId={bingoId} goodNum={goodNum} />
          {authState && (
            <KeepBingoButton
              userId={userID}
              bingoId={bingoId}
              contributorId={userId}
            />
          )}
        </Box>
        <Box>
          {authState && (
            <PlayBingoButton
              userID={userID}
              bingoId={bingoId}
              ContributorId={userId}
            />
          )}
        </Box>
      </Stack>
    </>
  );
};

export const BingoOfMyBingo: FC<{
  bingoInformation: BingoSquareModalProps[] | undefined;
  userId: string;
  bingoId: string;
  bingoStoreIds: bingoStoreIds;
}> = ({ bingoInformation, userId, bingoId, bingoStoreIds }) => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{ width: "100%", margin: "auto", alignItems: "center" }}
      >
        <p
          style={{
            color: "black",
            fontSize: "2.0rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          My BINGO
        </p>
        <Box sx={{ width: "100%", backgroundColor: "black" }}>
          <Bingo
            lockModal={false}
            bingoInformation={bingoInformation}
            userId={userId}
            bingoId={bingoId}
            bingoStoreIds={bingoStoreIds}
          />
        </Box>
      </Stack>
      <Stack>
        {checkBingo(bingoInformation) && (
          <SubmitBingoButton userId={userId} bingoId={bingoId} />
        )}
      </Stack>
    </>
  );
};

export const BingoOfProfile: FC<{
  bingoInformation: getBingoInformationType;
}> = ({ bingoInformation }) => {
  const [userId, setUserId] = useState("");
  const [bingoId, setBingoId] = useState("");
  const [bingoSquares, setBingoSquares] = useState<BingoSquareModalProps[]>([]);
  const [bingoStoreIds, setBingoStoreIds] = useState<bingoStoreIds>();

  useEffect(() => {
    const getStoreId = async (bingoId: string) => {
      try {
        const getBingoStoreIds = await api.getStoreIdByBingoId(bingoId);
        setBingoStoreIds(getBingoStoreIds.body);
      } catch (e) {
        console.error(e);
      }
    };

    if (bingoInformation) {
      const bodyObject = JSON.parse(bingoInformation.body);
      setUserId(bodyObject.user_id);
      setBingoId(bodyObject.bingo_id);

      const squares: BingoSquareModalProps[] = [];
      for (let i = 1; i <= 9; i++) {
        squares.push({
          src: bodyObject[`pi_${i}`],
          storeName: bodyObject[`store_name_${i}`],
        });
      }
      setBingoSquares(squares);
      getStoreId(bodyObject.bingo_id);
    }
  }, [bingoInformation]);

  return (
    <>
      <Box sx={{ backgroundColor: "black", width: "100vw", height: "auto" }}>
        {bingoStoreIds && (
          <Bingo
            lockModal={true}
            bingoInformation={bingoSquares}
            userId={userId}
            bingoId={bingoId}
            bingoStoreIds={bingoStoreIds}
          />
        )}
      </Box>
    </>
  );
};

export const CreatingBingo: FC<{
  createBingoProps: postBingoProps;
  storeNames: storeNames;
  setNewStore: (storeName: string, storeId: string, storeNum: number) => void;
}> = ({ createBingoProps, storeNames, setNewStore }) => {
  const [squareProps, setSquaresProps] = useState<SquareProps[]>([]);
  type SquareProps = {
    storeName: string;
    storeId: string;
  };

  const [formValue, setFormValue] = useState<string>("");
  const [openFormStoreNum, setOpenFormStoreNum] = useState(false);
  const [openFormStoreName, setOpenFormStoreName] = useState(false);
  const [selectStoreNum, setSelectStoreNum] = useState<number | null>(null);
  const [selectStore, setSelectStore] = useState<searchStoreResponse | null>(
    null,
  );
  const [searchResult, setSearchResult] = useState<searchStoreResponse[]>();
  useEffect(() => {
    const squares: SquareProps[] = [];
    for (let i = 1; i <= 9; i++) {
      if (storeNames && createBingoProps) {
        squares.push({
          storeName: storeNames[`storeName_${i}`],
          storeId: createBingoProps[`storeId_${i}`],
        });
      }
    }
    setSquaresProps(squares);
  }, [storeNames, createBingoProps]);

  const searchStore = useCallback(async () => {
    if (formValue) {
      const response = await api.searchStore(formValue);
      console.log(response);
      if (typeof response.body !== "string") {
        setSearchResult(response.body);
        setOpenFormStoreName(true);
      }
    }
  }, [formValue]);

  const addStore = () => {
    if (selectStore && selectStoreNum)
      setNewStore(selectStore.name, String(selectStore.id), selectStoreNum);
    setSelectStoreNum(null);
    setSelectStore(null);
    setSearchResult(undefined);
    setFormValue("");
  };

  const handleChangeOfNum = (event: SelectChangeEvent<number | null>) => {
    setSelectStoreNum(event.target.value as number | null);
  };

  const handleChangeOfStore = (event: SelectChangeEvent<unknown>) => {
    const selectedStore = searchResult?.find(
      (store) => store.id === (event.target.value as number),
    );
    setSelectStore(selectedStore || null);
    console.log(selectStore);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {!searchResult ? (
          <TextField
            id="outlined-search"
            label="検索"
            value={formValue}
            type="search"
            margin="normal"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormValue(event.target.value);
            }}
          />
        ) : (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              検索結果
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openFormStoreName}
              onClose={() => setOpenFormStoreName(false)}
              onOpen={() => setOpenFormStoreName(true)}
              value={selectStore?.id || ""}
              label="StoreName"
              onChange={handleChangeOfStore}
            >
              {searchResult.map((store, index) => (
                <MenuItem key={index} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">番号</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openFormStoreNum}
            onClose={() => setOpenFormStoreNum(false)}
            onOpen={() => setOpenFormStoreNum(true)}
            value={selectStoreNum || ""}
            label="StoreNumber"
            onChange={handleChangeOfNum}
          >
            {[...Array(9)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!searchResult && <Button onClick={searchStore}>検索</Button>}
        {selectStore && selectStoreNum && (
          <Button onClick={addStore}>追加する</Button>
        )}
      </Box>
      <Grid container spacing={1}>
        {squareProps &&
          squareProps.map((store, index) => (
            <Grid item xs={4} sm={4} key={index}>
              <CreatingBingoSquareShowModal
                storeName={store.storeName}
                storeId={store.storeId}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
