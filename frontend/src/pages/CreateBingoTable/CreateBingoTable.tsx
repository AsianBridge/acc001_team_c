import { useState } from "react";
import { PostBingoButton } from "../../components/Button";
import { NextPage } from "next";
import { postBingoProps, storeNames } from "../../types";
import { CreatingBingo } from "../../features/Bingo";

const CreateBingoTable: NextPage = () => {
  const [createBingoProps, setCreateBingoProps] = useState<postBingoProps>({
    makerId: "",
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
    console.log(updatedBingoProps);

    const updatedStoreNameProps = {
      ...storeNameProps,
      [`storeName_${storeNum}`]: storeName,
    };
    setStoreNameProps(updatedStoreNameProps);
  };

  return (
    <>
      {createBingoProps && storeNameProps && (
        <CreatingBingo
          createBingoProps={createBingoProps}
          storeNames={storeNameProps}
          setNewStore={setNewStore}
        />
      )}
      {createBingoProps && (
        <PostBingoButton postBingoProps={createBingoProps} />
      )}
    </>
  );
};

export default CreateBingoTable;
