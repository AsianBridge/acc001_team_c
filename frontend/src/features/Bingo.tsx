import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ShowModal } from "../components/ShowModal";

const Squares = () => {

    return (
        <>
            <ShowModal src="https://00m.in/VzBjk" storeName="こんしんや" />
            <ShowModal src="https://00m.in/BDKXb" storeName="将軍バーガー" />
            <ShowModal src="https://00m.in/BPXOz" storeName="サーティーワン" />
        </>
    );
}

const Bingo = () => {
    const [bingoSquareState, setBingoSquareState] = useState<boolean[]>(Array(9).fill(false));

    const squareUpdate = (value: number) => {
        const nextSquareState = bingoSquareState.slice();
        nextSquareState[value] = true;

        setBingoSquareState(nextSquareState);
    }

    return (
        <Squares />
    )
}

export default Bingo;