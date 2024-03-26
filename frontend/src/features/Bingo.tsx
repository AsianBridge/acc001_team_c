import { useState } from "react";
import { ShowModal } from "../components/ShowModal";
import { Grid } from "@mui/material";

const Square = ({ storeName, src, squareUpdate }: { storeName: string, src: string, squareUpdate: (value: number) => void }
) => {
    return (
        <>
            <ShowModal src={src} storeName={storeName} />
        </>
    );
}

const Bingo = () => {
    const [bingoSquareState, setBingoSquareState] = useState<boolean[]>(Array(9).fill(false));

    const storeInformation = [
        { storeName: "マック", src: "https://pbs.twimg.com/profile_images/1726395545974112256/3bTbEpwe_400x400.jpg" },
        { storeName: "一風堂", src: "https://ec-ippudo.com/img/usr/top/stores/pc/ippudo.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" },
        { storeName: "築地銀だこ", src: "https://pbs.twimg.com/profile_images/1632537593777913857/v0yABIUT_400x400.jpg" }
    ];


    const squareUpdate = (value: number) => {
        const nextSquareState = bingoSquareState.slice();
        nextSquareState[value] = true;

        setBingoSquareState(nextSquareState);
    }

    return (
        <Grid container spacing={1}>
            {storeInformation.map((store, index) => (
                <Grid item xs={4} key={index}>
                    <Square storeName={store.storeName} src={store.src} squareUpdate={() => squareUpdate(index)} />
                </Grid>
            ))}
        </Grid>

    )
}

export default Bingo;