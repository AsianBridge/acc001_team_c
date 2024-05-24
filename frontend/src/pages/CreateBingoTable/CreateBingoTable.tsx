import { useEffect, useState } from "react";
import { PostBingoButton } from "../../components/Button";
import { NextPage } from "next";
import { postBingoProps, storeNames } from "../../types";
import { CreatingBingo } from "../../features/Bingo";
import { useUserState } from "../../store/stateManager";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateBingoTable: NextPage = () => {
  const { userID } = useUserState();
  const [checkFill, setCheckFill] = useState(false);
  const navigate = useNavigate();
  const [createBingoProps, setCreateBingoProps] = useState<postBingoProps>({
    makerId: userID,
    storeId_1: "",
    storeId_2: "",
    storeId_3: "",
    storeId_4: "",
    storeId_5: "",
    storeId_6: "",
    storeId_7: "",
    storeId_8: "",
    storeId_9: "",
  });
  const [storeNameProps, setStoreNameProps] = useState<storeNames>({
    storeName_1: "",
    storeName_2: "",
    storeName_3: "",
    storeName_4: "",
    storeName_5: "",
    storeName_6: "",
    storeName_7: "",
    storeName_8: "",
    storeName_9: "",
  });

  const setNewStore = (
    storeName: string,
    storeId: string,
    storeNum: number,
  ) => {
    const updatedBingoProps = {
      ...createBingoProps,
      [`storeId_${storeNum}`]: storeId,
    };
    setCreateBingoProps(updatedBingoProps);

    const updatedStoreNameProps = {
      ...storeNameProps,
      [`storeName_${storeNum}`]: storeName,
    };
    setStoreNameProps(updatedStoreNameProps);
  };

  useEffect(() => {
    const checkFill = () => {
      for (let i = 1; i <= 9; i++)
        if (createBingoProps[`storeId_${i}`] === "") {
          return false;
        }
      return true;
    };
    setCheckFill(checkFill());
  }, [createBingoProps]);

  return (
    <>
      <Button onClick={() => navigate("/MyBingo")}>戻る</Button>
      {createBingoProps && storeNameProps && (
        <CreatingBingo
          createBingoProps={createBingoProps}
          storeNames={storeNameProps}
          setNewStore={setNewStore}
        />
      )}
      {checkFill && <PostBingoButton postBingoProps={createBingoProps} />}
    </>
  );
};

export default CreateBingoTable;
